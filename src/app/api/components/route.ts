import { NextRequest, NextResponse } from 'next/server';
import { createComponent, getAllComponents } from '@/lib/actions/components';

// GET all components
export async function GET() {
    try {
        const components = await getAllComponents();
        return NextResponse.json(components);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch components' },
            { status: 500 }
        );
    }
}

// POST new component
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const component = await createComponent(data);
        return NextResponse.json(component, { status: 201 });
    } catch (error) {
        console.error('Create component error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create component' },
            { status: 500 }
        );
    }
}
