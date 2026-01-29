
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

const contentDockerEn = `
# Docker for Beginners: Complete Guide

Docker has revolutionized how developers build, ship, and run applications. In this comprehensive guide, we'll explore the fundamentals of Docker, understand why it's become an essential tool for modern web development, and learn how to use it effectively for your projects.

## Understanding Docker: The Basics

### What is Docker?

Docker is a platform that uses OS-level virtualization to deliver software in packages called **containers**. Think of containers as lightweight, standalone packages that include everything needed to run an application: code, runtime, system tools, libraries, and settings.

### Containers vs Virtual Machines

This is a crucial distinction to understand:

**Virtual Machines (VMs):**
- Each VM runs a complete operating system
- Requires more memory and disk space
- Slower startup time (minutes)
- Example: VirtualBox, VMware

**Containers:**
- Share the host OS kernel
- Only include the application and its dependencies
- Faster startup (seconds)
- Example: Docker, Podman

**Analogy:** VMs are like separate houses with their own utilities. Containers are like apartments in one building—they share utilities (water, electricity) but are completely separate living spaces.

## Why Docker Matters

### The "Works on My Machine" Problem

Every developer has experienced this scenario: an application works perfectly on your laptop but fails in production or on a colleague's machine. Docker eliminates this by creating consistent environments.

### Key Benefits

1. **Consistency**: Run the same application across different environments (development, staging, production)
2. **Efficiency**: Containers share the host OS kernel, making them lightweight (often 50-100MB vs VMs which are GBs)
3. **Portability**: Deploy anywhere - laptop, cloud, or on-premise servers
4. **Isolation**: Applications don't interfere with each other
5. **Scalability**: Easily scale applications up or down by running multiple containers
6. **Team Collaboration**: Everyone uses the same environment, eliminating configuration issues

## Docker Architecture

Before diving in, understand these key concepts:

- **Dockerfile**: A text file with instructions to build a Docker image
- **Docker Image**: A read-only template with your application and dependencies
- **Docker Container**: A running instance of a Docker image
- **Docker Registry**: A repository for storing and sharing images (like Docker Hub)
- **Docker Daemon**: The background service that manages containers
- **Docker CLI**: The command-line interface to interact with Docker

## Essential Docker Commands

### Image Management

\`\`\`bash
# Search for an image on Docker Hub
docker search nginx

# Pull an image from Docker Hub
docker pull nginx:latest

# List downloaded images
docker images
# or
docker image ls

# Remove an image
docker rmi nginx:latest

# Build an image from Dockerfile
docker build -t myapp:latest .
docker build -t myapp:v1.0 -f Dockerfile.prod .
\`\`\`

### Container Management

\`\`\`bash
# Run a new container
docker run -d -p 80:80 --name my-webserver nginx

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View container logs
docker logs my-webserver

# View logs in real-time
docker logs -f my-webserver

# Execute commands inside a running container
docker exec -it my-webserver /bin/bash

# Stop a running container
docker stop my-webserver

# Start a stopped container
docker start my-webserver

# Restart a container
docker restart my-webserver

# Remove a container
docker rm my-webserver

# Force remove a running container
docker rm -f my-webserver
\`\`\`

### Volume Management (Data Persistence)

\`\`\`bash
# Create a volume
docker volume create my-data

# List volumes
docker volume ls

# Mount a volume to a container
docker run -v my-data:/app/data myapp:latest

# Mount a local directory to container
docker run -v $(pwd)/data:/app/data myapp:latest
\`\`\`

## Creating Your First Dockerfile

Let's create a Dockerfile for a simple Node.js application.

### Basic Dockerfile

\`\`\`dockerfile
# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "index.js"]
\`\`\`

### Optimized Multi-Stage Dockerfile

This is better for production as it reduces image size:

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
\`\`\`

### Dockerfile for Next.js

\`\`\`dockerfile
# Base image
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
\`\`\`

## Docker Compose: Managing Multi-Container Applications

For applications requiring multiple services (database, cache, etc.), Docker Compose is the perfect solution. It allows you to define and run multi-container applications with a single YAML file.

### Basic docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

### Docker Compose Commands

\`\`\`bash
# Start all services
docker-compose up

# Start services in detached mode (background)
docker-compose up -d

# Stop all services
docker-compose down

# Stop services and remove volumes
docker-compose down -v

# View logs from all services
docker-compose logs

# View logs from a specific service
docker-compose logs app

# Rebuild and restart services
docker-compose up --build

# Execute command in a service
docker-compose exec app npm run migrations
\`\`\`

## Best Practices

1. **Use Specific Versions**: Instead of \`FROM node:latest\`, use \`FROM node:18.16.0\`
2. **Minimize Layers**: Combine RUN commands where possible
3. **Use .dockerignore**: Exclude unnecessary files from build context
4. **Don't Run as Root**: Create a non-root user in your container
5. **Use Alpine Images**: For smaller image sizes when compatible
6. **Scan for Vulnerabilities**: Use \`docker scan\` to check for security issues

### Example .dockerignore

\`\`\`text
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.env.local
\`\`\`

## Debugging Common Issues

### Container Won't Start

Check the logs:
\`\`\`bash
docker logs <container-id>
\`\`\`

### Port Already in Use

Find and stop the conflicting container:
\`\`\`bash
docker ps
docker stop <container-id>
\`\`\`

### Out of Space

Clean up unused resources:
\`\`\`bash
# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune -a

# Remove all unused volumes
docker volume prune

# Remove everything not associated with running containers
docker system prune -a
\`\`\`

## Real-World Example: Full Stack Application

Here's a complete docker-compose.yml for a Next.js + PostgreSQL + Redis stack:

\`\`\`yaml
version: '3.8'

services:
  nextjs:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://postgres:password@postgres:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped

volumes:
  postgres_data:
\`\`\`

## Next Steps

Now that you understand the basics, consider exploring:

1. **Docker Networks**: Learn how to communicate between containers
2. **Docker Swarm**: Simple orchestration for multiple hosts
3. **Kubernetes**: Advanced orchestration for large-scale applications
4. **CI/CD Integration**: Integrate Docker into your deployment pipeline
5. **Docker Registry**: Host your own private registry

## Conclusion

Docker has become an essential tool in modern software development. It simplifies development workflows, ensures consistency across environments, and enables scalable deployments. Start with simple containers for your development environment, then gradually explore advanced features like multi-stage builds, Docker Compose for complex applications, and orchestration tools like Kubernetes for production workloads.

The learning curve is moderate, but the benefits in terms of productivity, collaboration, and deployment reliability make it well worth the investment. Happy containerizing!
`;

