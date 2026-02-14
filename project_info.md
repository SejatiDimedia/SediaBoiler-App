# Project Info: SapaUI

## Overview
SapaUI is a modern, high-performance web application built with Next.js 16. It features a robust tech stack focusing on developer experience, performance, and scalability. The project incorporates AI capabilities, internationalization, and a modern UI/UX design system.

## Tech Stack

### Core Framework
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Runtime**: Node.js

### Styling & UI
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & `tailwindcss-animate`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: `next-themes` (Dark/Light mode support)

### Backend & Database
- **Database**: PostgreSQL (via `postgres` driver)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Migrations**: Drizzle Kit

### Authentication & Security
- **Auth**: [NextAuth.js v5 (Beta)](https://authjs.dev/)
- **Adapter**: `@auth/drizzle-adapter`

### Features & Integrations
- **AI**: Google Generative AI (`@google/generative-ai`)
- **Internationalization**: `next-intl`
- **Code Editor**: CodeMirror (`@uiw/react-codemirror`)
- **Markdown**: `react-markdown`, `shiki` (Syntax Highlighting)
- **Utilities**: `date-fns`, `clsx`, `tailwind-merge`

## Project Structure

- `src/app`: App Router pages and layouts
- `src/components`: Reusable UI components
- `src/db`: Database schema and connection configuration
- `src/lib`: Utility functions and shared logic
- `src/i18n`: Internationalization configuration
- `public`: Static assets
- `messages`: Translation files

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate database migrations |
| `npm run db:push` | Push schema changes to the database |
| `npm run db:studio` | Open Drizzle Studio to view data |
| `npm run db:seed` | Seed the database with initial data |

## Key Features
- **Modern AI Integration**: Built-in support for Generative AI.
- **Global Reach**: Multi-language support via `next-intl`.
- **Secure Authentication**: Robust auth flow with NextAuth.
- **Type-Safe Database**: Full TypeScript support for database operations with Drizzle.
- **Responsive Design**: Mobile-first approach with Tailwind CSS.

## Pages & Features

### Main Pages
- **Home** (`/`): Landing page with Hero, Features, Testimonials, and FAQ sections.
- **Library** (`/library`): Collection of ready-to-use UI components.
- **Templates** (`/templates`): Pre-built page templates for faster development.
- **Documentation** (`/docs`): Comprehensive documentation for using SapaUI.
- **Blog** (`/blog`): Engineering insights, tutorials, and updates.
- **Admin Dashboard** (`/admin`): Administrative interface (protected).

### Key Product Features
- **Copy & Paste Architecture**: components are designed to be copied directly into projects, not installed as a dependency.
- **Bilingual Support**: Native support for English and Indonesian (Bahasa Indonesia) via `next-intl`.
- **Modern Aesthetics**: Features "Creative" and "Spotlight" UI patterns with glassmorphism, gradients, and noise textures.
- **Dark Mode First**: Optimized for dark mode with seamless light mode switching.
- **Developer Tools**:
    - **Interactive Code Editor**: Live code editing with `codemirror`.
    - **Syntax Highlighting**: Beautiful code blocks using `shiki`.
    - **CLI Integration**: Scripts for database management and setup.
