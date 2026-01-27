# Sedia Boiler Template Prompting Guide

Panduan ini berisi prompt untuk meminta ChatGPT/Claude membuat **Full Page Templates** (Landing Page, Dashboard, dll) agar kompatibel dengan sistem Sedia Boiler.

Semua prompt di bawah ini **READY TO USE**. Tinggal copy-paste.

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

## Ready-to-Use Copy-Paste Prompt Templates

### 1. Landing Page Template
**Theme: Modern SaaS (Stripe-inspired)**

```markdown
I need you to build a complete, production-ready Landing Page Template Kit compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Single File**: Write the entire code in one `.tsx` file.
2. **Libraries**: Use ONLY `react` (hooks) and `lucide-react` (icons).
3. **Styling**: Tailwind CSS for everything.

**Design Requirements:**
- **Theme**: "Modern SaaS" - Clean white background, rich purple/indigo accents (`text-indigo-600`), subtle gradients, and glassmorphism cards.
- **Sections Required**:
  1. **Navbar**: Sticky top, Logo left, Links center, "Get Started" button right. Mobile hamburger menu.
  2. **Hero Section**: Large H1 ("Manage your business with ease"), Subtext, Dual CTA buttons, floating 3D-style mockups (CSS only).
  3. **Logo Cloud**: "Trusted by" section with gray company logos (use text or placeholders).
  4. **Features Grid**: 3-column grid with icon boxes. Hover effect: slight lift and shadow.
  5. **Pricing Cards**: Toggle Monthly/Yearly. 3 tiers (Starter, Growth, Enterprise). Highlight "Growth".
  6. **FAQ Accordion**: Smooth expand/collapse logic using state.
  7. **Footer**: 4 columns (Product, Company, Resources, Legal) + Newsletter signup.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 2. Admin Dashboard Template
**Theme: Clean Corporate (Sidebar Layout)**

```markdown
I need you to build a modern, interactive Admin Dashboard Template compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Single File**: Write the entire code in one `.tsx` file (including sidebar, header, and page content).
2. **Libraries**: Use ONLY `react` (hooks) and `lucide-react` (icons).
3. **Charts**: Simulate charts using colored `div` bars (flex/grid) to avoid external libraries.

**Design Requirements:**
- **Layout**: Fixed Left Sidebar (Dark Blue `bg-slate-900`), Fixed Top Header (White), Scrollable Main Content (Gray `bg-slate-50`).
- **Sidebar**: Logo top, Navigation links (Dashboard, Analytics, Users, Settings) with active state logic.
- **Dashboard Content**:
  1. **Stats Cards**: 4 cards (Revenue, Users, Bounce Rate, Sales) with trend indicators (Green Arrow Up +5%).
  2. **Chart Area**: A "Revenue Overview" card using animated CSS bars.
  3. **Recent Table**: A responsive table showing "Latest Orders" with Status Pills (Paid/Pending).
- **Interactivity**: Mobile sidebar toggle button.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 3. Waitlist / Coming Soon Page
**Theme: Dark Cyberpunk / Future Tech**

```markdown
I need you to build a high-converting Waitlist / Coming Soon Page compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Single File**: All code in one `.tsx` file.
2. **Libraries**: `react`, `lucide-react` only.

**Design Requirements:**
- **Theme**: "Future Tech" - Dark background (`bg-black`), neon green/cyan accents, grid background pattern.
- **Key Elements**:
  1. **Hero**: Central layout. Headline " The Future of Work is Here".
  2. **Countdown**: A simulated countdown timer (Days : Hours : Mins : Secs) ticking down.
  3. **Email Capture**: Large input field + "Join Beta" button. Show a "Success!" message after clicking.
  4. **Social Proof**: "Join 2,000+ engineers waiting" with avatar stack.
  5. **Footer**: Social media links.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 4. Auth Pages (Login/Register)
**Theme: Split Screen Minimalist**

```markdown
I need you to build a beautiful Authentication Page (Login/Register) compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Single File**: All code in one `.tsx` file.
2. **Libraries**: `react`, `lucide-react` only.

**Design Requirements:**
- **Layout**: Split screen.
  - **Left (50%)**: High-quality Unsplash image `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop` (Abstract/Architecture) with a testimonial overlay.
  - **Right (50%)**: Clean, centered form.
- **Functionality**:
  - Switch between "Sign In" and "Sign Up" modes using a state toggle.
  - "Show Password" eye icon toggle.
- **Form**:
  - Email, Password inputs with floating labels or clean borders.
  - "Continue with Google" button (Outlined).

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 5. User Settings / Profile Page
**Theme: Card-based Settings**

