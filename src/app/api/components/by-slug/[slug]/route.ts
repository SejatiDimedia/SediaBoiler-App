import { NextRequest, NextResponse } from 'next/server';
import { getComponentBySlug } from '@/lib/actions/components';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const component = await getComponentBySlug(slug);

        if (!component) {
            return NextResponse.json(
                { error: 'Component not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(component);
    } catch (error) {
        console.error('Error fetching component by slug:', error);
        return NextResponse.json(
            { error: 'Failed to fetch component' },
            { status: 500 }
        );
    }
}
