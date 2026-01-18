"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, Link, ImageIcon } from "lucide-react";

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    className?: string;
}

export function ImageUploader({ value, onChange, className = "" }: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<"upload" | "url">("upload");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback(async (file: File) => {
        setError(null);
        setIsUploading(true);

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

            onChange(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setIsUploading(false);
        }
    }, [onChange]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            handleFileChange(file);
        } else {
            setError("Please drop an image file");
        }
    }, [handleFileChange]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileChange(file);
        }
    }, [handleFileChange]);

    const handleClear = useCallback(() => {
        onChange("");
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [onChange]);

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Mode Toggle */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setMode("upload")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "upload"
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                >
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                </button>
                <button
                    type="button"
                    onClick={() => setMode("url")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "url"
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                >
                    <Link className="w-3.5 h-3.5" />
                    URL
                </button>
            </div>

            {/* Upload Mode */}
            {mode === "upload" && (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${isDragging
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                        } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="hidden"
                    />

                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <span className="text-sm text-slate-500">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                <Upload className="w-6 h-6 text-slate-400" />
                            </div>
                            <div>
                                <span className="text-sm font-medium text-slate-700">
                                    Drop image here or click to upload
                                </span>
                                <p className="text-xs text-slate-400 mt-1">
                                    PNG, JPG, GIF, WebP up to 5MB
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* URL Mode */}
            {mode === "url" && (
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="https://example.com/image.png"
                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition"
                    />
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                    <X className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Preview */}
            {value && (
                <div className="relative inline-block">
                    <div className="w-32 h-20 rounded-lg border border-slate-200 overflow-hidden bg-slate-100">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "";
                                (e.target as HTMLImageElement).parentElement!.innerHTML = `
                                    <div class="w-full h-full flex items-center justify-center text-slate-400">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                `;
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition shadow-sm"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    );
}