```markdown
I need you to build a comprehensive User Settings / Profile Page compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Single File**: All code in one `.tsx` file.
2. **Libraries**: `react`, `lucide-react` only.

**Design Requirements:**
- **Layout**: Sidebar Navigation (Vertical tabs) on the left, Content Area on the right.
- **Theme**: Clean Light Mode.
- **Tabs Logic**: "General", "Security", "Billing", "Notifications".
- **Tab Content**:
  1. **General**: Profile Photo upload (visual only), Display Name input, Bio textarea.
  2. **Security**: Change Password (Old/New), Two-Factor Toggle switch.
  3. **Billing**: Current Plan (Pro), "Cancel Subscription" danger button.
  4. **Notifications**: List of switches (Email Digest, Product Updates).

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 6. Pricing & Plans Page
**Theme: Colorful & Playful**

```markdown
I need you to build a high-converting Pricing & Plans Page compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Single File**: All code in one `.tsx` file.
2. **Libraries**: `react`, `lucide-react` only.

**Design Requirements:**
- **Theme**: Playful & Friendly. Rounded cards, soft shadows, vibrant blobs in background.
- **Key Elements**:
  1. **Header**: Toggle Switch "Monthly" vs "Yearly" (Save 20%). Toggling updates prices.
  2. **Cards**: 
     - **Free**: Gray button.
     - **Pro**: Scaled up 1.05x, colored border, "Most Popular" badge, solid primary button.
     - **Enterprise**: Outline button.
  3. **Feature Comparison**: A table below showing Detailed specs (Unlimited users, API Access, etc) with Check/Close icons.
  4. **FAQ**: 4 common questions below.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 7. Blog Listing & Post Page
**Theme: Editorial / Magazine**

```markdown
I need you to build a stylish Blog Listing & Single Post Layout compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Single File**: All code in one `.tsx` file.
2. **Libraries**: `react`, `lucide-react` only.

**Design Requirements:**
- **Theme**: Minimalist Editorial. Serif fonts for headings (if available), lots of whitespace.
- **Navigation Logic**: State `view` ('list' | 'post'). Clicking a post sets view to 'post'.
- **Views**:
  1. **Listing View**:
     - Featured Article: Large image left, text right (`grid-cols-2`).
     - Recent Articles: Grid of 3 cards.
     - "Subscribe" Newsletter box.
  2. **Single Post View**:
     - "← Back to Articles" button.
     - Title, Author, Date, Read Time.
     - Large Cover Image.
     - Text content (simulate paragraphs using `<p className="mb-4">`).

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 8. Kanban Board / Task Management
**Theme: Trello-like**

```markdown
I need a fully functional Kanban Board component using React and Tailwind CSS.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react` only.

**Design Requirements:**
- **Layout**: Horizontal scrolling container with columns (To Do, In Progress, Review, Done).
- **Card**: White card, shadow-sm, rounded. Contains Tags (colored pills), Title, and Member avatars.
- **Interactivity**: 
  - "Add Card" button at bottom of each column adds a dummy card.
  - Simple Drag Simulation: Allow clicking a card to "move next" (simple state logic) or just visual drag handles.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 9. Chat Interface / Messenger
**Theme: WhatsApp Web / Telegram**

```markdown
Build a responsive Chat Interface.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Layout**: 
  - **Sidebar (30%)**: Search bar, User List (Avatar, Name, Last msg, Time). Active state stying.
  - **Chat Area (70%)**: Header (Active User), Message List, Input Bar.
- **Messages**: 
  - Incoming (Left, White bg).
  - Outgoing (Right, Green/Blue bg).
- **Features**: Auto-scroll to bottom. "Send" button adds message to list.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 10. E-commerce Product Detail
**Theme: Luxury Shop**

```markdown
Build a high-end E-commerce Product Detail Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Layout**: 2 Columns (Image Gallery Left, Details Right).
- **Gallery**: Main large image + row of thumbnails. Clicking thumbnail updates main image.
- **Details**:
  - Title: Serif font, large.
  - Price: "$129.00".
  - Rating: 5 Stars.
  - **Color Selector**: Circle buttons.
  - **Size Selector**: Box buttons (S, M, L, XL).
  - **Actions**: "Add to Cart" (Black, full width), "Wishlist" (Heart icon).

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 11. Checkout / Payment Page
**Theme: Clean Stripe**

```markdown
Build a clean, trustworthy Checkout Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Layout**: split screen (Left: Form, Right: Summary sticky).
- **Steps**: Breadcrumb "Cart > Shipping > Payment".
- **Form**:
  - Contact Info (Email).
  - Shipping Address.
  - **Payment**: Credit Card visualizer (Front/Back) or clean input fields with Card Icons.
