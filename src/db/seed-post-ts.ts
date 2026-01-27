
import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';

// Richer content for demonstration
const contentEn = `
# Unlocking the Power of TypeScript

TypeScript has rapidly become the industry standard for modern web development. But what makes it so special? In this comprehensive guide, we'll explore why top engineering teams are migrating to TypeScript and how it can supercharge your productivity.

> "TypeScript is JavaScript with superpowers."

## Why Static Typing Matters

JavaScript is dynamically typed, which is flexible but prone to runtime errors. TypeScript introduces **static typing**, allowing you to catch bugs *before* you run your code.

Imagine writing a function that expects a user object. In JavaScript, you might accidentally pass just the ID string.

\`\`\`javascript
// JavaScript - No warning!
function getUser(user) {
  return "User: " + user.name;
}
getUser("123"); // Runtime error: undefined
\`\`\`

In TypeScript, this simply wouldn't compile:

\`\`\`typescript
// TypeScript - Safe!
interface User {
  id: string;
  name: string;
}

function getUser(user: User): string {
  return "User: " + user.name;
}

// Error: Argument of type 'string' is not assignable to parameter of type 'User'.
// getUser("123"); 
\`\`\`

## Key Benefits at a Glance

Switching to TypeScript offers several immediate advantages:

1.  **Intelligent Autocomplete**: Your IDE knows exactly what properties exist on an object.
2.  **Refactoring Confidence**: Rename a symbol and it updates everywhere safely.
3.  **Self-Documenting Code**: Type definitions serve as always-up-to-date documentation.

## Getting Started in Seconds

You don't need a complex setup to try it out.

### 1. Installation

Install TypeScript globally or in your project:

\`\`\`bash
npm install -D typescript
npx tsc --init
\`\`\`

### 2. Your First Type

Create a file named \`index.ts\`:

\`\`\`typescript
type Status = 'idle' | 'loading' | 'success' | 'error';

const appState: Status = 'loading';

// This will throw an error instantly!
// const invalidState: Status = 'pending'; 
\`\`\`

## Conclusion

Adopting TypeScript is an investment that pays off in code quality and maintainability. While there is a learning curve, the safety net it provides is invaluable for any serious project.
`;

const contentId = `
# Membuka Potensi TypeScript

TypeScript dengan cepat menjadi standar industri untuk pengembangan web modern. Tapi apa yang membuatnya begitu istimewa? Dalam panduan lengkap ini, kita akan membahas mengapa tim *engineering* top beralih ke TypeScript dan bagaimana hal itu dapat meningkatkan produktivitas Anda secara drastis.

> "TypeScript adalah JavaScript dengan kekuatan super."

## Mengapa Pengetikan Statis Itu Penting

JavaScript diketik secara dinamis (*dynamically typed*), yang fleksibel tetapi rentan terhadap *error* saat aplikasi berjalan (*runtime*). TypeScript memperkenalkan **pengetikan statis**, yang memungkinkan Anda menangkap *bug* **sebelum** Anda menjalankan kode.

Bayangkan menulis fungsi yang mengharapkan objek user. Di JavaScript, Anda mungkin tidak sengaja hanya mengirimkan string ID.

\`\`\`javascript
// JavaScript - Tidak ada peringatan!
function getUser(user) {
  return "User: " + user.name;
}
getUser("123"); // Runtime error: undefined
\`\`\`

Di TypeScript, kode ini bahkan tidak akan bisa dikompilasi:

\`\`\`typescript
// TypeScript - Aman!
interface User {
  id: string;
  name: string;
}

function getUser(user: User): string {
  return "User: " + user.name;
}

// Error: Argument of type 'string' is not assignable to parameter of type 'User'.
// getUser("123"); 
\`\`\`

## Manfaat Utama Sekilas

Beralih ke TypeScript menawarkan beberapa keuntungan langsung:

1.  **Autocomplete Cerdas**: IDE Anda tahu persis properti apa yang ada pada sebuah objek.
2.  **Refactoring Percaya Diri**: Ubah nama variabel dan perubahan akan diterapkan di mana saja dengan aman.
3.  **Kode yang Mendokumentasikan Diri Sendiri**: Definisi tipe berfungsi sebagai dokumentasi yang selalu *up-to-date*.

## Mulai dalam Hitungan Detik

Anda tidak perlu setup yang rumit untuk mencobanya.

### 1. Instalasi

Instal TypeScript secara global atau di proyek Anda:

\`\`\`bash
npm install -D typescript
npx tsc --init
\`\`\`

### 2. Tipe Pertama Anda

Buat file bernama \`index.ts\`:

\`\`\`typescript
type Status = 'idle' | 'loading' | 'success' | 'error';

const appState: Status = 'loading';

// Ini akan langsung error!
// const invalidState: Status = 'pending'; 
\`\`\`

## Kesimpulan

Mengadopsi TypeScript adalah investasi yang terbayar dalam kualitas kode dan kemudahan pemeliharaan. Meskipun ada kurva belajar, jaring pengaman yang disediakannya sangat berharga untuk proyek serius apa pun.
`;

