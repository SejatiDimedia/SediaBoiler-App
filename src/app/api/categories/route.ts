import { NextRequest, NextResponse } from 'next/server';
import { getAllCategoriesFromDb, createCategory, seedCategories } from '@/lib/actions/categories';

// GET all categories
export async function GET(request: NextRequest) {
    try {
        // Check for seed parameter
        const { searchParams } = new URL(request.url);
        if (searchParams.get('seed') === 'true') {
            const result = await seedCategories();
            return NextResponse.json({ message: 'Seed completed', ...result });
        }

        const categories = await getAllCategoriesFromDb();
        return NextResponse.json(categories);
    } catch (error) {
        console.error('GET categories error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

// POST create new category
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Basic validation
        if (!data.slug || !data.name) {
            return NextResponse.json(
                { error: 'Slug and name are required' },
                { status: 400 }
            );
        }

        const category = await createCategory(data);
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error('POST category error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create category' },
            { status: 500 }
        );
    }
}
