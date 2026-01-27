'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { createPost, updatePost } from '@/lib/actions/blog';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogFormProps {
    initialData?: any; // Using any for ease, but ideally typed
    isEdit?: boolean;
}

export function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        slug: initialData?.slug || '',
        coverImage: initialData?.coverImage || '',
        titleEn: initialData?.title?.en || '',
        titleId: initialData?.title?.id || '',
        contentEn: initialData?.content?.en || '',
        contentId: initialData?.content?.id || '',
        excerptEn: initialData?.excerpt?.en || '',
        excerptId: initialData?.excerpt?.id || '',
        isPublished: initialData?.isPublished || false,
    });

    // Fix initial state correctly
    // If it's edit, use the ID content if available
    if (isEdit && initialData) {
        // We need to ensure we populate from ID if it exists?
        // Actually initialData comes from DB which has strict structure.
        // Let's refine in useEffect or just render time.
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = {
                slug: formData.slug,
                coverImage: formData.coverImage,
                title: { en: formData.titleEn, id: formData.titleEn }, // TODO: Add ID field input
                content: { en: formData.contentEn, id: formData.contentEn }, // TODO: Add ID field input
                excerpt: { en: formData.excerptEn, id: formData.excerptEn }, // TODO: Add ID field input
                isPublished: formData.isPublished,
                // publishedAt: formData.isPublished ? new Date() : null, // Logic might be needed server side
            };

            // WAIT: I should add inputs for Indonesian language too, otherwise it duplicates English.
            // For MVP let's add tabs or just stacked inputs. Stacked is easier.

            const payloadFixed = {
                slug: formData.slug,
                coverImage: formData.coverImage,
                title: { en: formData.titleEn, id: formData.titleId || formData.titleEn },
                content: { en: formData.contentEn, id: formData.contentId || formData.contentEn },
                excerpt: { en: formData.excerptEn, id: formData.excerptId || formData.excerptEn },
                isPublished: formData.isPublished,
                publishedAt: (formData.isPublished && !initialData?.isPublished) ? new Date() : initialData?.publishedAt
            };

            if (isEdit) {
                const res = await updatePost(initialData.id, payloadFixed);
                if (res.success) {
                    router.push('/admin/blog');
                    router.refresh(); // Refresh list
                } else {
                    alert('Failed to update: ' + res.error);
                }
            } else {
                const res = await createPost(payloadFixed as any); // Cast for NewPost
                if (res.success) {
                    router.push('/admin/blog');
                    router.refresh();
                } else {
                    alert('Failed to create: ' + res.error);
                }
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-12">
            <div className="flex items-center justify-between sticky top-0 bg-slate-50 py-4 z-10 border-b border-slate-200 mb-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog">
                        <Button variant="ghost" size="icon" type="button">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">{isEdit ? 'Edit Post' : 'Create Post'}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 mr-4">
                        <input
                            type="checkbox"
                            id="isPublished"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="isPublished" className="text-sm font-medium">Publish immediately</label>
                    </div>
                    <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        {isEdit ? 'Update' : 'Create'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left, 2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* English Section */}
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
                        <h3 className="font-semibold text-lg border-b border-border pb-2">English Content (Default)</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title (EN)</label>
                            <input
                                name="titleEn"
                                value={formData.titleEn}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                                placeholder="Enter post title"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Excerpt / Summary (EN)</label>
                            <textarea
                                name="excerptEn"
                                value={formData.excerptEn}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                                placeholder="Brief summary for SEO and cards..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Content (EN) - Use Markdown</label>
                            <textarea
                                name="contentEn"
                                value={formData.contentEn}
                                onChange={handleChange}
                                required
                                rows={15}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background font-mono text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition leading-relaxed"
                                placeholder="# Heading&#10;&#10;Write your content here..."
                            />
                        </div>
                    </div>

                    {/* Indonesian Section */}
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
                        <h3 className="font-semibold text-lg border-b border-border pb-2">Indonesian Content</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title (ID)</label>
                            <input
                                name="titleId"
                                value={formData.titleId || formData.titleEn}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                                placeholder="Judul artikel..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Excerpt / Ringkasan (ID)</label>
                            <textarea
                                name="excerptId"
                                value={formData.excerptId || formData.excerptEn}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                                placeholder="Ringkasan singkat..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Content (ID) - Markdown</label>
                            <textarea
                                name="contentId"
                                value={formData.contentId || formData.contentEn}
                                onChange={handleChange}
                                rows={15}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background font-mono text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition leading-relaxed"
                                placeholder="# Judul&#10;&#10;Tulis konten bahasa Indonesia di sini..."
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar (Right, 1 col) */}
                <div className="space-y-6">
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Settings</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug (URL)</label>
                            <input
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition font-mono text-sm"
                                placeholder="my-awesome-post"
                            />
                            <p className="text-xs text-muted-foreground">Unique URL identifier.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Cover Image URL</label>
                            <input
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                                placeholder="https://..."
                            />
                            {formData.coverImage && (
                                <div className="mt-2 rounded-lg overflow-hidden border border-border aspect-video relative">
                                    <img src={formData.coverImage} alt="Cover preview" className="object-cover w-full h-full" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