// ... existing content vars ...

const contentServerActionsEn = `
# Mastering Server Actions in Next.js: The Complete Guide

Server Actions have fundamentally changed how we build data-driven applications in Next.js. They aren't just "syntactic sugar" for API routes—they are a paradigm shift that blurs the line between client and server, enabling true **Remote Procedure Calls (RPC)** without the boilerplate.

In this deep dive, we'll explore why Server Actions are revolutionary, how to implement them correctly, and the best practices for security and performance.

## The Old Way: API Routes & Fetch

Traditionally, handling a form submission in Next.js/React required a multi-step dance:

1.  Create a form component.
2.  Create an API Route Handler (\`pages/api/submit.ts\` or \`app/api/route.ts\`).
3.  Add an \`onSubmit\` handler in your component.
4.  \`fetch()\` the API endpoint.
5.  Handle the loading state manually.
6.  Handle errors manually.
7.  Parse the response.

It was repetitive, correctly typed only with external tools, and broke without JavaScript.

## The New Way: Server Actions

With Server Actions, you define a function that runs on the server, and call it directly from your component.

\`\`\`typescript
// actions.ts
'use server'

import { db } from '@/db';
import { revalidatePath } from 'next/cache';

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: 'pending',
  };
  
  await db.insert(invoices).values(rawFormData);
  revalidatePath('/dashboard/invoices');
}
\`\`\`

And in your component:

\`\`\`tsx
// Component.tsx
import { createInvoice } from '@/actions';

export function InvoiceForm() {
  return (
    <form action={createInvoice}>
      <input name="amount" type="number" />
      <button type="submit">Create</button>
    </form>
  );
}
\`\`\`

**Result:** No API route file. No \`fetch\`. Automatic type safety. And it works with JS disabled!

## Progressive Enhancement & UX

Server Actions integrate deeply with React's latest hooks (\`useActionState\`, \`useFormStatus\`) to provide a seamless user experience even on slow networks.

### Handling Pending States

\`\`\`tsx
'use client'
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button disabled={pending}>
      {pending ? 'Saving...' : 'Save Invoice'}
    </button>
  );
}
\`\`\`

This button automatically disables itself while the Server Action is running. No complex state management required.

## Deep Dive: Security & Closures

One of the most powerful features of Server Actions is that they can capture values from their enclosing scope (closures), effectively encrypting them for the client.

\`\`\`tsx
export function DeleteButton({ id }: { id: string }) {
  // This action securely captures 'id'
  const deleteItem = async () => {
    'use server'
    // Ensure user is authorized!
    const session = await getSession();
    if (!session) throw new Error('Unauthorized');
    
    await db.delete(items).where(eq(items.id, id));
  };

  return (
    <form action={deleteItem}>
      <button type="submit">Delete</button>
    </form>
  );
}
\`\`\`

**Security Note:** Always validate authentication and authorization *inside* every Server Action. Just because it looks like a local function doesn't mean it's trusted!

## Caching & Revalidation

Server Actions are the "write" counterpart to the Next.js Cache "read" system.

When you mutate data, you typically want to update the UI immediately. Next.js provides \`revalidatePath\` and \`revalidateTag\` to purge cached data.

-   **revalidatePath('/blog')**: Reloads the blog index.
-   **revalidateTag('posts')**: Reloads any data fetch tagged with 'posts'.

## Conclusion

Server Actions represent the maturation of the React Server Components model. They allow us to build full-stack applications with the mental model of a monolithic function call, while retaining the scalability of a distributed system.

Start adopting them for your forms today, and enjoy the deleted code!
`;

