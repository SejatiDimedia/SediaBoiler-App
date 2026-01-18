import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, deleteImage, listImages } from '@/lib/storage';

// POST - Upload a new image
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const folder = (formData.get('folder') as string) || 'thumbnails';

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Allowed: PNG, JPEG, GIF, WebP, SVG' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB' },
                { status: 400 }
            );
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await uploadImage(buffer, file.name, folder);

        if ('error' in result) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({
            url: result.url,
            path: result.path,
            message: 'Image uploaded successfully',
        });
    } catch (error) {
        console.error('Upload API error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Upload failed' },
            { status: 500 }
        );
    }
}

// GET - List all images
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const folder = searchParams.get('folder') || 'thumbnails';

        const result = await listImages(folder);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({ images: result.images });
    } catch (error) {
        console.error('List API error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to list images' },
            { status: 500 }
        );
    }
}

// DELETE - Delete an image
export async function DELETE(request: NextRequest) {
    try {
        const { path } = await request.json();

        if (!path) {
            return NextResponse.json(
                { error: 'No path provided' },
                { status: 400 }
            );
        }

        const result = await deleteImage(path);

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Delete API error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Delete failed' },
            { status: 500 }
        );
    }
}
