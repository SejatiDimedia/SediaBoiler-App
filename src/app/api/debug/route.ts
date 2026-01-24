import { NextResponse } from 'next/server';
import { getAllComponents } from '@/lib/actions/components';

export async function GET() {
    const components = await getAllComponents();
    return NextResponse.json(components.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        category: c.category
    })));
}
