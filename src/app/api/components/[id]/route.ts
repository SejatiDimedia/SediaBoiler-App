import { NextRequest, NextResponse } from 'next/server';
import { updateComponent, deleteComponent, getComponentById } from '@/lib/actions/components';

// GET single component
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const component = await getComponentById(Number(id));
        if (!component) {
            return NextResponse.json({ error: 'Component not found' }, { status: 404 });
        }
        return NextResponse.json(component);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch component' }, { status: 500 });
    }
}

// PUT update component
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();
        const component = await updateComponent(Number(id), data);
        return NextResponse.json(component);
    } catch (error) {
        console.error('Update component error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to update component' },
            { status: 500 }
        );
    }
}

// DELETE component
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteComponent(Number(id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete component' }, { status: 500 });
    }
}
