"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, X } from "lucide-react";
import { Category } from "@/db/schema";

interface CategoryFormProps {
    initialData?: Category;
    mode: "create" | "edit";
}

export function CategoryForm({ initialData, mode }: CategoryFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        slug: initialData?.slug || "",
        name: initialData?.name || "",
        description: initialData?.description || "",
        icon: initialData?.icon || "",
        sortOrder: initialData?.sortOrder || 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const url =
                mode === "create"
                    ? "/api/categories"
                    : `/api/categories/${initialData?.id}`;

            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to save category");
            }

            router.push("/admin/categories");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const generateSlug = () => {
        const slug = formData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        setFormData({ ...formData, slug });
    };

    const inputClasses =
        "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-primary/50 outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition font-medium text-slate-800 text-sm";

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/categories"
                            className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {mode === "create" ? "Add Category" : "Edit Category"}
                            </h1>
                            <p className="text-slate-500 mt-1">
                                {mode === "create"
                                    ? "Create a new component category"
                                    : "Update category details"}
                            </p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/20 font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {mode === "create" ? "Create Category" : "Save Changes"}
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
                        <X className="w-5 h-5" />
                        {error}
                    </div>
                )}

                {/* Form */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                onBlur={() => !formData.slug && generateSlug()}
                                className={inputClasses}
                                placeholder="e.g. Hero Section"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Slug *
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) =>
                                        setFormData({ ...formData, slug: e.target.value })
                                    }
                                    className={`${inputClasses} font-mono`}
                                    placeholder="hero-section"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className={`${inputClasses} min-h-[100px] resize-none`}
                            placeholder="Brief description of this category..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Icon (Lucide name)
                            </label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) =>
                                    setFormData({ ...formData, icon: e.target.value })
                                }
                                className={inputClasses}
                                placeholder="e.g. Layout, Grid, Star"
                            />
                            <p className="text-xs text-slate-400 mt-1">
                                Use icon names from{" "}
                                <a
                                    href="https://lucide.dev/icons"
                                    target="_blank"
                                    className="text-primary hover:underline"
                                >
                                    lucide.dev
                                </a>
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Sort Order
                            </label>
                            <input
                                type="number"
                                value={formData.sortOrder}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        sortOrder: parseInt(e.target.value) || 0,
                                    })
                                }
                                className={inputClasses}
                                placeholder="0"
                            />
                            <p className="text-xs text-slate-400 mt-1">
                                Lower numbers appear first
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
