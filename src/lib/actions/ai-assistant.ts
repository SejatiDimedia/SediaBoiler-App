"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getComponentSearchIndex } from "./components";


// Message interface for chat history
export interface Message {
    role: "user" | "model";
    content: string;
}

export interface Recommendation {
    slug: string;
    category: string;
    name: string;
}

export interface AiResponse {
    answer: string;
    recommendations: Recommendation[];
}

const MODELS_TO_TRY = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
];

export async function chatWithDocs(
    query: string,
    history: Message[] = []
): Promise<AiResponse> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY not set");
    }

    // 1. Get Component Context
    // Try DB first, fallback to static if empty (dev mode)
    let componentIndex = await getComponentSearchIndex();



    // Create a simplified context string for the AI
    // We only send essential info to save tokens
    const contextString = componentIndex.map(c =>
        `- ${c.slug} (${c.category}): ${c.name.en} / ${c.name.id} - ${c.description.en}`
    ).join("\n");

    const genAI = new GoogleGenerativeAI(apiKey);
    const errors: string[] = [];

    for (const modelName of MODELS_TO_TRY) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });

            const systemPrompt = `
            You are SapaUI Assistant, an expert on the SapaUI component library.
            
            YOUR GOAL:
            Help users find the right components or templates for their needs.
            
            AVAILABLE COMPONENTS (Slug - Category - Name - Description):
            ${contextString}
            
            INSTRUCTIONS:
            1. Analyze the user's query.
            2. Match specific components from the list above.
            3. Answer the user's question in a helpful, friendly tone (support both English and Indonesian based on user's language).
            4. If the user asks for a specific feature (e.g. "online shop"), recommend relevant templates/components (e.g. "landing-saas-startup" or "pricing-simple").
            5. ALWAYS return a JSON object with this structure:
            {
                "answer": "Your helpful text response here...",
                "recommendations": [
                    { "slug": "slug1", "category": "category1", "name": "Name 1" },
                    { "slug": "slug2", "category": "category2", "name": "Name 2" }
                ]
            }
            
            RULES:
            - "recommendations" must be an array of objects with EXACT details from the list.
            - If no relevant component found, return empty array [].
            - Keep the answer concise (2-3 sentences max).
            - Do NOT use markdown code blocks in the output, just raw JSON.
            `;

            // Combine history for context (last 4 messages)
            const chatHistory = history.slice(-4).map(msg =>
                `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
            ).join("\n");

            const finalPrompt = `${systemPrompt}\n\nChat History:\n${chatHistory}\n\nUser Query: ${query}\n\nJSON Response:`;

            const result = await model.generateContent(finalPrompt);
            const response = await result.response;
            const text = response.text();

            // Clean metadata
            let cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
            const firstOpen = cleanText.indexOf("{");
            const lastClose = cleanText.lastIndexOf("}");
            if (firstOpen !== -1 && lastClose !== -1) {
                cleanText = cleanText.substring(firstOpen, lastClose + 1);
            }

            const data = JSON.parse(cleanText) as AiResponse;
            return data;

        } catch (error) {
            console.warn(`[AI Assistant] Model ${modelName} failed:`, error);
            errors.push(String(error));
        }
    }

    throw new Error("Failed to generate response. Please try again.");
}
