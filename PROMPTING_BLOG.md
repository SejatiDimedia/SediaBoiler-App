# SediaBoiler Blog Content Prompt

Use this prompt to generate high-quality, bilingual blog posts that fit directly into the Admin Panel or Seed Script.

---

## 📋 Copy & Paste This to AI (ChatGPT / Claude)

```text
Act as an expert Technical Content Writer and SEO Specialist. 
I need you to write a high-quality, bilingual blog post (English & Indonesian) for a tech blog.

**Context:**
- Niche: Web Development, Next.js, React, TypeScript, Software Engineering.
- Tone: Professional, authoritative, yet engaging and easy to read.
- Format: Markdown (for the body content).

**Requirements:**
Please generate the content in the following **JSON structure** so I can easily copy-paste or use it in my database seed script.

```json
{
  "slug": "kebab-case-url-friendly-slug",
  "coverImage": "Suggest a high-quality Unsplash image URL related to the topic (16:9 aspect ratio)",
  "title": {
    "en": "Catchy English Title (50-60 chars)",
    "id": "Judul Bahasa Indonesia yang Menarik (50-60 chars)"
  },
  "excerpt": {
    "en": "Compelling summary for SEO and card previews (140-160 chars).",
    "id": "Ringkasan menarik untuk SEO dan preview kartu (140-160 chars)."
  },
  "content": {
    "en": "# Main Title (Must match Title EN)\n\nIntroduction paragraph...\n\n## Subheading 1\n\nContent with **bold** text and `inline code`.\n\n```typescript\n// Code example if relevant\nconst example = 'Hello World';\n```\n\n## Conclusion\n\nFinal thoughts...",
    "id": "# Judul Utama (Harus match Title ID)\n\nParagraf pembuka...\n\n## Subjudul 1\n\nKonten dengan teks **tebal** dan `inline code`.\n\n```typescript\n// Contoh kode jika relevan\nconst contoh = 'Halo Dunia';\n```\n\n## Kesimpulan\n\nPemikiran penutup..."
  }
}
```

**Topic to write about:**
[INSERT YOUR TOPIC HERE]
```

---

## 📝 How to Use
1. Copy the text block above.
2. Paste it into ChatGPT, Claude, or Gemini.
3. Replace `[INSERT YOUR TOPIC HERE]` with your desired topic (e.g., "Why use Tailwind CSS v4?").
4. Copy the JSON result.
5. You can now:
   - Paste the values into the **Admin Panel** forms.
   - Or paste the object directly into `src/db/seed-post-ts.ts`.
