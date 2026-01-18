import { NextRequest, NextResponse } from 'next/server';
import { seedComponents } from '@/lib/actions/components';
import { verifyAdminAuth } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
    // Protect route
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await seedComponents();
        return NextResponse.json({
            success: true,
            data: result,
            message: `Seed completed. Created: ${result.created}, Skipped: ${result.skipped}`
        });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json(
            { error: 'Failed to seed database', details: String(error) },
            { status: 500 }
        );
    }
}
