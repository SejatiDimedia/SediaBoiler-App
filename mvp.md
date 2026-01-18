===========================================================
        DOKUMEN PERENCANAAN PROYEK: SEDIABOILER
===========================================================
Nama Brand   : SediaBoiler
Tagline      : "Fondasi Siap Pakai, Coding Jadi Lancar"
Visi         : UI Library Bilingual & Boilerplate Generator
Warna Utama  : Electric Blue (#2563EB), Slate, White
Bahasa       : Indonesia & English
-----------------------------------------------------------

I. USER REQUIREMENTS SPECIFICATION (URS)

1. TUJUAN SISTEM
Membangun platform library komponen UI yang menyediakan kode 
siap pakai (copy-paste) dan nantinya berfungsi sebagai 
pondasi otomatisasi boilerplate aplikasi full-stack.

2. KEBUTUHAN FUNGSIONAL (Functional Requirements)
- F01: Katalog Komponen: Grid system untuk menampilkan preview 
       visual komponen.
- F02: Live Preview: Render komponen secara real-time di browser.
- F03: Responsive Switcher: Toggle Mobile (320px), Tablet (768px), 
       dan Desktop (100% width).
- F04: Copy-to-Clipboard: Fitur menyalin kode JSX/Tailwind dengan 
       sekali klik.
- F05: Syntax Highlighting: Tampilan kode berwarna (Shiki/Prism).
- F06: Pencarian & Kategori: Filter berdasarkan jenis (Navbar, Hero, dll).
- F07: Multibahasa (i18n): Toggle bahasa Indonesia dan Inggris untuk 
       seluruh antarmuka dan deskripsi komponen.

3. KEBUTUHAN NON-FUNGSIONAL (Non-Functional Requirements)
- NF01: Performance: Skor Lighthouse minimal 90.
- NF02: SEO & i18n: Sub-path routing (e.g., /id/ atau /en/).
- NF03: Mobile First: Website fully responsive.

-----------------------------------------------------------
II. SCOPE MVP (MINIMUM VIABLE PRODUCT)
-----------------------------------------------------------

1. FITUR UTAMA MVP:
- Landing Page Bilingual bergaya LaunchPike (Clean SaaS).
- Halaman Library Komponen dengan deskripsi dalam 2 bahasa.
- Component Previewer Engine (Tab Preview & Tab Code).
- Language Switcher (ID/EN) di Navbar.
- 15 Komponen Dasar (Navbar, Hero, Features, Pricing, Footer).

2. TECH STACK:
- Framework: Next.js 14/15 (App Router)
- Styling: Tailwind CSS
- Database: Supabase (PostgreSQL)
- ORM: Drizzle ORM
- Multibahasa: next-intl
- Icon: Lucide React
- Syntax Highlighter: Shiki
- Deployment: Vercel

-----------------------------------------------------------
III. LANGKAH AWAL IMPLEMENTASI
-----------------------------------------------------------

Langkah 1: Setup Dasar & Multibahasa
- Install Next.js: npx create-next-app@latest sediaboiler
- Install i18n: npm install next-intl
- Setup folder: messages/id.json dan messages/en.json
- Konfigurasi middleware.ts untuk deteksi bahasa otomatis.

Langkah 2: Arsitektur Data & Database
- Hubungkan project ke Supabase.
- Setup Drizzle ORM.
- Buat tabel 'components' dengan dukungan kolom JSONB untuk 
  deskripsi bilingual (id/en).

Langkah 3: Membangun Previewer Engine
- Buat komponen 'ComponentViewer.tsx' dengan tab switcher.
- Implementasikan Shiki untuk merender kode JSX dengan warna.
- Tambahkan fitur salin kode dengan notifikasi sukses.

Langkah 4: Desain & Konten
- Konfigurasi tailwind.config.ts dengan palet biru (#2563EB).
- Masukkan 5-10 komponen awal sebagai konten dasar.

-----------------------------------------------------------
IV. ROADMAP MASA DEPAN: BOILERPLATE GENERATOR
-----------------------------------------------------------
- Fase 1: Koleksi Komponen & Multibahasa (Sekarang).
- Fase 2: Template Full-Page (Landing page utuh).
- Fase 3: Dashboard & Auth Module (Next.js + Supabase).
- Fase 4: SediaBoiler Engine (Generator .zip untuk Next.js 
          dan Laravel + Next.js).

===========================================================