const contentDockerId = `
# Docker untuk Pemula: Panduan Lengkap

Docker telah merevolusi cara developer membangun, mengirim, dan menjalankan aplikasi. Dalam panduan komprehensif ini, kita akan mengeksplorasi dasar-dasar Docker, memahami mengapa ini menjadi alat penting untuk pengembangan web modern, dan mempelajari cara menggunakannya secara efektif untuk proyek Anda.

## Memahami Docker: Dasar-dasar

### Apa itu Docker?

Docker adalah platform yang menggunakan virtualisasi tingkat OS untuk mengirimkan perangkat lunak dalam paket yang disebut **container**. Bayangkan container sebagai paket ringan dan mandiri yang mencakup semua yang dibutuhkan untuk menjalankan aplikasi: kode, runtime, alat sistem, library, dan pengaturan.

### Container vs Virtual Machine

Ini adalah perbedaan penting yang harus dipahami:

**Virtual Machine (VM):**
- Setiap VM menjalankan sistem operasi yang lengkap
- Membutuhkan lebih banyak memori dan ruang disk
- Waktu startup lebih lama (beberapa menit)
- Contoh: VirtualBox, VMware

**Container:**
- Berbagi kernel OS host
- Hanya mencakup aplikasi dan dependensinya
- Startup lebih cepat (detik)
- Contoh: Docker, Podman

**Analogi:** VM itu seperti rumah terpisah dengan utilitas masing-masing. Container itu seperti apartemen di satu gedung—mereka berbagi utilitas (air, listrik) tetapi ruang hidupnya benar-benar terpisah.

## Mengapa Docker Penting

### Masalah "Works on My Machine"

Setiap developer pernah mengalami skenario ini: aplikasi berjalan dengan sempurna di laptop tetapi gagal di production atau di mesin teman. Docker menghilangkan ini dengan menciptakan lingkungan yang konsisten.

### Manfaat Utama

1. **Konsistensi**: Jalankan aplikasi yang sama di berbagai lingkungan (development, staging, production)
2. **Efisiensi**: Container berbagi kernel OS host, membuatnya ringan (biasanya 50-100MB vs VM yang berukuran GB)
3. **Portabilitas**: Deploy di mana saja - laptop, cloud, atau server on-premise
4. **Isolasi**: Aplikasi tidak saling mengganggu
5. **Skalabilitas**: Mudah menskalakan aplikasi naik atau turun dengan menjalankan beberapa container
6. **Kolaborasi Tim**: Semua orang menggunakan lingkungan yang sama, menghilangkan masalah konfigurasi

## Arsitektur Docker

Sebelum mendalami, pahami konsep-konsep penting ini:

- **Dockerfile**: File teks dengan instruksi untuk membangun Docker image
- **Docker Image**: Template read-only dengan aplikasi dan dependensi Anda
- **Docker Container**: Instance yang sedang berjalan dari Docker image
- **Docker Registry**: Repository untuk menyimpan dan berbagi image (seperti Docker Hub)
- **Docker Daemon**: Layanan background yang mengelola container
- **Docker CLI**: Antarmuka command-line untuk berinteraksi dengan Docker

## Perintah Dasar Docker

### Manajemen Image

\`\`\`bash
# Cari image di Docker Hub
docker search nginx

# Pull image dari Docker Hub
docker pull nginx:latest

# List image yang didownload
docker images
# atau
docker image ls

# Hapus image
docker rmi nginx:latest

# Build image dari Dockerfile
docker build -t myapp:latest .
docker build -t myapp:v1.0 -f Dockerfile.prod .
\`\`\`

### Manajemen Container

\`\`\`bash
# Jalankan container baru
docker run -d -p 80:80 --name my-webserver nginx

# List container yang sedang berjalan
docker ps

# List semua container (termasuk yang berhenti)
docker ps -a

# Lihat log container
docker logs my-webserver

# Lihat log secara real-time
docker logs -f my-webserver

# Jalankan perintah di dalam container yang sedang berjalan
docker exec -it my-webserver /bin/bash

# Stop container yang sedang berjalan
docker stop my-webserver

# Start container yang berhenti
docker start my-webserver

# Restart container
docker restart my-webserver

# Hapus container
docker rm my-webserver

# Hapus paksa container yang sedang berjalan
docker rm -f my-webserver
\`\`\`

### Manajemen Volume (Persistensi Data)

\`\`\`bash
# Buat volume
docker volume create my-data

# List volume
docker volume ls

# Mount volume ke container
docker run -v my-data:/app/data myapp:latest

# Mount direktori lokal ke container
docker run -v $(pwd)/data:/app/data myapp:latest
\`\`\`

## Membuat Dockerfile Pertama Anda

Mari buat Dockerfile untuk aplikasi Node.js sederhana.

### Dockerfile Dasar

\`\`\`dockerfile
# Gunakan image Node.js resmi sebagai base
FROM node:18-alpine

# Set direktori kerja
WORKDIR /app

# Copy file package
COPY package*.json ./

# Install dependensi
RUN npm install

# Copy kode aplikasi
COPY . .

# Expose port
EXPOSE 3000

# Mulai aplikasi
CMD ["node", "index.js"]
\`\`\`

### Dockerfile Multi-Stage yang Dioptimalkan

Ini lebih baik untuk production karena mengurangi ukuran image:

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
\`\`\`

### Dockerfile untuk Next.js

\`\`\`dockerfile
# Base image
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
\`\`\`

## Docker Compose: Mengelola Aplikasi Multi-Container

Untuk aplikasi yang membutuhkan beberapa layanan (database, cache, dll.), Docker Compose adalah solusi sempurna. Ini memungkinkan Anda mendefinisikan dan menjalankan aplikasi multi-container dengan satu file YAML.

### docker-compose.yml Dasar

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

### Perintah Docker Compose

\`\`\`bash
# Mulai semua layanan
docker-compose up

# Mulai layanan di detached mode (background)
docker-compose up -d

# Stop semua layanan
docker-compose down

# Stop layanan dan hapus volume
docker-compose down -v

# Lihat log dari semua layanan
docker-compose logs

# Lihat log dari layanan tertentu
docker-compose logs app

# Rebuild dan restart layanan
docker-compose up --build

# Jalankan perintah di layanan
docker-compose exec app npm run migrations
\`\`\`

## Best Practices

1. **Gunakan Versi Spesifik**: Alih-alih \`FROM node:latest\`, gunakan \`FROM node:18.16.0\`
2. **Minimalkan Layer**: Gabungkan perintah RUN jika memungkinkan
3. **Gunakan .dockerignore**: Kecualikan file yang tidak perlu dari build context
4. **Jangan Jalankan sebagai Root**: Buat user non-root di container Anda
5. **Gunakan Image Alpine**: Untuk ukuran image lebih kecil jika kompatibel
6. **Scan Vulnerability**: Gunakan \`docker scan\` untuk memeriksa masalah keamanan

### Contoh .dockerignore

\`\`\`text
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.env.local
\`\`\`

## Debugging Masalah Umum

### Container Tidak Mau Start

Periksa log:
\`\`\`bash
docker logs <container-id>
\`\`\`

### Port Sudah Digunakan

Temukan dan stop container yang konflik:
\`\`\`bash
docker ps
docker stop <container-id>
\`\`\`

### Kehabisan Ruang

Bersihkan resource yang tidak digunakan:
\`\`\`bash
# Hapus semua container yang berhenti
docker container prune

# Hapus semua image yang tidak digunakan
docker image prune -a

# Hapus semua volume yang tidak digunakan
docker volume prune

# Hapus semua yang tidak terkait dengan container yang berjalan
docker system prune -a
\`\`\`

## Contoh Nyata: Aplikasi Full Stack

Berikut docker-compose.yml lengkap untuk stack Next.js + PostgreSQL + Redis:

\`\`\`yaml
version: '3.8'

services:
  nextjs:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://postgres:password@postgres:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped

volumes:
  postgres_data:
\`\`\`

## Langkah Selanjutnya

Sekarang setelah Anda memahami dasar-dasarnya, pertimbangkan untuk mengeksplorasi:

1. **Docker Networks**: Pelajari cara berkomunikasi antar container
2. **Docker Swarm**: Orkestrasi sederhana untuk multiple host
3. **Kubernetes**: Orkestrasi lanjutan untuk aplikasi berskala besar
4. **Integrasi CI/CD**: Integrasikan Docker ke pipeline deployment Anda
5. **Docker Registry**: Host registry privat Anda sendiri

## Kesimpulan

Docker telah menjadi alat penting dalam pengembangan software modern. Ini menyederhanakan alur kerja development, memastikan konsistensi di berbagai lingkungan, dan memungkinkan deployment yang skalabel. Mulai dengan container sederhana untuk lingkungan development Anda, lalu pelan-pelan eksplorasi fitur lanjutan seperti multi-stage builds, Docker Compose untuk aplikasi kompleks, dan alat orkestrasi seperti Kubernetes untuk workload production.

Kurva belajarnya sedang, tetapi manfaatnya dalam hal produktivitas, kolaborasi, dan keandalan deployment membuatnya sangat worth untuk diinvestasikan. Selamat containerizing!
`;

