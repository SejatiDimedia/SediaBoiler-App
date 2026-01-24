# Sedia Boiler Template Prompting Guide

Gunakan panduan ini saat meminta ChatGPT/Claude untuk membuat template kit baru agar kompatibel dengan sistem Sedia Boiler.

## Core Rules `(Wajib)`

10 aturan emas agar kode langsung jalan di previewer:

1. **Single File Only**: Semua kode harus ada dalam 1 file `.tsx`. Jangan split file.
2. **No External UI Imports**: Jangan import dari `@/components/ui/...` atau library lain. Buat semua komponen (Button, Card, Input) dari nol menggunakan Tailwind di dalam file yang sama.
3. **No Framer Motion**: Previewer saat ini belum support `framer-motion`. Gunakan CSS transition/animation standar Tailwind.
4. **Icons**: Gunakan library `lucide-react` saja. Import icon yang dibutuhkan. **WAJIB**: Set ukuran icon menggunakan class Tailwind (contoh: `w-5 h-5`) dan tambahkan `flex-shrink-0` agar tidak terjepit. Jangan hanya mengandalkan prop `size`.
5. **Tailwind CSS**: Gunakan class Tailwind standar. Arbitrary values (contoh: `bg-[#123456]`) diperbolehkan.
6. **Images**: Gunakan placeholder image dari Unsplash atau placehold.co.
7. **React Hooks**: Boleh menggunakan `useState`, `useEffect`, `useRef`.
8. **Export**: Pastikan export komponen utama sebagai `export default function TemplateName()`.
9. **Responsive**: Desain harus responsive (Mobile default, `md:` untuk tablet, `lg:` untuk desktop).
10. **Sub-components**: Definisikan sub-component (Hero, Footer, dll) di bagian bawah file yang sama, jangan export mereka.

---

## Copy-Paste Prompt Template

Copy prompt di bawah ini ke ChatGPT/Claude:

```markdown
I need you to build a complete, production-ready Landing Page Template Kit compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Single File**: Write the entire code in one `landing-page.tsx` file.
2. **Libraries**: Use ONLY `react` (hooks) and `lucide-react` (icons). **CRITICAL**: Always style icons with explicit Tailwind classes (e.g., `w-5 h-5 flex-shrink-0`) instead of relying on the `size` prop.
3. **Styling**: Use Tailwind CSS for everything. Use arbitrary values (e.g., `h-[500px]`, `bg-[#1a1a1a]`) if specific styling is needed.
4. **No External Imports**: Do NOT import components like Button/Card from local paths. Build them inside this file if needed.
5. **No Animations Library**: Do NOT use framer-motion. Use Tailwind's `transition-all duration-300` or `@keyframes` in a `<style>` tag if absolutely necessary.
6. **Images**: Use functional `img` tags with source URLs from Unsplash (e.g., `https://images.unsplash.com/photo-...?auto=format&fit=crop&w=800&q=80`).

**Design Requirements:**
- **Theme**: [SEBUTKAN TEMA DISINI, misal: Minimalist SaaS / Dark Cyberpunk / Corporate Blue / Retro Pop]
- **Sections Required**:
  1. Navbar (Responsive with mobile menu state)
  2. Hero Section (Headline, Subhead, CTA, Image/Graphic)
  3. Logo Cloud (Social Proof)
  4. Features Grid (Icon + Title + Description)
  5. Pricing Cards (Toggle Monthly/Yearly if possible using state)
  6. FAQ Accordion (Interactive using state)
  7. CTA/Footer Area

**Output Format:**
Provide the full React code block starting with `'use client';`
```

---

## Contoh Instruksi Spesifik (Estetika)

Jika ingin gaya tertentu, tambahkan instruksi ini di bagian **Theme**:

**1. Gaya Neubrutalism (Seperti contoh)**
> "Style: Neubrutalism. Use hard black borders (border-2 border-black), vibrant colors (yellow, pink, purple), strong box shadows (shadow-[4px_4px_0_0_#000]), and bold typography. Make it feel playful and rebellious."

**2. Gaya Modern SaaS (Clean)**
> "Style: Linear/Intercom inspired. Use heavy gradients for text, glassy backgrounds (backdrop-blur, bg-white/10), thin borders, and huge glow effects. Dark mode default."

**3. Gaya Portfolio Agency**
> "Style: Awwwards winner vibes. Large typography, lots of whitespace, smooth hover effects, grid layouts using `grid-cols-12`."

---

## Troubleshooting

Jika hasil generate error di preview:
- **Error: "Module not found"**: Cek apakah AI mengimport sesuatu yang aneh (misal `import { Button }`). Minta AI untuk "Please inline the Button component definition in the same file instead of importing it."
- **Preview Kosong**: Cek apakah ada `export default`.
- **Icon Hilang/Raksasa**: Pastikan import dari `lucide-react` benar. Jika icon terlalu besar, tambahkan class `w-5 h-5` secara eksplisit dan `flex-shrink-0`.