- **Summary**: Product List, Subtotal, Shipping ($0), Total.
- **Trust**: "Encrypted and Secure" badge.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 12. 404 Not Found Page
**Theme: Creative & Fun**

```markdown
Build a creative 404 Not Found Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Visual**: Large "404" text using a massive font size (text-9xl) or SVG shapes.
- **Content**: "Oops! You found a dead link."
- **Interactive**: A mini-game or "Search" bar.
- **Action**: "Back to Home" button (Primary color).

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 13. System Status / Under Maintenance
**Theme: Engineering / Developer**

```markdown
Build a System Status / Maintenance Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Header**: "All Systems Operational" (Green dot) or "Maintenance in Progress" (Orange).
- **Services**: clear grid showing status of API, CDN, Database, Web App.
- **History**: Vertical list of past incidents ("Resolved: Database Latency - 2 days ago").

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 14. User Onboarding Flow
**Theme: Step Wizard**

```markdown
Build a multi-step User Onboarding Wizard.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Container**: Centered Card (max-w-2xl).
- **Progress**: Top progress bar (33% -> 66% -> 100%).
- **Steps Logic**:
  1. **Account**: Username/Photo.
  2. **Role**: "What describes you?" grid selection (Developer, Designer, Manager).
  3. **Invite**: Input fields for team emails.
- **Navigation**: "Back" (Secondary) and "Continue" (Primary) buttons.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 15. Documentation / Help Center
**Theme: Clean Wiki**

```markdown
Build a Knowledge Base / Documentation layout.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Header**: Big Search bar "How can we help?".
- **Layout**: 3-col (Sidebar Nav, Main Content, Table of Contents).
- **Content**:
  - Breadcrumbs.
  - H1 Title.
  - Simulated Code Blocks (`bg-slate-100 p-4 rounded font-mono`).
  - "Was this helpful?" feedback buttons.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 16. Job Board / Career Page
**Theme: Friendly & Human**

```markdown
Build a Job Board / Careers Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Hero**: "Join our Mission" with photo of team/people.
- **Filters**: Dropdowns for Department (Eng, Design) and Location (Remote, NYC).
- **List**:
  - Card for each job.
  - Title (Bold), Tag (Remote), Salary Range ($120k-$150k).
  - "Apply Now" button -> Opens modal or link.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 17. Portfolio / Project Showcase
**Theme: Awwwards Dark**

```markdown
Build a Masonry-style Portfolio Gallery.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Theme**: Dark Mode.
- **Filters**: Tab pills (All, Branding, UI/UX).
- **Grid**: Masonry layout (simulated with CSS columns or grid-rows).
- **Item**: Image card. Hover reveals Title + "View Case Study" button overlay.
- **Modal**: Clicking an item opens a Lightbox overlay with full image.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 18. Invoice / Receipt Generator
**Theme: Professional Finance**

```markdown
Build a printable Invoice Template.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Paper Layout**: White A4-like container with shadow.
- **Header**: Logo, "INVOICE #001", Dates.
- **Grid**: From (Company) vs To (Client).
- **Table**: Item Description, Qty, Price, Amount. Zebra striping optional.
- **Footer**: Subtotal, Tax, Final Amount (Bold).
- **Actions**: Floating "Download PDF" or "Print" button outside the paper.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 19. Contact Us / Support Form
**Theme: Clean & Accessible**

```markdown
Build a comprehensive Contact Us Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Layout**: 2 Grid Columns.
  - **Left**: Contact Info (Email, Phone, Address cards). "Office Hours" listing. Map placeholder.
  - **Right**: Contact Form.
- **Form**:
  - Subject (Dropdown).
  - Message (Textarea).
  - Submit Button with loading state simulation.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 20. Team / About Us Section
**Theme: Storytelling**

```markdown
Build a "Meet the Team" / About Us Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Hero**: "We are [Company]". Text block about mission.
- **Values**: 3 Cards with Icons (Transparent, Fast, Kind).
- **Team Grid**:
  - Card: Photo (Rounded square), Name, Role.
  - Social Links: LinkedIn / Twitter icons below role.
- **Stats bar**: "10+ Years", "5M+ Users".

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 21. Podcast / Audio Player Page
**Theme: Audio & Media**

```markdown
Build a Podcast Landing & Player Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Hero**: Podcast Cover Art (Square), Title "The Tech Talk", Hose Name, "Listen Now" big button.
- **Player Bar**: Sticky Bottom. Play/Pause toggle, Progress bar (static or interactive range), Volume slider.
- **Episodes List**:
  - Row for each episode.
  - Play button icon, Episode Title, Duration (e.g., "45m"), Date.
  - Active playing state indication.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 22. Event / Conference Landing