const contentReactEn = `
# React for Beginners: Complete Introduction

React has become one of the most popular JavaScript libraries for building user interfaces. Developed by Facebook, it powers millions of websites including Instagram, Netflix, and Airbnb. In this comprehensive guide, we'll take you from zero to understanding the fundamentals of React.

## What is React?

React is an open-source JavaScript library for building user interfaces, particularly single-page applications (SPAs). Unlike traditional JavaScript frameworks that provide a complete solution, React focuses on the **view layer**—the part of your application that users see and interact with.

### Key Characteristics

- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Design simple views for each state, and React will efficiently update and render
- **Learn Once, Write Anywhere**: Use React for web, mobile with React Native, or desktop
- **Virtual DOM**: Provides better performance by minimizing direct DOM manipulation

## Understanding the Virtual DOM

The Virtual DOM is React's secret weapon for performance. Here's how it works:

1. React creates a lightweight copy of the actual DOM in memory
2. When state changes, React updates the Virtual DOM first
3. React compares the new Virtual DOM with the previous one
4. React calculates the minimal set of changes needed
5. React updates only those specific parts of the actual DOM

This process is called **Reconciliation**, and it makes React applications incredibly fast even with complex interfaces.

## Setting Up Your React Environment

### Option 1: Create React App (Recommended for Beginners)

\`\`\`bash
# Create a new React app
npx create-react-app my-first-react-app

# Navigate to the project directory
cd my-first-react-app

# Start the development server
npm start
\`\`\`

### Option 2: Vite (Faster & Modern)

\`\`\`bash
# Create a React app with Vite
npm create vite@latest my-react-app -- --template react

cd my-react-app
npm install
npm run dev
\`\`\`

### Option 3: Try React Online

If you want to experiment without installing anything, use:
- [CodeSandbox](https://codesandbox.io/)
- [StackBlitz](https://stackblitz.com/)

## React Components: The Building Blocks

Components are the heart of React. They're reusable, self-contained pieces of UI.

### Functional Components

\`\`\`jsx
// Greeting.js
import React from 'react';

function Greeting() {
  return <h1>Hello, World!</h1>;
}

export default Greeting;
\`\`\`

You can also use arrow function syntax:

\`\`\`jsx
const Greeting = () => {
  return <h1>Hello, World!</h1>;
};
\`\`\`

### Component with JSX

JSX is a syntax extension that lets you write HTML-like code in JavaScript:

\`\`\`jsx
function Welcome() {
  return (
    <div className=\"container\">
      <h1>Welcome to React</h1>
      <p>Let's build something amazing!</p>
      <button>Get Started</button>
    </div>
  );
}
\`\`\`

**Important JSX Rules:**
- Always return a single parent element
- Use \`className\` instead of \`class\`
- Use \`camelCase\` for attributes (e.g., \`onClick\`, \`htmlFor\`)
- Self-closing tags must have a slash: \`<img />\`, \`<input />\`

## Props: Passing Data to Components

Props (short for \"properties\") let you pass data from parent to child components.

\`\`\`jsx
// Child Component
function UserCard({ name, age, email }) {
  return (
    <div className=\"user-card\">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// Parent Component
function App() {
  return (
    <div>
      <UserCard name=\"John Doe\" age={25} email=\"john@example.com\" />
      <UserCard name=\"Jane Smith\" age={30} email=\"jane@example.com\" />
    </div>
  );
}
\`\`\`

### Default Props

\`\`\`jsx
function Button({ text = \"Click Me\" }) {
  return <button>{text}</button>;
}
\`\`\`

## State: Managing Component Data

State is data that can change within a component. When state changes, React re-renders the component.

### Using useState Hook

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
\`\`\`

### State with Objects

\`\`\`jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    age: 25,
    email: 'john@example.com'
  });

  const updateAge = () => {
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <button onClick={updateAge}>Increase Age</button>
    </div>
  );
}
\`\`\`

**Important:** Always use the spread operator \`...\` or functional updates to maintain previous state:

\`\`\`jsx
// Correct: Functional update
setCount(prevCount => prevCount + 1);

// Correct: Spread operator
setUser(prevUser => ({ ...prevUser, name: 'Jane' }));

// Incorrect: Direct mutation
user.name = 'Jane'; // Don't do this!
\`\`\`

## Essential React Hooks

Hooks are functions that let you \"hook into\" React state and lifecycle features from function components.

### useEffect: Handling Side Effects

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    fetch(\`/api/users/\${userId}\`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Dependency array

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

### Cleanup Function

\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(timer);
  };
}, []);
\`\`\`

### useContext: Managing Global State

\`\`\`jsx
// Create context
const ThemeContext = React.createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function ThemedButton() {
  const { theme } = useContext(ThemeContext);
  return <button className={theme}>Click Me</button>;
}
\`\`\`

## Handling Events in React

\`\`\`jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type=\"text\"
        name=\"name\"
        value={formData.name}
        onChange={handleChange}
        placeholder=\"Name\"
      />
      <input
        type=\"email\"
        name=\"email\"
        value={formData.email}
        onChange={handleChange}
        placeholder=\"Email\"
      />
      <button type=\"submit\">Submit</button>
    </form>
  );
}
\`\`\`

## Conditional Rendering

\`\`\`jsx
function Welcome({ user }) {
  // Using ternary operator
  return (
    <div>
      {user ? (
        <h2>Welcome back, {user.name}!</h2>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
}

// Using logical AND operator
function UserStatus({ isOnline }) {
  return (
    <div>
      <h2>John Doe</h2>
      {isOnline && <span className=\"online\">Online</span>}
    </div>
  );
}

// Using variables
function UserGreeting({ user }) {
  let message;

  if (user.isNew) {
    message = <h2>Welcome to our platform!</h2>;
  } else {
    message = <h2>Welcome back, {user.name}!</h2>;
  }

  return <div>{message}</div>;
}
\`\`\`

## Rendering Lists

\`\`\`jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          {todo.completed && ' ✅'}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

**Important:** Always provide a unique \`key\` prop when rendering lists.

## Styling in React

### Inline Styles

\`\`\`jsx
function StyledComponent() {
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f0f0'
    },
    heading: {
      color: '#333',
      fontSize: '24px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Styled with Inline CSS</h2>
    </div>
  );
}
\`\`\`

### CSS Modules

\`\`\`jsx
// styles.module.css
.container {
  padding: 20px;
  background-color: #f0f0f0;
}

.heading {
  color: #333;
  font-size: 24px;
}

// Component.js
import styles from './styles.module.css';

function Component() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Styled with CSS Modules</h2>
    </div>
  );
}
\`\`\`

### Tailwind CSS (Recommended)

\`\`\`jsx
function Component() {
  return (
    <div className=\"p-5 bg-gray-100\">
      <h2 className=\"text-gray-800 text-2xl\">Styled with Tailwind</h2>
    </div>
  );
}
\`\`\`

## Common Beginner Mistakes

1. **Mutating State Directly**: Never modify state directly. Always use \`setState\`.
2. **Forgetting Keys in Lists**: Always provide unique keys when rendering lists.
3. **Using \`class\` Instead of \`className\`**: Remember to use \`className\` in JSX.
4. **Ignoring Dependency Array**: Always include dependencies in \`useEffect\`.
5. **Not Handling Loading States**: Always provide loading states for async operations.

## Best Practices

- **Keep Components Small**: Each component should have a single responsibility
- **Use Functional Components**: They're simpler and work with hooks
- **Organize Your Code**: Group related files in folders
- **Use PropTypes or TypeScript**: Validate your props
- **Write Clean Code**: Follow consistent naming conventions

## Next Steps

Now that you understand the basics, explore:
- **React Router**: For navigation between pages
- **React Query**: For data fetching and caching
- **Form Libraries**: Like Formik or React Hook Form
- **State Management**: Redux, Zustand, or Jotai
- **Testing**: Jest and React Testing Library

## Conclusion

React provides a powerful and flexible way to build user interfaces. Its component-based architecture, virtual DOM, and extensive ecosystem make it an excellent choice for modern web development. Start with small projects, practice regularly, and gradually explore more advanced features. Remember, every React expert was once a beginner!

Happy coding! 🚀
`;

