# SapaUI - Salin & Pasang UI 🚀

**SapaUI** adalah koleksi komponen UI modern dan boilerplate siap pakai yang dirancang untuk mempercepat alur kerja developer. Dibangun dengan ekosistem **Next.js** dan **Tailwind CSS**, SAPA hadir untuk memastikan Anda bisa merilis produk lebih cepat tanpa repot.

## 🚀 Vision
To build a comprehensive UI component library platform that offers ready-to-use code (copy-paste) and eventually functions as an automated full-stack boilerplate generator.

## ✨ Key Features
- **Component Catalog**: Visual grid system for browsing UI components.
- **Live Preview Engine**: Real-time rendering of components in the browser.
- **Interactive Playground**:
    - **Responsive Switcher**: Toggle between Mobile (320px), Tablet (768px), and Desktop views.
    - **Code View**: Syntax highlighting for JSX/TSX code using Shiki.
    - **Smart Copy**: One-click copy for component code.
- **Bilingual Support (i18n)**: Full support for **Indonesian** and **English**, toggleable via the interface.
- **Modern Tech Stack**: Built with the latest Next.js 15+ features and Tailwind CSS v4.

## 🛠️ Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Syntax Highlighting**: [Shiki](https://shiki.style/)

## 📂 Project Structure
```bash
├── src/
│   ├── app/           # Next.js App Router pages and layouts
│   ├── components/    # Reusable UI components & library viewer
│   ├── db/            # Drizzle schema, migrations, and seeders
│   ├── i18n/          # Internationalization configuration
│   ├── lib/           # Utility functions and shared logic
│   └── messages/      # JSON translation files (en.json, id.json)
├── public/            # Static assets
└── ...config files    # Next.js, Tailwind, Drizzle, etc.
```

## 🏁 Getting Started

### Prerequisites
- Node.js & npm/pnpm/yarn installed.
- A Supabase project set up.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd sapa-ui
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Copy `.env.example` to `.env.local` and fill in your credentials.
    ```bash
    cp .env.example .env.local
    ```
    Required variables:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `DATABASE_URL` (Connection string for Drizzle)

4.  **Database Setup**:
    Push the schema to your Supabase database.
    ```bash
    npm run db:push
    ```
    (Optional) Seed the database with initial data:
    ```bash
    npm run db:seed
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint.
- `npm run db:generate`: Generates Drizzle migrations.
- `npm run db:push`: Pushes schema changes to the database.
- `npm run db:studio`: Opens Drizzle Studio to manage data.

## 📄 MVP Scope
This version focuses on the **Minimum Viable Product (MVP)** which includes:
- Landing Page & Component Library Interface.
- Component Previewer (Visual & Code tabs).
- 15+ Basic Components (Navbar, Hero, Footer, etc.).
- Full Bilingual Support.

---
Built with ❤️ by SejatiDimedia