const contentServerActionsId = `
# Menguasai Server Actions di Next.js: Panduan Lengkap

Server Actions telah mengubah cara kita membangun aplikasi berbasis data di Next.js secara fundamental. Fitur ini bukan sekadar "pemanis sintaks" untuk API Routes—ini adalah perubahan paradigma yang mengaburkan batas antara klien dan server, memungkinkan **Remote Procedure Calls (RPC)** sejati tanpa kerumitan kode boilerplate.

Dalam pembahasan mendalam ini, kita akan mengeksplorasi mengapa Server Actions revolusioner, cara mengimplementasikannya dengan benar, dan praktik terbaik untuk keamanan serta performa.

## Cara Lama: API Routes & Fetch

Secara tradisional, menangani pengiriman formulir (form submission) di Next.js/React membutuhkan langkah-langkah panjang:

1.  Membuat komponen form.
2.  Membuat API Route Handler (\`pages/api/submit.ts\` atau \`app/api/route.ts\`).
3.  Menambahkan handler \`onSubmit\` di komponen.
4.  Melakukan \`fetch()\` ke endpoint API.
5.  Menangani state loading secara manual.
6.  Menangani error secara manual.
7.  Parsing response JSON.

Proses ini repetitif, hanya memiliki keamanan tipe (type safety) jika menggunakan alat eksternal, dan akan rusak jika JavaScript dimatikan.

## Cara Baru: Server Actions

Dengan Server Actions, Anda mendefinisikan sebuah fungsi yang berjalan di server, lalu memanggilnya langsung dari komponen Anda.

\`\`\`typescript
// actions.ts
'use server'

import { db } from '@/db';
import { revalidatePath } from 'next/cache';

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: 'pending',
  };
  
  await db.insert(invoices).values(rawFormData);
  revalidatePath('/dashboard/invoices');
}
\`\`\`

Dan di komponen Anda:

\`\`\`tsx
// Component.tsx
import { createInvoice } from '@/actions';

export function InvoiceForm() {
  return (
    <form action={createInvoice}>
      <input name="amount" type="number" />
      <button type="submit">Buat Invoice</button>
    </form>
  );
}
\`\`\`

**Hasilnya:** Tidak ada file API route. Tidak ada \`fetch\`. Keamanan tipe otomatis. Dan berfungsi tanpa JavaScript!

## Peningkatan Bertahap & UX

Server Actions terintegrasi sangat dalam dengan hook terbaru React (\`useActionState\`, \`useFormStatus\`) untuk memberikan pengalaman pengguna yang mulus bahkan di jaringan lambat.

### Menangani Status Loading (Pending)

\`\`\`tsx
'use client'
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button disabled={pending}>
      {pending ? 'Menyimpan...' : 'Simpan Invoice'}
    </button>
  );
}
\`\`\`

Tombol ini secara otomatis menonaktifkan dirinya sendiri saat Server Action sedang berjalan. Tidak perlu manajemen state yang rumit.

## Bahasan Dalam: Keamanan & Closures

Salah satu fitur paling canggih dari Server Actions adalah kemampuannya menangkap nilai dari scope pembungkusnya (closures), yang secara efektif mengenkripsinya untuk klien.

\`\`\`tsx
export function DeleteButton({ id }: { id: string }) {
  // Action ini menangkap 'id' secara aman
  const deleteItem = async () => {
    'use server'
    // Pastikan user terautentikasi!
    const session = await getSession();
    if (!session) throw new Error('Unauthorized');
    
    await db.delete(items).where(eq(items.id, id));
  };

  return (
    <form action={deleteItem}>
      <button type="submit">Hapus</button>
    </form>
  );
}
\`\`\`

**Catatan Keamanan:** Selalu validasi autentikasi dan otorisasi *di dalam* setiap Server Action. Hanya karena terlihat seperti fungsi lokal, bukan berarti fungsi tersebut aman secara default!

## Caching & Revalidasi

Server Actions adalah pasangan "tulis" (write) untuk sistem caching "baca" (read) di Next.js.

Saat Anda memutasi data, Anda biasanya ingin memperbarui UI segera. Next.js menyediakan \`revalidatePath\` dan \`revalidateTag\` untuk membersihkan data yang tersimpan di cache.

-   **revalidatePath('/blog')**: Memuat ulang indeks blog.
-   **revalidateTag('posts')**: Memuat ulang data fetch apa pun yang ditandai dengan 'posts'.

## Kesimpulan

Server Actions merepresentasikan kematangan model React Server Components. Mereka memungkinkan kita membangun aplikasi full-stack dengan model mental pemanggilan fungsi monolitik, sambil tetap mempertahankan skalabilitas sistem terdistribusi.

Mulai adopsi fitur ini untuk formulir Anda hari ini, dan nikmati banyaknya kode yang bisa Anda hapus!
`;

