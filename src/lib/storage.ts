'use server';

import { supabase } from './supabase';

const BUCKET_NAME = 'SediaBoilerImage';

/**
 * Upload an image to Supabase Storage
 * @param file - The file buffer to upload
 * @param fileName - The name of the file
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
    file: Buffer,
    fileName: string,
    folder: string = 'thumbnails'
): Promise<{ url: string; path: string } | { error: string }> {
    try {
        const timestamp = Date.now();
        const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
        const path = `${folder}/${timestamp}-${sanitizedName}`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(path, file, {
                contentType: getContentType(fileName),
                upsert: false,
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return { error: error.message };
        }

        const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(data.path);

        return {
            url: urlData.publicUrl,
            path: data.path,
        };
    } catch (err) {
        console.error('Upload error:', err);
        return { error: err instanceof Error ? err.message : 'Upload failed' };
    }
}

/**
 * Delete an image from Supabase Storage
 * @param path - The path of the file in storage
 */
export async function deleteImage(path: string): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([path]);

        if (error) {
            console.error('Supabase delete error:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error('Delete error:', err);
        return { success: false, error: err instanceof Error ? err.message : 'Delete failed' };
    }
}

/**
 * List all images in a folder
 * @param folder - The folder path to list
 */
export async function listImages(folder: string = 'thumbnails'): Promise<{
    images: Array<{ name: string; path: string; url: string; createdAt: string }>;
    error?: string;
}> {
    try {
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .list(folder, {
                limit: 100,
                sortBy: { column: 'created_at', order: 'desc' },
            });

        if (error) {
            console.error('Supabase list error:', error);
            return { images: [], error: error.message };
        }

        const images = data
            .filter(file => !file.id.endsWith('/')) // Filter out folders
            .map(file => {
                const path = `${folder}/${file.name}`;
                const { data: urlData } = supabase.storage
                    .from(BUCKET_NAME)
                    .getPublicUrl(path);

                return {
                    name: file.name,
                    path,
                    url: urlData.publicUrl,
                    createdAt: file.created_at || new Date().toISOString(),
                };
            });

        return { images };
    } catch (err) {
        console.error('List error:', err);
        return { images: [], error: err instanceof Error ? err.message : 'List failed' };
    }
}

/**
 * Get public URL for a storage path
 */
export async function getPublicUrl(path: string): Promise<string> {
    const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(path);
    return data.publicUrl;
}

/**
 * Get content type from file extension
 */
function getContentType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const types: Record<string, string> = {
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml',
    };
    return types[ext || ''] || 'application/octet-stream';
}