**Theme: Vibrant Event**

```markdown
Build a Conference or Event Landing Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Theme**: Energetic (Orange/Purple).
- **Hero**: Date & Location (Big typography), "Get Tickets" CTA.
- **Speakers Grid**: Circular avatars, Names, Companies (Google, Meta, etc).
- **Schedule**: Timeline view. 9:00 AM (Keynote) -> 10:00 AM (Breakout).
- **Sponsors**: Logo cloud at bottom.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 23. Real Estate Property Listing
**Theme: Premium Housing**

```markdown
Build a Real Estate Property Listing Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Hero**: Full width Image of house. "For Sale" badge. Price: "$1,200,000".
- **Gallery Grid**: 4 smaller images below hero.
- **Features Bar**: Icons for Beds (4), Baths (3), Sqft (2,500).
- **Agent Card**: Sticky Right sidebar. Agent Photo, "Schedule Tour" form.
- **Description**: Text block with "Read more" toggle.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 24. Learning Management System (LMS) - Course View
**Theme: Educational**

```markdown
Build an LMS Course Viewer Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Layout**: Sidebar Left (Course Modules), Main Content Right (Video Player).
- **Sidebar**: Accordion for "Module 1", "Module 2". List of lessons. Checkmark for completed lessons.
- **Main**:
  - Video Placeholder (Black box with Play icon).
  - "Next Lesson" button.
  - Tabs below video: "Overview", "Q&A", "Resources".

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 25. Restaurant / Food Menu
**Theme: Elegant Dining**

```markdown
Build a Restaurant Menu / Landing Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Hero**: Dark moody food photography background. "Taste the Tradition".
- **Menu Sections**: Tabs for "Starters", "Mains", "Desserts".
- **Menu Item**:
  - Grid layout.
  - Title (Serif), Dotted line spacer, Price.
  - Description italicized below.
  - "Spicy" or "Vegan" icon badges.
- **Reservation**: Floating "Book a Table" button.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 26. Social Media Feed
**Theme: Social App**

```markdown
Build a Social Media Feed Layout.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Layout**: 3 Columns (Nav Left, Feed Center, Trends Right).
- **Feed**:
  - **Create Post**: Input box + Image/Video icons.
  - **Post Card**: Header (User), Content (Text + Image), Footer (Like, Comment, Share).
  - Like button toggles red/heart filled.
- **Trends**: List of hashtags "#TrendingNow".

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 27. Crypto / Stock Trading Dashboard
**Theme: Fintech Dark Mode**

```markdown
Build a Crypto/Stock Trading Interface.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Theme**: Dark Mode only. Green/Red text for numbers.
- **Header**: Portfolio Value "$45,231.00" (+2.4%).
- **Chart**: Large area in center (simulate candles with CSS or SVG lines).
- **Order Book**: Right sidebar list of colored numbers (Bids/Asks).
- **Trade Form**: Buy/Sell tabs, Amount input, "Place Order" button.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 28. Travel Booking / Search
**Theme: Travel & Adventure**

```markdown
Build a Travel Booking Search Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Hero**: Beach/Mountain image. "Find your next stay".
- **Search Bar**: Floating white box overlap hero. 
  - Location Input, Date Range Picker (simulated inputs), Guests.
  - Big "Search" Button.
- **Results**: Grid of Hotel Cards.
  - Image, Title, Stars, Price/night.
  - "Heart" toggle button on image.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 29. Newsletter Archive / Subplot
**Theme: Reading Experience**

```markdown
Build a Newsletter / Substack-style Page.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Header**: Minimal. "The Weekly Insight". Subscribe button.
- **Featured**: Top post with large cover image and summary.
- **List**:
  - Infinite scroll style list.
  - Date (small), Title (Bold serif), Excerpt.
  - "Read more" arrow link.
- **Footer**: Simple copyright and links.

**Output Format:**
Provide the full React code block starting with `'use client';`
```

### 30. File Manager / Drive Interface
**Theme: Cloud Storage**

```markdown
Build a File Manager / Cloud Storage Interface.

**Technical Constraints (Strict):**
1. **Single File**: `.tsx`.
2. **Libraries**: `react`, `lucide-react`.

**Design Requirements:**
- **Layout**: Sidebar (My Drive, Shared, Trash). Main Grid.
- **Header**: Search bar, Breadcrumbs (Home > Documents > Work).
- **Stats**: Storage used bar (Bottom sidebar).
- **Grid**:
  - Folder Icons (Yellow).
  - File Icons (Blue doc, Red PDF).
  - Right click context menu simulation (optional, or just 3-dot menu on card).

**Output Format:**
Provide the full React code block starting with `'use client';`
```