// ... (previous content variables)

const contentPerformanceEn = `
# Optimizing Next.js Performance: The Ultimate Guide

In 2024, web performance isn't just a "nice to have"—it's a critical factor for SEO, user retention, and conversion rates. Next.js gives us incredible tools out of the box, but using them correctly is the key to achieving a perfect 100 Lighthouse score.

## 1. Mastering next/image

Images often account for the largest payload contributing to LCP (Largest Contentful Paint).

The \`next/image\` component automatically:
- Serves correctly sized images for each device.
- Convers images to modern formats like WebP or AVIF.
- Prevents layout shifts (CLS).

\`\`\`tsx
import Image from 'next/image';
import heroImg from './hero.jpg';

export function Hero() {
  return (
    <div className="relative h-96">
      <Image 
        src={heroImg}
        alt="Hero Image"
        fill
        priority // Critical for LCP!
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
\`\`\`

**Tip:** Always use the \`priority\` prop for your LCP element (usually the hero image).

## 2. Font Optimization with next/font

Google Fonts can be a blocking resource. \`next/font\` automatically optimizes your fonts (including custom fonts) and removes external network requests for improved privacy and performance.

\`\`\`typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevents FOIT
});
\`\`\`

## 3. Dynamic Imports & Lazy Loading

Don't ship code the user doesn't need yet. Use \`next/dynamic\` to lazy load heavy components like modals, charts, or maps.

\`\`\`tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Loading Chart...</p>,
  ssr: false // If it relies on window/browser APIs
});
\`\`\`

## 4. Script Optimization

Third-party scripts (Analytics, Ads, Chat widgets) are performance killers. Use the \`Script\` component to control *when* they load.

\`\`\`tsx
import Script from 'next/script';

<Script 
  src="https://third-party.com/script.js"
  strategy="lazyOnload" // Load during idle time
/>
\`\`\`

## Conclusion

Performance is an iterative process. By leveraging these core Next.js primitives, you can build applications that feel instant and rank higher on Google.
`;

const contentPerformanceId = `
# Optimasi Performa Next.js: Panduan Lengkap

Di tahun 2024, performa web bukan lagi sekadar "fitur tambahan"—ini adalah faktor kritis untuk SEO, retensi pengguna, dan tingkat konversi. Next.js memberikan kita alat yang luar biasa secara bawaan, namun menggunakannya dengan benar adalah kunci mencapai skor Lighthouse 100 yang sempurna.

## 1. Menguasai next/image

Gambar sering kali menjadi penyumbang payload terbesar untuk LCP (Largest Contentful Paint).

Komponen \`next/image\` secara otomatis:
- Menyajikan gambar dengan ukuran yang tepat untuk setiap perangkat.
- Mengonversi gambar ke format modern seperti WebP atau AVIF.
- Mencegah pergeseran tata letak (Layout Shift/CLS).

\`\`\`tsx
import Image from 'next/image';
import heroImg from './hero.jpg';

export function Hero() {
  return (
    <div className="relative h-96">
      <Image 
        src={heroImg}
        alt="Hero Image"
        fill
        priority // Kritis untuk LCP!
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
\`\`\`

**Tip:** Selalu gunakan prop \`priority\` untuk elemen LCP Anda (biasanya gambar hero/utama).

## 2. Optimasi Font dengan next/font

Google Fonts bisa menjadi sumber daya yang memblokir rendering. \`next/font\` secara otomatis mengoptimalkan font Anda (termasuk font kustom) dan menghapus permintaan jaringan eksternal untuk privasi dan performa yang lebih baik.

\`\`\`typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Mencegah FOIT
});
\`\`\`

## 3. Dynamic Imports & Lazy Loading

Jangan kirim kode yang belum dibutuhkan pengguna. Gunakan \`next/dynamic\` untuk memuat komponen berat secara malas (lazy load) seperti modal, grafik, atau peta.

\`\`\`tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Memuat Grafik...</p>,
  ssr: false // Jika bergantung pada API window/browser
});
\`\`\`

## 4. Optimasi Script

Script pihak ketiga (Analytics, Iklan, Widget Chat) adalah pembunuh performa. Gunakan komponen \`Script\` untuk mengontrol *kapan* mereka dimuat.

\`\`\`tsx
import Script from 'next/script';

<Script 
  src="https://third-party.com/script.js"
  strategy="lazyOnload" // Memuat saat waktu idle
/>
\`\`\`

## Kesimpulan

Performa adalah proses yang iteratif. Dengan memanfaatkan primitif inti Next.js ini, Anda dapat membangun aplikasi yang terasa instan dan mendapatkan peringkat lebih tinggi di Google.
`;

