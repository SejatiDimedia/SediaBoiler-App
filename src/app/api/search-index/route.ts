import { NextResponse } from 'next/server';
import { getComponentSearchIndex } from '@/lib/actions/components';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const components = await getComponentSearchIndex();
        return NextResponse.json(components);
    } catch (error) {
        console.error('Error fetching search index:', error);
        return NextResponse.json({ error: 'Failed to fetch search index' }, { status: 500 });
    }
}
