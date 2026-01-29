'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/lib/actions/blog';
import { Loader2, Save, X, FileText, Globe, Type, Image as ImageIcon, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';

interface BlogFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
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
                    router.refresh();
                } else {
                    setError('Failed to update: ' + res.error);
                }
            } else {
                const res = await createPost(payloadFixed as any);
                if (res.success) {
                    router.push('/admin/blog');
                    router.refresh();
                } else {
                    setError('Failed to create: ' + res.error);
                }
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    // Shared Styles
    const inputClasses = "w-full px-4 py-2 bg-slate-50 border border-slate-200 focus:border-primary/50 outline-none ring-0 focus:ring-2 focus:ring-primary/20 rounded-lg transition font-medium text-slate-800 text-sm shadow-none placeholder:text-slate-400";
    const panelClasses = "bg-white rounded-2xl shadow-sm border border-slate-200 p-8";
    const sectionClasses = "space-y-6";

    return (
        <form onSubmit={handleSubmit} className="max-w-[1800px] mx-auto pb-24 px-4">
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    {error}
                </div>
            )}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        {isEdit ? 'Edit Post' : 'Create Post'}
                    </h2>
                    <p className="text-slate-500 mt-1">
                        {isEdit ? 'Update existing blog post details.' : 'Add a new article to your blog.'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/blog"
                        className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition flex items-center gap-2 font-medium shadow-sm"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/20 font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isEdit ? 'Update Post' : 'Publish Post'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left, 2 cols) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* General Information Panel */}
                    <div className={panelClasses}>
                        <div className={sectionClasses}>
                            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Post Details</h3>
                                    <p className="text-sm text-slate-500">Core content and metadata</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Slug / URL Path
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-mono">
                                            /blog/
                                        </span>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleChange}
                                            className={`${inputClasses} pl-16 font-mono`}
                                            placeholder="my-awesome-post"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-slate-400" />
                                            Title (EN)
                                        </label>
                                        <input
                                            type="text"
                                            name="titleEn"
                                            value={formData.titleEn}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            placeholder="Enter post title"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                            <Type className="w-4 h-4 text-slate-400" />
                                            Title (ID)
                                        </label>
                                        <input
                                            type="text"
                                            name="titleId"
                                            value={formData.titleId || formData.titleEn}
                                            onChange={handleChange}
                                            className={inputClasses}
                                            placeholder="Judul artikel..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Excerpt (EN)
                                        </label>
                                        <textarea
                                            name="excerptEn"
                                            value={formData.excerptEn}
                                            onChange={handleChange}
                                            rows={3}
                                            className={`${inputClasses} min-h-[100px] resize-none`}
                                            placeholder="Brief summary for SEO..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Excerpt (ID)
                                        </label>
                                        <textarea
                                            name="excerptId"
                                            value={formData.excerptId || formData.excerptEn}
                                            onChange={handleChange}
                                            rows={3}
                                            className={`${inputClasses} min-h-[100px] resize-none`}
                                            placeholder="Ringkasan singkat..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Editor Panel */}
                    <div className={panelClasses}>
                        <div className={sectionClasses}>
                            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                                    <LayoutTemplate className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Article Content</h3>
                                    <p className="text-sm text-slate-500">Write your full article using Markdown</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Content (EN)
                                    </label>
                                    <textarea
                                        name="contentEn"
                                        value={formData.contentEn}
                                        onChange={handleChange}
                                        required
                                        rows={20}
                                        className={`${inputClasses} font-mono text-xs leading-relaxed min-h-[400px]`}
                                        placeholder="# Heading&#10;&#10;Write your content here..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Content (ID)
                                    </label>
                                    <textarea
                                        name="contentId"
                                        value={formData.contentId || formData.contentEn}
                                        onChange={handleChange}
                                        rows={20}
                                        className={`${inputClasses} font-mono text-xs leading-relaxed min-h-[400px]`}
                                        placeholder="# Judul&#10;&#10;Tulis konten bahasa Indonesia di sini..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar (Right, 1 col) */}
                <div className="space-y-8">
                    <div className={panelClasses}>
                        <div className={sectionClasses}>
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">
                                Configuration
                            </h3>

                            <div className="flex items-end">
                                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg w-full cursor-pointer hover:bg-slate-100 transition group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            name="isPublished"
                                            checked={formData.isPublished}
                                            onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                                            className="peer sr-only"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-medium text-slate-900 group-hover:text-primary transition-colors">
                                            Published
                                        </span>
                                        <span className="block text-xs text-slate-500 mt-1">
                                            Visible to public
                                        </span>
                                    </div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-slate-400" />
                                    Cover Image URL
                                </label>
                                <input
                                    type="text"
                                    name="coverImage"
                                    value={formData.coverImage}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="https://..."
                                />
                                {formData.coverImage && (
                                    <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video relative bg-slate-50">
                                        <img
                                            src={formData.coverImage}
                                            alt="Cover preview"
                                            className="object-cover w-full h-full"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
