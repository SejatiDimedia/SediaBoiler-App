# SediaBoiler Blog Content Prompt (JSON Import Compatible)

Use this prompt to generate high-quality, bilingual blog posts that are perfectly formatted for the **JSON Import** feature.

**Key Features:**
*   Ensures correct JSON structure.
*   **Fixes code block rendering** by enforcing specific formatting.
*   Generates bilingual (English/Indonesian) content.

---

## 📋 Copy & Paste This to AI (ChatGPT / Claude / Gemini)

```text
Act as an expert Technical Content Writer and SEO Specialist.
I need a high-quality, bilingual blog post (English & Indonesian) for a tech blog.

**Goal:**
Generate a valid JSON object containing the blog post content, which I can directly import into my system.

**Critical Requirements:**
1.  **Format:** Output **ONLY** a valid, minified or pretty-printed JSON object. No conversational filler.
2.  **Structure:** Use the exact schema provided below.
3.  **Code Blocks (CRITICAL):**
    - You MUST use standard markdown code blocks (```language) inside the content strings.
    - **IMPORTANT:** Ensure code blocks are surrounded by newlines (`\n\n`) in the JSON string so they render correctly.
    - Example: `...text\n\n```tsx\nconst x = 1;\n```\n\nNext section...`
4.  **Language:** Provide both 'en' (English) and 'id' (Indonesian) for title, excerpt, and content.
5.  **Images:** Use high-quality, real Unsplash URLs for the cover image (16:9 ratio).

**JSON Schema:**

```json
{
  "slug": "kebab-case-url-friendly-slug",
  "coverImage": "https://images.unsplash.com/photo-...",
  "title": {
    "en": "Engaging English Title",
    "id": "Judul Bahasa Indonesia yang Menarik"
  },
  "excerpt": {
    "en": "Concise summary for SEO (140-160 chars).",
    "id": "Ringkasan padat untuk SEO (140-160 chars)."
  },
  "content": {
    "en": "# Main Leading\n\nIntro...\n\n## Subheading\n\nDetails...\n\n```bash\nnpm install package\n```\n\n## Conclusion\n...",
    "id": "# Judul Utama\n\nIntro...\n\n## Subjudul\n\nDetail...\n\n```bash\nnpm install package\n```\n\n## Kesimpulan\n..."
  }
}
```

**Topic to write about:**
[INSERT TOPIC HERE]
```

---

## 📝 How to Use
1.  Copy the code block above.
2.  Paste it into your AI assistant.
3.  Replace `[INSERT TOPIC HERE]` with your topic (e.g., "Deep Dive into React Server Components").
4.  Copy the resulting JSON.
5.  Go to **Admin Blog -> Import JSON** and paste it.
