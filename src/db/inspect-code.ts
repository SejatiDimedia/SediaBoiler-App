import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';

async function main() {
    console.log('🔍 Inspecting code...');

    let connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        process.exit(1);
    }
    if (connectionString.includes(':6543')) {
        connectionString = connectionString.replace(':6543', ':5432');
    }

    const sql = postgres(connectionString, { max: 1, prepare: false });

    try {
        const slugs = ['features-supercar', 'supercar-landing'];

        for (const slug of slugs) {
            const result = await sql`SELECT code FROM components WHERE slug = ${slug}`;
            if (result.length > 0) {
                const code = result[0].code;
                console.log(`\n--- ${slug} ---`);
                // Find ArrowRight usage
                const matches = code.match(/<ArrowRight[^>]*>/g);
                if (matches) {
                    matches.forEach((m: string) => console.log(m));
                } else {
                    console.log('No ArrowRight found.');
                }
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        await sql.end();
        process.exit(0);
    }
}

main();
