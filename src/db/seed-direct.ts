import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';
import { components } from '@/lib/components-data';

async function main() {
    console.log('🌱 Starting direct database seed...');

    let connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('DATABASE_URL is not set');
        process.exit(1);
    }

    // Force direct connection (port 5432) instead of transaction pooler (port 6543)
    if (connectionString.includes(':6543')) {
        console.log('🔄 Switching to direct connection (port 5432) for seeding robustness...');
        connectionString = connectionString.replace(':6543', ':5432');
    }

    // Use a SINGLE connection with no prepared statements by default if possible, 
    // or just max: 1.
    const sql = postgres(connectionString, {
        max: 1,
        prepare: false, // Important for transaction poolers sometimes
    });

    let created = 0;
    let skipped = 0;

    try {
        for (const comp of components) {
            // Check if exists
            const existing = await sql`
        SELECT id FROM components WHERE slug = ${comp.slug} LIMIT 1
      `;

            if (existing.length > 0) {
                console.log(`- Skipped existing: ${comp.slug}`);
                skipped++;
                continue;
            }

            console.log(`+ Creating: ${comp.slug}`);

            // Insert
            await sql`
        INSERT INTO components (
          slug, name, description, category, code, is_published
        ) VALUES (
          ${comp.slug}, 
          ${JSON.stringify(comp.name)}, 
          ${JSON.stringify(comp.description)}, 
          ${comp.category}, 
          ${comp.code}, 
          'true'
        )
      `;

            created++;

            // Delay to be gentle
            await new Promise(r => setTimeout(r, 500));
        }

        console.log(`✅ Seed completed!`);
        console.log(`   - Created: ${created}`);
        console.log(`   - Skipped: ${skipped}`);

    } catch (error) {
        console.error('❌ Error during seed:', error);
    } finally {
        await sql.end();
        process.exit(0);
    }
}

main();
