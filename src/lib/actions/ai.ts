"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ComponentCategory } from "@/db/schema";

// Valid categories as a reference for the AI
const VALID_CATEGORIES = [
    "navbar",
    "hero",
    "features",
    "pricing",
    "footer",
    "cta",
    "testimonial", // Singular to match schema
    "faq",
    "contact",
    "blog",
    "gallery",
    "team",
    "stats",
    "sidebar",
    "modal",
    "card",
    "form",
    "table",
    "chart",
    "other",
];

interface GeneratedMetadata {
    slug: string;
    name: {
        id: string;
        en: string;
    };
    description: {
        id: string;
        en: string;
    };
    category: ComponentCategory;
}

// Updated list allowing user specific requests first
const MODELS_TO_TRY = [
    "gemini-2.5-flash", // User requested
    "gemini-2.0-flash", // Stable 2.0
    "gemini-2.0-flash-exp", // Proven to exist (gave 429)
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-1.5-flash-latest",
    "gemini-1.0-pro",
    "gemini-pro",
];

export async function generateComponentMetadata(
    code: string,
): Promise<GeneratedMetadata> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error(
            "GEMINI_API_KEY is not set. Please add it to your .env file and restart the server.",
        );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    if (!code || code.trim().length < 10) {
        throw new Error("Code is too short or empty.");
    }

    const errors: string[] = [];

    // Try models sequentially
    for (const modelName of MODELS_TO_TRY) {
        try {
            console.log(`[AI] Trying model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const prompt = `
        You are an expert React/Next.js developer.
        Analyze the following React component code and generate metadata for a component library.
        
        Code:
        \`\`\`tsx
        ${code.slice(0, 15000)} // truncate to avoid token limits if extremely large
        \`\`\`
  
        Tasks:
        1. Generate a SEO-friendly 'slug' (kebab-case).
        2. Generate a 'name' in both Indonesian (id) and English (en). Keep it short (2-4 words).
        3. Generate a 'description' in both Indonesian (id) and English (en). concise (1-2 sentences).
        4. Determine the best matching 'category' from this list: ${VALID_CATEGORIES.join(", ")}. If unsure, use 'other'.
  
        Return ONLY a valid JSON object with the following structure, no markdown code blocks:
        {
          "slug": "string",
          "name": { "id": "string", "en": "string" },
          "description": { "id": "string", "en": "string" },
          "category": "string"
        }
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Parsing Logic
            let cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
            const firstOpen = cleanText.indexOf("{");
            const lastClose = cleanText.lastIndexOf("}");
            if (firstOpen !== -1 && lastClose !== -1) {
                cleanText = cleanText.substring(firstOpen, lastClose + 1);
            }

            const data = JSON.parse(cleanText) as GeneratedMetadata;

            // Validate category
            if (!VALID_CATEGORIES.includes(data.category)) {
                data.category = "other" as ComponentCategory;
            }

            console.log(`[AI] Success with model: ${modelName}`);
            return data; // Success! Return immediately.

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.warn(`[AI] Failed with model ${modelName}:`, errorMessage);
            errors.push(`${modelName}: ${errorMessage}`);
            // Continue to next model...
        }
    }

    // If all models fail, simplify the error message for the user but log details
    console.error("AI Generation Failed. All models tried:", errors);

    // Check for quota issues specifically
    const isQuotaError = errors.some(e => e.includes("429") || e.includes("Quota"));
    if (isQuotaError) {
        throw new Error("AI Quota Exceeded (429). Please try again in a minute.");
    }

    const isNotFoundError = errors.every(e => e.includes("404"));
    if (isNotFoundError) {
        throw new Error("AI Models not found (404). Check your API Key region support.");
    }

    throw new Error(`AI Generation failed. Details: ${errors[0]}`); // Show first error
}

export async function generateComponentCode(prompt: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error(
            "GEMINI_API_KEY is not set. Please add it to your .env file and restart the server.",
        );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    if (!prompt || prompt.trim().length < 5) {
        throw new Error("Prompt is too short. Please describe the component in more detail.");
    }

    const errors: string[] = [];

    for (const modelName of MODELS_TO_TRY) {
        try {
            console.log(`[AI Code] Trying model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const systemPrompt = `
        You are an expert UI/HTML developer.
        Create a simple, static React component based on the user's description.

        STRICT Requirements:
        1. Use 'export function ComponentName() { return (...) }' syntax.
        2. Use ONLY Tailwind CSS classes for styling.
        3. Do NOT use any React hooks (no useState, useEffect, etc).
        4. Do NOT use props - the component should be self-contained.
        5. Do NOT use external libraries or icon imports.
        6. Use inline SVGs for any icons needed.
        7. Keep it simple - just static HTML with Tailwind classes.
        8. Make it visually appealing and modern.
        9. Return ONLY the code, no explanation.
      `;

            const result = await model.generateContent(`${systemPrompt}\n\nUser Prompt: ${prompt}`);
            const response = await result.response;
            const text = response.text();

            // Clean up markdown code blocks if present
            let cleanCode = text;
            if (cleanCode.includes("```tsx")) {
                cleanCode = cleanCode.replace(/```tsx/g, "").replace(/```/g, "");
            } else if (cleanCode.includes("```jsx")) {
                cleanCode = cleanCode.replace(/```jsx/g, "").replace(/```/g, "");
            } else if (cleanCode.includes("```javascript")) {
                cleanCode = cleanCode.replace(/```javascript/g, "").replace(/```/g, "");
            } else if (cleanCode.includes("```")) {
                cleanCode = cleanCode.replace(/```/g, "");
            }

            console.log(`[AI Code] Success with model: ${modelName}`);
            return cleanCode.trim();

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.warn(`[AI Code] Failed with model ${modelName}:`, errorMessage);
            errors.push(`${modelName}: ${errorMessage}`);
        }
    }

    // Error handling (same as metadata generation)
    console.error("AI Code Generation Failed. All models tried:", errors);
    const isQuotaError = errors.some(e => e.includes("429") || e.includes("Quota"));
    if (isQuotaError) {
        throw new Error("AI Quota Exceeded (429). Please try again in a minute.");
    }
    throw new Error(`AI Code Generation failed. Details: ${errors[0]}`);
}