const posts = [
    {
        slug: 'introduction-to-typescript',
        title: {
            en: 'Unlocking the Power of TypeScript',
            id: 'Membuka Potensi dan Kekuatan TypeScript'
        },
        excerpt: {
            en: 'Discover why top teams are switching to TypeScript. A guide to static typing, productivity boosts, and bug-free code.',
            id: 'Temukan mengapa tim top beralih ke TypeScript. Panduan untuk pengetikan statis, peningkatan produktivitas, dan kode bebas bug.'
        },
        coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2662&auto=format&fit=crop',
        isPublished: true,
        content: {
            en: contentEn,
            id: contentId
        }
    },
    {
        slug: 'mastering-server-actions',
        title: {
            en: 'Mastering Server Actions in Next.js',
            id: 'Menguasai Server Actions di Next.js'
        },
        excerpt: {
            en: 'Say goodbye to manual API routes. Learn how Server Actions simplify data mutations and improve progressive enhancement.',
            id: 'Ucapkan selamat tinggal pada rute API manual. Pelajari cara Server Actions menyederhanakan mutasi data.'
        },
        coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop',
        isPublished: true,
        content: {
            en: contentServerActionsEn,
            id: contentServerActionsId
        }
    },
    {
        slug: 'optimizing-nextjs-performance',
        title: {
            en: 'Optimizing Next.js Performance: The Ultimate Guide',
            id: 'Optimasi Performa Next.js: Panduan Lengkap'
        },
        excerpt: {
            en: 'Achieve a 100 Lighthouse score by mastering next/image, font optimization, lazy loading, and script strategies.',
            id: 'Capai skor Lighthouse 100 dengan menguasai next/image, optimasi font, lazy loading, dan strategi script.'
        },
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        isPublished: true,
        content: {
            en: contentPerformanceEn,
            id: contentPerformanceId
        }
    }
];

async function main() {
    console.log('🌱 Seeding Rich Blog Posts...');

    let connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('DATABASE_URL is not set');
        process.exit(1);
    }

    if (connectionString.includes(':6543')) {
        connectionString = connectionString.replace(':6543', ':5432');
    }

    const sql = postgres(connectionString, {
        max: 1,
        prepare: false,
    });

    try {
        console.log('🧹 Clearing existing posts...');
        await sql`DELETE FROM posts`;
        console.log('✅ Posts cleared!');

        for (const post of posts) {
            console.log(`📝 Inserting post: ${post.slug}...`);
            await sql`
                INSERT INTO posts (
                    slug, title, content, excerpt, cover_image, is_published, published_at
                ) VALUES (
                    ${post.slug},
                    ${JSON.stringify(post.title)},
                    ${JSON.stringify(post.content)},
                    ${JSON.stringify(post.excerpt)},
                    ${post.coverImage},
                    ${post.isPublished},
                    NOW()
                )
            `;
        }
        console.log('✅ All posts created successfully!');

    } catch (error) {
        console.error('❌ Error seeding posts:', error);
    } finally {
        await sql.end();
        process.exit(0);
    }
}

main();
