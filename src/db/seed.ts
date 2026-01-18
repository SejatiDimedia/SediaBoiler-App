import { config } from 'dotenv';
config({ path: '.env.local' });

async function main() {
    console.log('🌱 Starting database seed...');

    // Dynamic import to ensure env vars are loaded first
    const { db, sql } = await import('@/db');
    const { seedComponents } = await import('@/lib/actions/components');

    if (!db || !sql) {
        console.error('DATABASE_URL is not set or invalid.');
        process.exit(1);
    }

    try {
        const result = await seedComponents();
        console.log(`✅ Seed completed!`);
        console.log(`   - Created: ${result.created} components`);
        console.log(`   - Skipped: ${result.skipped} existing components`);
    } catch (error) {
        console.error('❌ Errors occurred during seed:', error);
        process.exit(1);
    } finally {
        // Close database connection
        await sql.end();
        process.exit(0);
    }
}

main();
