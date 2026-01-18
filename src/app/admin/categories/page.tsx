"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Plus,
    Pencil,
    Trash2,
    Loader2,
    FolderOpen,
    GripVertical,
    AlertCircle,
    Check,
    X,
} from "lucide-react";
import { Category } from "@/db/schema";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isSeeding, setIsSeeding] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            setError("Failed to load categories");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSeed = async () => {
        setIsSeeding(true);
        try {
            const res = await fetch("/api/categories?seed=true");
            if (!res.ok) throw new Error("Seed failed");
            await fetchCategories();
        } catch (err) {
            setError("Failed to seed categories");
        } finally {
            setIsSeeding(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to delete");
                return;
            }

            setCategories(categories.filter((c) => c.id !== id));
            setDeleteId(null);
        } catch (err) {
            setError("Failed to delete category");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
                    <p className="text-slate-500 mt-1">
                        Manage component categories for your library
                    </p>
                </div>
                <div className="flex gap-3">
                    {categories.length === 0 && (
                        <button
                            onClick={handleSeed}
                            disabled={isSeeding}
                            className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition flex items-center gap-2 font-medium disabled:opacity-50"
                        >
                            {isSeeding ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <FolderOpen className="w-4 h-4" />
                            )}
                            Seed Default
                        </button>
                    )}
                    <Link
                        href="/admin/categories/new"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2 font-medium shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        Add Category
                    </Link>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="ml-auto">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Categories List */}
            {categories.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        No categories yet
                    </h3>
                    <p className="text-slate-500 mb-6">
                        Create your first category or seed default ones.
                    </p>
                    <button
                        onClick={handleSeed}
                        disabled={isSeeding}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                    >
                        {isSeeding ? "Seeding..." : "Seed Default Categories"}
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <GripVertical className="w-4 h-4" />
                                            <span className="text-sm font-mono">{category.sortOrder}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-slate-900">
                                            {category.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">
                                            {category.slug}
                                        </code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-500 line-clamp-1">
                                            {category.description || "-"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {deleteId === category.id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleDelete(category.id)}
                                                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                                        title="Confirm delete"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteId(null)}
                                                        className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition"
                                                        title="Cancel"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link
                                                        href={`/admin/categories/${category.id}/edit`}
                                                        className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => setDeleteId(category.id)}
                                                        className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
