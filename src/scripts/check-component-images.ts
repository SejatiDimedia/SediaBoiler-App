
import { db } from '../db';
import { components } from '../db/schema';
import { eq, or } from 'drizzle-orm';

async function main() {
    const allComponents = await db.select({
        slug: components.slug,
        name: components.name,
        previewImage: components.previewImage,
        category: components.category,
    }).from(components);

    console.log('--- Components Data ---');
    allComponents.forEach(c => {
        console.log(`Slug: ${c.slug}`);
        console.log(`Category: ${c.category}`);
        console.log(`PreviewImage: ${JSON.stringify(c.previewImage)}`);
        console.log('---');
    });
}

main().catch(console.error).then(() => process.exit(0));
