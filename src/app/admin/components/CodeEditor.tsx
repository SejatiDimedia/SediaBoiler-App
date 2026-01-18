"use client";

import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
	value: string;
	onChange: (value: string) => void;
	language?: string;
	className?: string;
	rows?: number;
	placeholder?: string;
}

export function CodeEditor({
	value,
	onChange,
	language = "tsx",
	className,
	rows = 32,
	placeholder = "export function MyComponent() { ... }",
}: CodeEditorProps) {
	const handleChange = useCallback(
		(val: string) => {
			onChange(val);
		},
		[onChange]
	);

	// Calculate height based on rows
	const editorHeight = `${rows * 22}px`;

	return (
		<div className={cn("relative group", className)}>
			{/* Language Label */}
			<div className="absolute top-2 right-2 z-10">
				<span className="px-2 py-1 bg-slate-700/80 text-slate-300 text-xs font-mono rounded-md">
					{language}
				</span>
			</div>

			{/* CodeMirror Editor */}
			<CodeMirror
				value={value}
				height={editorHeight}
				minHeight="500px"
				theme={oneDark}
				extensions={[
					javascript({ jsx: true, typescript: true }),
				]}
				onChange={handleChange}
				placeholder={placeholder}
				basicSetup={{
					lineNumbers: true,
					highlightActiveLineGutter: true,
					highlightSpecialChars: true,
					history: true,
					foldGutter: true,
					drawSelection: true,
					dropCursor: true,
					allowMultipleSelections: true,
					indentOnInput: true,
					syntaxHighlighting: true,
					bracketMatching: true,
					closeBrackets: true,
					autocompletion: true,
					rectangularSelection: true,
					crosshairCursor: false,
					highlightActiveLine: true,
					highlightSelectionMatches: true,
					closeBracketsKeymap: true,
					defaultKeymap: true,
					searchKeymap: true,
					historyKeymap: true,
					foldKeymap: true,
					completionKeymap: true,
					lintKeymap: true,
					tabSize: 2,
				}}
				className="rounded-xl overflow-hidden border border-slate-700"
			/>
		</div>
	);
}