const contentReactId = `
# React untuk Pemula: Pengenalan Lengkap

React telah menjadi salah satu library JavaScript paling populer untuk membangun antarmuka pengguna. Dikembangkan oleh Facebook, React menggerakkan jutaan website termasuk Instagram, Netflix, dan Airbnb. Dalam panduan komprehensif ini, kita akan membimbing Anda dari nol hingga memahami dasar-dasar React.

## Apa itu React?

React adalah library JavaScript open-source untuk membangun antarmuka pengguna, khususnya aplikasi satu halaman (Single Page Applications atau SPAs). Berbeda dengan framework JavaScript tradisional yang memberikan solusi lengkap, React berfokus pada **view layer**—bagian dari aplikasi Anda yang dilihat dan diinteraksikan oleh pengguna.

### Karakteristik Utama

- **Component-Based**: Bangun komponen yang terenkapsulasi yang mengelola state-nya sendiri
- **Declarative**: Desain tampilan sederhana untuk setiap state, dan React akan efisien mengupdate dan merender
- **Learn Once, Write Anywhere**: Gunakan React untuk web, mobile dengan React Native, atau desktop
- **Virtual DOM**: Memberikan performa lebih baik dengan meminimalkan manipulasi DOM langsung

## Memahami Virtual DOM

Virtual DOM adalah senjata rahasia React untuk performa. Berikut cara kerjanya:

1. React membuat copy ringan dari DOM sebenarnya di memori
2. Saat state berubah, React mengupdate Virtual DOM terlebih dahulu
3. React membandingkan Virtual DOM baru dengan yang sebelumnya
4. React menghitung perubahan minimal yang dibutuhkan
5. React hanya mengupdate bagian spesifik dari DOM sebenarnya

Proses ini disebut **Reconciliation**, dan ini membuat aplikasi React sangat cepat bahkan dengan interface yang kompleks.

## Menyiapkan Lingkungan React Anda

### Opsi 1: Create React App (Direkomendasikan untuk Pemula)

\`\`\`bash
# Buat aplikasi React baru
npx create-react-app my-first-react-app

# Navigasi ke direktori project
cd my-first-react-app

# Mulai development server
npm start
\`\`\`

### Opsi 2: Vite (Lebih Cepat & Modern)

\`\`\`bash
# Buat aplikasi React dengan Vite
npm create vite@latest my-react-app -- --template react

cd my-react-app
npm install
npm run dev
\`\`\`

### Opsi 3: Coba React Online

Jika Anda ingin eksperimen tanpa menginstall apa pun, gunakan:
- [CodeSandbox](https://codesandbox.io/)
- [StackBlitz](https://stackblitz.com/)

## Komponen React: Blok Bangunan

Komponen adalah jantung dari React. Mereka adalah bagian UI yang dapat digunakan kembali dan mandiri.

### Functional Components

\`\`\`jsx
// Greeting.js
import React from 'react';

function Greeting() {
  return <h1>Hello, World!</h1>;
}

export default Greeting;
\`\`\`

Anda juga bisa menggunakan sintaks arrow function:

\`\`\`jsx
const Greeting = () => {
  return <h1>Hello, World!</h1>;
};
\`\`\`

### Komponen dengan JSX

JSX adalah ekstensi sintaks yang memungkinkan Anda menulis kode seperti HTML dalam JavaScript:

\`\`\`jsx
function Welcome() {
  return (
    <div className=\"container\">
      <h1>Welcome to React</h1>
      <p>Let's build something amazing!</p>
      <button>Get Started</button>
    </div>
  );
}
\`\`\`

**Aturan Penting JSX:**
- Selalu kembalikan satu parent element
- Gunakan \`className\` bukan \`class\`
- Gunakan \`camelCase\` untuk atribut (misalnya, \`onClick\`, \`htmlFor\`)
- Tag self-closing harus memiliki slash: \`<img />\`, \`<input />\`

## Props: Mengirim Data ke Komponen

Props (singkatan dari \"properties\") memungkinkan Anda mengirim data dari parent ke child component.

\`\`\`jsx
// Child Component
function UserCard({ name, age, email }) {
  return (
    <div className=\"user-card\">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// Parent Component
function App() {
  return (
    <div>
      <UserCard name=\"John Doe\" age={25} email=\"john@example.com\" />
      <UserCard name=\"Jane Smith\" age={30} email=\"jane@example.com\" />
    </div>
  );
}
\`\`\`

### Default Props

\`\`\`jsx
function Button({ text = \"Click Me\" }) {
  return <button>{text}</button>;
}
\`\`\`

## State: Mengelola Data Komponen

State adalah data yang bisa berubah dalam komponen. Saat state berubah, React akan me-render ulang komponen tersebut.

### Menggunakan useState Hook

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
\`\`\`

### State dengan Objects

\`\`\`jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    age: 25,
    email: 'john@example.com'
  });

  const updateAge = () => {
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <button onClick={updateAge}>Increase Age</button>
    </div>
  );
}
\`\`\`

**Penting:** Selalu gunakan spread operator \`...\` atau functional updates untuk mempertahankan state sebelumnya:

\`\`\`jsx
// Benar: Functional update
setCount(prevCount => prevCount + 1);

// Benar: Spread operator
setUser(prevUser => ({ ...prevUser, name: 'Jane' }));

// Salah: Direct mutation
user.name = 'Jane'; // Jangan lakukan ini!
\`\`\`

## React Hooks yang Penting

Hooks adalah fungsi yang memungkinkan Anda \"menghubungkan\" ke React state dan fitur lifecycle dari function components.

### useEffect: Menangani Side Effects

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    fetch(\`/api/users/\${userId}\`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Dependency array

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

### Cleanup Function

\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(timer);
  };
}, []);
\`\`\`

### useContext: Mengelola State Global

\`\`\`jsx
// Create context
const ThemeContext = React.createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function ThemedButton() {
  const { theme } = useContext(ThemeContext);
  return <button className={theme}>Click Me</button>;
}
\`\`\`

## Menangani Event di React

\`\`\`jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type=\"text\"
        name=\"name\"
        value={formData.name}
        onChange={handleChange}
        placeholder=\"Name\"
      />
      <input
        type=\"email\"
        name=\"email\"
        value={formData.email}
        onChange={handleChange}
        placeholder=\"Email\"
      />
      <button type=\"submit\">Submit</button>
    </form>
  );
}
\`\`\`

## Conditional Rendering

\`\`\`jsx
function Welcome({ user }) {
  // Menggunakan ternary operator
  return (
    <div>
      {user ? (
        <h2>Welcome back, {user.name}!</h2>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
}

// Menggunakan logical AND operator
function UserStatus({ isOnline }) {
  return (
    <div>
      <h2>John Doe</h2>
      {isOnline && <span className=\"online\">Online</span>}
    </div>
  );
}

// Menggunakan variabel
function UserGreeting({ user }) {
  let message;

  if (user.isNew) {
    message = <h2>Welcome to our platform!</h2>;
  } else {
    message = <h2>Welcome back, {user.name}!</h2>;
  }

  return <div>{message}</div>;
}
\`\`\`

## Rendering Lists

\`\`\`jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          {todo.completed && ' ✅'}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

**Penting:** Selalu berikan prop \`key\` yang unik saat rendering lists.

## Styling di React

### Inline Styles

\`\`\`jsx
function StyledComponent() {
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f0f0'
    },
    heading: {
      color: '#333',
      fontSize: '24px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Styled with Inline CSS</h2>
    </div>
  );
}
\`\`\`

### CSS Modules

\`\`\`jsx
// styles.module.css
.container {
  padding: 20px;
  background-color: #f0f0f0;
}

.heading {
  color: #333;
  font-size: 24px;
}

// Component.js
import styles from './styles.module.css';

function Component() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Styled with CSS Modules</h2>
    </div>
  );
}
\`\`\`

### Tailwind CSS (Direkomendasikan)

\`\`\`jsx
function Component() {
  return (
    <div className=\"p-5 bg-gray-100\">
      <h2 className=\"text-gray-800 text-2xl\">Styled with Tailwind</h2>
    </div>
  );
}
\`\`\`

## Kesalahan Umum Pemula

1. **Mutating State Langsung**: Jangan pernah mengubah state langsung. Selalu gunakan \`setState\`.
2. **Lupa Keys di Lists**: Selalu berikan keys unik saat rendering lists.
3. **Menggunakan \`class\` Bukan \`className\`**: Ingat untuk menggunakan \`className\` di JSX.
4. **Mengabaikan Dependency Array**: Selalu sertakan dependencies di \`useEffect\`.
5. **Tidak Menangani Loading States**: Selalu berikan loading states untuk operasi async.

## Best Practices

- **Pertahankan Komponen Kecil**: Setiap komponen harus memiliki satu tanggung jawab
- **Gunakan Functional Components**: Lebih sederhana dan bekerja dengan hooks
- **Organisasi Kode**: Kelompokkan file terkait dalam folder
- **Gunakan PropTypes atau TypeScript**: Validasi props Anda
- **Tulis Kode Bersih**: Ikuti konvensi penamaan yang konsisten

## Langkah Selanjutnya

Sekarang setelah Anda memahami dasar-dasarnya, eksplorasi:
- **React Router**: Untuk navigasi antar halaman
- **React Query**: Untuk data fetching dan caching
- **Form Libraries**: Seperti Formik atau React Hook Form
- **State Management**: Redux, Zustand, atau Jotai
- **Testing**: Jest dan React Testing Library

## Kesimpulan

React menyediakan cara yang powerful dan fleksibel untuk membangun antarmuka pengguna. Arsitektur berbasis komponen, virtual DOM, dan ekosistem yang luas membuatnya pilihan yang sangat baik untuk pengembangan web modern. Mulai dengan proyek kecil, berlatih secara teratur, dan pelan-pelan eksplorasi fitur yang lebih lanjutan. Ingat, setiap ahli React dulunya adalah pemula!

Selamat coding! 🚀
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
    },
    {
        slug: 'beginners-guide-to-docker-containerization',
        title: {
            en: 'Docker for Beginners: Complete Guide',
            id: 'Docker untuk Pemula: Panduan Lengkap'
        },
        excerpt: {
            en: 'Learn Docker from scratch! Understand containers, images, and Docker Compose with practical examples for web developers.',
            id: 'Pelajari Docker dari awal! Pahami container, image, dan Docker Compose dengan contoh praktis untuk web developer.'
        },
        coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&h=1080&fit=crop',
        isPublished: true,
        content: {
            en: contentDockerEn,
            id: contentDockerId
        }
    },
    {
        slug: 'introduction-to-react-for-beginners',
        title: {
            en: 'React for Beginners: Complete Introduction',
            id: 'React untuk Pemula: Pengenalan Lengkap'
        },
        excerpt: {
            en: 'Learn React from scratch! Understand components, state, props, and hooks with practical examples. Perfect for beginners starting modern web development.',
            id: 'Pelajari React dari awal! Pahami components, state, props, dan hooks dengan contoh praktis. Sempurna untuk pemula yang memulai pengembangan web modern.'
        },
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1920&h=1080&fit=crop',
        isPublished: true,
        content: {
            en: contentReactEn,
            id: contentReactId
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
