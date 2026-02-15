import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';

async function main() {
    console.log('🔧 Starting ArrowRight fix...');

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
            if (result.length === 0) continue;

            let code = result[0].code;
            const originalCode = code;

            // Target: <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            // Replace: <ArrowRight size={20} className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />

            const target = '<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />';
            const replacement = '<ArrowRight size={20} className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />';

            if (code.includes(target)) {
                code = code.split(target).join(replacement);
            }

            // Also check for Check icon if missed previously (just in case)
            // context: <Check size={18} className="text-red-600" />
            const checkTarget = '<Check size={18} className="text-red-600" />';
            const checkReplacement = '<Check size={18} className="w-[18px] h-[18px] flex-shrink-0 text-red-600" />';

            if (code.includes(checkTarget)) {
                code = code.split(checkTarget).join(checkReplacement);
            }

            if (code !== originalCode) {
                console.log(`✅ Update needed for ${slug}...`);
                await sql`UPDATE components SET code = ${code}, updated_at = NOW() WHERE slug = ${slug}`;
                console.log('   -> Database updated.');
            } else {
                console.log(`ℹ️ No changes needed for ${slug}.`);
            }
        }
        console.log('🎉 Fix completed!');
    } catch (error) {
        console.error(error);
    } finally {
        await sql.end();
        process.exit(0);
    }
}

main();
