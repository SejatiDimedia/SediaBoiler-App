"use client";

import { useState, useEffect, useCallback } from "react";
import {
    ImageIcon,
    Upload,
    Trash2,
    Copy,
    Check,
    Loader2,
    X,
    RefreshCw,
    Search,
} from "lucide-react";

interface ImageItem {
    name: string;
    path: string;
    url: string;
    createdAt: string;
}

export default function ImagesPage() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const [deletingPath, setDeletingPath] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchImages = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/upload");
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch images");
            }
            setImages(data.images || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load images");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const handleFileUpload = useCallback(async (file: File) => {
        setIsUploading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "thumbnails");

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Upload failed");
            }
            await fetchImages();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setIsUploading(false);
        }
    }, [fetchImages]);

    const handleDelete = useCallback(async (path: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        setDeletingPath(path);
        try {
            const response = await fetch("/api/upload", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Delete failed");
            }
            setImages(prev => prev.filter(img => img.path !== path));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Delete failed");
        } finally {
            setDeletingPath(null);
        }
    }, []);

    const handleCopy = useCallback((url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            handleFileUpload(file);
        }
    }, [handleFileUpload]);

    const filteredImages = images.filter(img =>
        img.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Image Management</h1>
                    <p className="text-slate-500 mt-1">
                        Manage component preview thumbnails
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchImages}
                        disabled={isLoading}
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-5 h-5 text-slate-600 ${isLoading ? "animate-spin" : ""}`} />
                    </button>
                    <label className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition cursor-pointer flex items-center gap-2 font-medium shadow-lg shadow-primary/20">
                        <Upload className="w-4 h-4" />
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        />
                    </label>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none"
                />
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Upload Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                className={`mb-8 p-8 border-2 border-dashed rounded-2xl text-center transition-all ${isDragging
                        ? "border-primary bg-primary/5"
                        : "border-slate-200 hover:border-primary/50"
                    } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
            >
                {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <span className="text-slate-500">Uploading...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                            <Upload className="w-7 h-7 text-slate-400" />
                        </div>
                        <p className="text-slate-700 font-medium">
                            Drop images here or click "Upload Image" above
                        </p>
                        <p className="text-xs text-slate-400">
                            PNG, JPG, GIF, WebP up to 5MB
                        </p>
                    </div>
                )}
            </div>

            {/* Images Grid */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : filteredImages.length === 0 ? (
                <div className="text-center py-20">
                    <ImageIcon className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-500">
                        {searchQuery ? "No images match your search" : "No images uploaded yet"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredImages.map((image) => (
                        <div
                            key={image.path}
                            className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="aspect-video bg-slate-100">
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-2">
                                <p className="text-xs text-slate-600 truncate" title={image.name}>
                                    {image.name}
                                </p>
                            </div>
                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handleCopy(image.url)}
                                    className="p-2 bg-white rounded-lg hover:bg-slate-100 transition"
                                    title="Copy URL"
                                >
                                    {copiedUrl === image.url ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-slate-600" />
                                    )}
                                </button>
                                <button
                                    onClick={() => handleDelete(image.path)}
                                    disabled={deletingPath === image.path}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                                    title="Delete"
                                >
                                    {deletingPath === image.path ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Image Count */}
            {!isLoading && filteredImages.length > 0 && (
                <p className="text-center text-sm text-slate-400 mt-8">
                    {filteredImages.length} image{filteredImages.length !== 1 ? "s" : ""}
                </p>
            )}
        </div>
    );
}
