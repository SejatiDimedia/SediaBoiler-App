"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
	componentCategories,
	BilingualContent,
	ComponentCategory,
} from "@/db/schema";
import {
	LayoutTemplate,
	Type,
	FileText,
	Code,
	Save,
	X,
	Globe,
	Loader2,
	Maximize2,
	Minimize2,
	Eye,
	PanelLeftClose,
	PanelRightClose,
	Sparkles,
	Wand2,
	Camera, // Icon for capture
} from "lucide-react";
import { AdminComponentPreview, AdminComponentPreviewRef } from "./AdminComponentPreview";
import { CodeEditor } from "./CodeEditor";
import { ImageUploader } from "./ImageUploader";
import { generateComponentMetadata, generateComponentCode } from "@/lib/actions/ai";

interface ComponentFormProps {
	initialData?: {
		id?: number;
		slug: string;
		name: BilingualContent;
		description: BilingualContent;
		category: ComponentCategory;
		code: string;
		isPublished: string;
		previewImage?: string | null;
	};
	mode: "create" | "edit";
	redirectBaseUrl?: string;
	entityName?: string;
	fixedCategory?: string;
}

export function ComponentForm({
	initialData,
	mode,
	redirectBaseUrl = "/admin/components",
	entityName = "Component",
	fixedCategory
}: ComponentFormProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [isCapturing, setIsCapturing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const previewRef = useRef<AdminComponentPreviewRef>(null);

	// Panel visibility state: 'both' | 'code' | 'preview'
	const [panelView, setPanelView] = useState<"both" | "code" | "preview">("both");
	const [isGenerating, setIsGenerating] = useState(false);
	const [isGeneratingCode, setIsGeneratingCode] = useState(false); // New state for code generation
	const [showPromptDialog, setShowPromptDialog] = useState(false); // New state for dialog
	const [prompt, setPrompt] = useState("");
	const [availableCategories, setAvailableCategories] = useState<{ slug: string; name: string }[]>([]);

	// Fetch categories from database
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch("/api/categories");
				if (res.ok) {
					const data = await res.json();
					if (data.length > 0) {
						setAvailableCategories(data.map((c: any) => ({ slug: c.slug, name: c.name })));
						return;
					}
				}
			} catch (err) {
				console.error("Failed to fetch categories", err);
			}
			// Fallback to schema categories
			setAvailableCategories(componentCategories.map((c) => ({ slug: c, name: c.charAt(0).toUpperCase() + c.slice(1) })));
		};
		fetchCategories();
	}, []);

	// Logic to determine initial type
	const initialType = (initialData?.category === 'landing-page' || fixedCategory === 'landing-page') ? 'template' : 'component';
	const [entryType, setEntryType] = useState<'component' | 'template'>(initialType);

	const [formData, setFormData] = useState({
		// ... (existing fields)
		slug: initialData?.slug || "",
		nameId: initialData?.name?.id || "",
		nameEn: initialData?.name?.en || "",
		descriptionId: initialData?.description?.id || "",
		descriptionEn: initialData?.description?.en || "",
		category: initialData?.category || fixedCategory || "navbar",
		code: initialData?.code || "",
		isPublished: initialData?.isPublished || "true",
		previewImage: initialData?.previewImage || "",
	});

	// Effect to handle type switching
	useEffect(() => {
		if (entryType === 'template') {
			setFormData(prev => ({ ...prev, category: 'landing-page' }));
		} else if (entryType === 'component' && formData.category === 'landing-page') {
			// Reset to default component category if switching back from template
			setFormData(prev => ({ ...prev, category: 'navbar' }));
		}
	}, [entryType]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const payload = {
				slug: formData.slug,
				name: { id: formData.nameId, en: formData.nameEn },
				description: { id: formData.descriptionId, en: formData.descriptionEn },
				category: formData.category,
				code: formData.code,
				isPublished: String(formData.isPublished),
				previewImage: formData.previewImage || null,
			};

			const url =
				mode === "create"
					? "/api/components"
					: `/api/components/${initialData?.id}`;

			const response = await fetch(url, {
				method: mode === "create" ? "POST" : "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || "Failed to save component");
			}

			// Determine redirect destination based on the actual saved type
			const destination = (formData.category === 'landing-page' || entryType === 'template')
				? '/admin/templates'
				: '/admin/components';

			router.push(destination);
			router.refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const handleAiGenerate = async () => {
		if (!formData.code || formData.code.trim().length < 10) {
			setError("Please enter some valid code first before generating details.");
			return;
		}

		setIsGenerating(true);
		setError(null);

		try {
			const metadata = await generateComponentMetadata(formData.code);
			setFormData((prev) => ({
				...prev,
				slug: metadata.slug,
				// Only update category if NOT locked by template mode or fixed prop
				category: (fixedCategory || entryType === 'template') ? 'landing-page' : metadata.category,
				nameId: metadata.name.id,
				nameEn: metadata.name.en,
				descriptionId: metadata.description.id,
				descriptionEn: metadata.description.en,
			}));
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to generate metadata with AI.",
			);
		} finally {
			setIsGenerating(false);
		}
	};

	const handleAiGenerateCode = async () => {
		if (!prompt || prompt.trim().length < 5) return;

		setIsGeneratingCode(true);
		setShowPromptDialog(false); // Close dialog immediately
		setError(null);

		try {
			const code = await generateComponentCode(prompt);
			setFormData((prev) => ({ ...prev, code }));
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to generate code with AI.",
			);
		} finally {
			setIsGeneratingCode(false);
			setPrompt("");
		}
	};

	const handleCapture = async () => {
		if (!previewRef.current) return;
		setIsCapturing(true);
		setError(null);
		try {
			const dataUrl = await previewRef.current.capture();
			if (dataUrl) {
				setFormData(prev => ({ ...prev, previewImage: dataUrl }));
				// If we are in preview-only mode, switch back to split view so user can SEE the captured image in the details panel
				if (panelView === 'preview') {
					setPanelView('both');
				}
			}
		} catch (err) {
			console.error(err);
			setError("Failed to capture thumbnail. Please try again.");
		} finally {
			setIsCapturing(false);
		}
	};

	// Clean, consistent styles strictly forcing light/slate theme to avoid "Black Box" glitches
	const inputClasses =
		"w-full px-4 py-2 bg-slate-50 border border-slate-200 focus:border-primary/50 outline-none ring-0 focus:ring-2 focus:ring-primary/20 rounded-lg transition font-medium text-slate-800 text-sm shadow-none placeholder:text-slate-400";

	// Unified Panel Classes - White background, Slate borders, soft shadow
	const panelClasses =
		"bg-white rounded-2xl shadow-sm border border-slate-200 p-8";
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
						{mode === "create" ? `Create ${entityName}` : `Edit ${entityName}`}
					</h2>
					<p className="text-slate-500 mt-1">
						{mode === "create"
							? `Add a new ${entityName.toLowerCase()} to your library.`
							: `Update existing ${entityName.toLowerCase()} details.`}
					</p>
				</div>
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={() => router.push(redirectBaseUrl)}
						className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition flex items-center gap-2 font-medium shadow-sm"
					>
						Cancel
					</button>
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
						{mode === "create" ? `Publish ${entityName}` : "Save Changes"}
					</button>
				</div>
			</div>

			<div className="space-y-8">
				{/* Type Selection - Only show if NO fixed category is provided (create mode generic) or strictly for visual feedback */}
				{!fixedCategory && mode === 'create' && (
					<div className="bg-white p-1 rounded-xl border border-slate-200 inline-flex shadow-sm mb-2">
						<button
							type="button"
							onClick={() => setEntryType('component')}
							className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${entryType === 'component'
								? 'bg-slate-900 text-white shadow-md'
								: 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
								}`}
						>
							<Code className="w-4 h-4" />
							UI Component
						</button>
						<button
							type="button"
							onClick={() => setEntryType('template')}
							className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${entryType === 'template'
								? 'bg-primary text-white shadow-md'
								: 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
								}`}
						>
							<LayoutTemplate className="w-4 h-4" />
							Full Page Template
						</button>
					</div>
				)}

				{/* Component Details Panel - Full Width - Hidden in Preview Only mode */}
				<div className={`${panelClasses} ${panelView === "preview" ? "hidden" : ""}`}>
					<div className={sectionClasses}>
						{/* Section Header */}
						<div className="flex items-center gap-3 pb-6 border-b border-slate-100">
							<div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
								<LayoutTemplate className="w-6 h-6" />
							</div>
							<div>
								<h3 className="text-lg font-semibold text-slate-900">
									{entityName} Details
								</h3>
								<p className="text-sm text-slate-500">
									Essential information and identification
								</p>
							</div>
							<div className="ml-auto">
								<button
									type="button"
									onClick={handleAiGenerate}
									disabled={isGenerating || !formData.code}
									className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
									title="Automatically fill details from code"
								>
									{isGenerating ? (
										<Loader2 className="w-4 h-4 animate-spin" />
									) : (
										<Sparkles className="w-4 h-4" />
									)}
									{isGenerating ? "Analyzing..." : "Magic Generate"}
								</button>
							</div>
						</div>

						{/* Form Fields */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<div className="lg:col-span-4">
								<label className="block text-sm font-semibold text-slate-700 mb-2">
									Slug / URL Path
								</label>
								<div className="relative">
									<span className="absolute left-3 top-2.5 text-slate-400 text-sm font-mono">
										/library/
									</span>
									<input
										type="text"
										value={formData.slug}
										onChange={(e) =>
											setFormData({ ...formData, slug: e.target.value })
										}
										className={`${inputClasses} pl-20 font-mono`}
										placeholder="navbar-modern"
										required
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
									<Type className="w-4 h-4 text-slate-400" />
									Name (ID)
								</label>
								<input
									type="text"
									value={formData.nameId}
									onChange={(e) =>
										setFormData({ ...formData, nameId: e.target.value })
									}
									className={inputClasses}
									placeholder="Navbar Modern"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
									<Globe className="w-4 h-4 text-slate-400" />
									Name (EN)
								</label>
								<input
									type="text"
									value={formData.nameEn}
									onChange={(e) =>
										setFormData({ ...formData, nameEn: e.target.value })
									}
									className={inputClasses}
									placeholder="Modern Navbar"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
									<FileText className="w-4 h-4 text-slate-400" />
									Description (ID)
								</label>
								<textarea
									value={formData.descriptionId}
									onChange={(e) =>
										setFormData({
											...formData,
											descriptionId: e.target.value,
										})
									}
									className={`${inputClasses} min-h-[80px] resize-none`}
									placeholder="Deskripsi singkat..."
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
									<FileText className="w-4 h-4 text-slate-400" />
									Description (EN)
								</label>
								<textarea
									value={formData.descriptionEn}
									onChange={(e) =>
										setFormData({
											...formData,
											descriptionEn: e.target.value,
										})
									}
									className={`${inputClasses} min-h-[80px] resize-none`}
									placeholder="Short description..."
									required
								/>
							</div>

							{/* Preview Image - Full Width */}
							<div className="lg:col-span-4">
								<div className="flex items-center justify-between mb-2">
									<div>
										<label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
											<Eye className="w-4 h-4 text-slate-400" />
											Preview Image
										</label>
										<p className="text-xs text-slate-400 mt-1">
											Shown as thumbnail when database-driven
										</p>
									</div>

								</div>
								<ImageUploader
									value={formData.previewImage}
									onChange={(url) => setFormData({ ...formData, previewImage: url })}
								/>
							</div>

							<div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-semibold text-slate-700 mb-2">
										Category
									</label>
									<div className="relative">
										<select
											value={formData.category}
											onChange={(e) =>
												setFormData({
													...formData,
													category: e.target.value as ComponentCategory,
												})
											}
											className={`${inputClasses} appearance-none cursor-pointer ${fixedCategory || entryType === 'template' ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''}`}
											disabled={!!fixedCategory || entryType === 'template'}
										>
											{availableCategories
												.filter(cat => entryType === 'component' ? cat.slug !== 'landing-page' : cat.slug === 'landing-page')
												.map((cat) => (
													<option key={cat.slug} value={cat.slug}>
														{cat.name}
													</option>
												))}
											{/* Fallback option if filtered list is empty or specifically selecting landing-page */}
											{entryType === 'template' && (
												<option value="landing-page">Landing Page</option>
											)}
											{/* Generic fallbacks */}
											{fixedCategory && !availableCategories.find(c => c.slug === fixedCategory) && (
												<option value={fixedCategory}>{fixedCategory}</option>
											)}
										</select>
										<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
											<LayoutTemplate className="w-4 h-4" />
										</div>
									</div>
								</div>

								<div className="flex items-end">
									<label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg w-full cursor-pointer hover:bg-slate-100 transition group">
										<div className="relative flex items-center">
											<input
												type="checkbox"
												checked={formData.isPublished === "true"}
												onChange={(e) =>
													setFormData({
														...formData,
														isPublished: String(e.target.checked),
													})
												}
												className="peer sr-only"
											/>
											<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
										</div>
										<div>
											<span className="block text-sm font-medium text-slate-900 group-hover:text-primary transition-colors">
												Published
											</span>
											<span className="block text-xs text-slate-500 mt-1">
												Make this component visible in the public library
											</span>
										</div>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Code Editor & Live Preview - Side by Side on Large Screens */}
				<div className={panelClasses}>
					<div className={sectionClasses}>
						{/* Section Header with Panel Controls */}
						<div className="flex items-center justify-between pb-6 border-b border-slate-100">
							<div className="flex items-center gap-3">
								<div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
									<Code className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-lg font-semibold text-slate-900">
										Implementation
									</h3>
									<p className="text-sm text-slate-500">
										Source code and live preview
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<button
									type="button"
									onClick={() => setShowPromptDialog(true)}
									disabled={isGeneratingCode}
									className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-100 transition disabled:opacity-50"
								>
									{isGeneratingCode ? (
										<Loader2 className="w-4 h-4 animate-spin" />
									) : (
										<Wand2 className="w-4 h-4" />
									)}
									{isGeneratingCode ? "Writing..." : "Generate Code"}
								</button>

								{/* Panel View Toggle Buttons */}
								<div className="hidden lg:flex items-center gap-1 bg-slate-100 rounded-lg p-1">
									<button
										type="button"
										onClick={() => setPanelView("code")}
										className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${panelView === "code"
											? "bg-white text-slate-900 shadow-sm"
											: "text-slate-500 hover:text-slate-700"
											}`}
										title="Show code editor only"
									>
										<PanelRightClose className="w-4 h-4" />
										<span className="hidden xl:inline">Code Only</span>
									</button>
									<button
										type="button"
										onClick={() => setPanelView("both")}
										className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${panelView === "both"
											? "bg-white text-slate-900 shadow-sm"
											: "text-slate-500 hover:text-slate-700"
											}`}
										title="Show split view"
									>
										<LayoutTemplate className="w-4 h-4 rotate-90" />
										<span className="hidden xl:inline">Split View</span>
									</button>
									<button
										type="button"
										onClick={() => setPanelView("preview")}
										className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${panelView === "preview"
											? "bg-white text-slate-900 shadow-sm"
											: "text-slate-500 hover:text-slate-700"
											}`}
										title="Show preview only"
									>
										<PanelLeftClose className="w-4 h-4" />
										<span className="hidden xl:inline">Preview Only</span>
									</button>
								</div>

								{/* Mobile View Toggle */}
								<div className="lg:hidden flex items-center gap-1 bg-slate-100 rounded-lg p-1">
									<button
										type="button"
										onClick={() => setPanelView("code")}
										className={`p-2 rounded-md transition-all ${panelView === "code"
											? "bg-white text-slate-900 shadow-sm"
											: "text-slate-500"
											}`}
									>
										<Code className="w-4 h-4" />
									</button>
									<button
										type="button"
										onClick={() => setPanelView("preview")}
										className={`p-2 rounded-md transition-all ${panelView === "preview"
											? "bg-white text-slate-900 shadow-sm"
											: "text-slate-500"
											}`}
									>
										<Eye className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>

						{/* Editor & Preview Area */}
						<div
							className={`grid gap-6 items-start ${panelView === "both" ? "lg:grid-cols-2" : "grid-cols-1"
								}`}
						>
							{/* Code Editor */}
							<div
								className={`border border-slate-200 rounded-xl overflow-hidden shadow-sm ${panelView === "preview" ? "hidden" : "block"} ${panelView === "both" ? "h-[600px] overflow-hidden flex flex-col" : "min-h-[500px]"}`}
							>
								<div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
									<span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
										Source Code
									</span>
									<span className="text-xs text-slate-400 font-mono">tsx</span>
								</div>
								<CodeEditor
									value={formData.code}
									onChange={(val) =>
										setFormData({ ...formData, code: val })
									}
								/>
							</div>

							{/* Live Preview */}
							<div
								className={`bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col ${panelView === "code" ? "hidden" : "block"} ${panelView === "both" ? "h-[600px]" : ""} ${panelView === "preview" ? "min-h-[900px]" : ""}`}
							>
								<div className="bg-white px-4 py-2 border-b border-slate-200 flex items-center justify-between">
									<span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
										<Eye className="w-3 h-3" />
										Live Preview
									</span>
									{panelView === 'preview' && (
										<button
											type="button"
											onClick={handleCapture}
											disabled={isCapturing || !formData.code}
											className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition disabled:opacity-50 shadow-sm border border-indigo-100"
											title="Capture current preview as thumbnail"
										>
											{isCapturing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Camera className="w-3 h-3" />}
											{isCapturing ? "Capturing..." : "Auto-Capture"}
										</button>
									)}
								</div>
								<div className={`flex-1 bg-slate-100/50 overflow-y-auto ${panelView === "preview" ? "min-h-[900px]" : "h-full"}`}>
									<AdminComponentPreview
										ref={previewRef}
										code={formData.code}
										className="w-full"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Simple Prompt Dialog Overlay */}
			{showPromptDialog && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
						<div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<h3 className="font-semibold text-slate-900 flex items-center gap-2">
								<Wand2 className="w-4 h-4 text-emerald-600" />
								Generate Component
							</h3>
							<button
								type="button"
								onClick={() => setShowPromptDialog(false)}
								className="text-slate-400 hover:text-slate-600"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
						<div className="p-4 space-y-4">
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">
									Describe your component
								</label>
								<textarea
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
									placeholder="e.g. A modern pricing card with 3 tiers, blue highlight for the middle plan, and check icons for features..."
									className="w-full h-32 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm resize-none"
									autoFocus
								/>
							</div>
							<div className="flex justify-end gap-2">
								<button
									type="button"
									onClick={() => setShowPromptDialog(false)}
									className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={handleAiGenerateCode}
									disabled={!prompt.trim()}
									className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
								>
									<Wand2 className="w-4 h-4" />
									Generate
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}
