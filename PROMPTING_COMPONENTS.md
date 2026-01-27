# Sedia Boiler Component Prompting Guide

Panduan khusus untuk meminta AI (ChatGPT/Claude) membuat **Atomic Components** (bukan full page) untuk Sedia Boiler System.

Semua prompt di bawah ini **READY TO USE**. Tinggal copy-paste.

## Core Rules `(Wajib)`

10 aturan emas untuk Micro-Component:

1. **Self-Contained**: Kode harus jalan mandiri. Jangan import `Button` atau `cn` dari luar jika tidak disediakan context-nya.
2. **Icons**: Gunakan `lucide-react`. Set sizes manual (`w-4 h-4`).
3. **Props Interface**: Wajib definisikan Interface Props yang jelas (e.g., `interface ButtonProps`).
4. **Variants**: Gunakan prop `variant` ('primary', 'secondary', etc) untuk fleksibilitas.
5. **Interactive**: Tambahkan state hover/active/focus menggunakan Tailwind classes (`hover:bg-blue-600`).
6. **Accessibility**: (Opsional tapi baik) Tambahkan `aria-label` atau role jika perlu.
7. **Responsive**: Component harus fluid (`w-full` atau `max-w-sm`) agar pas di container apa saja.
8. **No External Libraries**: Hindari `date-fns`, `framer-motion`, dll kecuali diminta. Gunakan native JS.
9. **Tailwind Only**: Styling 100% Tailwind.
10. **Export Default**: Export component utama sebagai default.

---

## Ready-to-Use Component Prompts

### 1. Modern Navbar (Responsive)
```markdown
I need you to build a Modern Responsive Navbar Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components (Button, Logo) inside the file. Do NOT import from `@/components/ui`.
2. **Libraries**: Use ONLY `react` (useState, useEffect) and `lucide-react` (icons).
3. **Styling**: Tailwind CSS only.

**Design Requirements:**
- **Visual Style**: Glassmorphism effect. Use `backdrop-blur-md`, `bg-white/70` (light mode) / `bg-black/70` (dark mode), and a subtle bottom border (`border-b border-white/10`).
- **Layout**:
  - **Desktop**: Logo (Left) - Navigation Links (Center) - Action Buttons (Right).
  - **Mobile**: Logo (Left) - Hamburger Icon (Right). Clicking the hamburger toggles a smooth slide-down menu containing the links.
- **Interactivity**:
  - Links should have a hover effect (e.g., subtle rounded background `hover:bg-black/5`).
  - "Get Started" button on the right should be prominent (solid color).

**Component Props Interface:**
Please define the props like this:
```typescript
interface NavbarProps {
  logoText?: string;
  links?: Array<{ label: string; href: string }>;
  onNavigate?: (href: string) => void;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Navbar(...)`.
```

### 2. Feature Section (Grid)
```markdown
I need you to build a reusable Feature Grid Section Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components (IconWrapper) inside the file.
2. **Libraries**: Use ONLY `react` and `lucide-react`.
3. **Styling**: Tailwind CSS only.

**Design Requirements:**
- **Layout**:
  - **Header**: Centered Title ("Why Choose Us") with a subtle gray subtitle.
  - **Grid**: 3 columns on Desktop, 1 column on Mobile (`grid-cols-1 md:grid-cols-3`).
- **Card Style**:
  - Clean white card with a subtle border (`border-slate-100`).
  - **Hover Effect**: When hovering a card, it should lift up slightly (`-translate-y-1`) and the shadow should increase (`shadow-lg`).
  - **Icon**: Place the icon in a rounded square container with a soft primary color background (e.g., `bg-blue-50 text-blue-600`).

**Component Props Interface:**
```typescript
interface FeatureItem {
  title: string;
  description: string;
  iconName: 'Zap' | 'Shield' | 'BarChart3'; // Limits the icon types for demo
}

interface FeatureSectionProps {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function FeatureSection(...)`.
```

### 3. Pricing Card (Single)
```markdown
I need you to build a reusable Pricing Card Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Visuals**: Clean, modern card look with a slight shadow.
- **Popular Variant**: If `isPopular` prop is true, add a colored border (e.g., indigo-500) and a "Most Popular" badge at the top right.
- **Content Flow**: 
  1. Plan Name (e.g., "Pro").
  2. Price (Large font, e.g., "$29").
  3. Period (small text, "/month").
  4. Divider line.
  5. List of features with Check icons (Green color).
  6. Full-width "Subscribe" button at the bottom.

**Component Props Interface:**
```typescript
interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function PricingCard(...)`.
```

### 4. Testimonial Card
```markdown
I need you to build a reusable Testimonial Card Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Simple, elegant card.
- **Elements**:
  - Quote Icon (Large, faint gray in background or top left).
  - Star Rating: 5 stars, filled yellow based on `rating` prop.
  - Review Text: Italic, serif font if possible for elegance.
  - Author Info: Bottom left. Avatar circle + Name (Bold) + Role (Gray text).

**Component Props Interface:**
```typescript
interface TestimonialProps {
  quote: string;
  authorName: string;
  authorRole: string;
  avatarUrl?: string; // Use a placeholder if not provided
  rating?: number; // 1-5
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function TestimonialCard(...)`.
```

### 5. Input Field with Label & Error
```markdown
I need you to build a reusable Form Input Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **States**:
  - **Normal**: Gray border (`border-slate-200`).
  - **Focus**: Ring focus (`ring-2 ring-blue-100 border-blue-500`).
  - **Error**: Red border (`border-red-500`) and red error text below input.
- **Icon Support**: If an `icon` prop is passed (e.g., 'Mail'), render it inside the input on the left side (padding-left adjusted automatically).

**Component Props Interface:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconName?: 'Mail' | 'Lock' | 'User'; 
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Input(...)`.
```

### 6. Modal / Dialog (Self-Managed)
```markdown
I need you to build a check reusable Modal/Dialog Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: No `radix-ui` or `headlessui`. Build logic from scratch using React Portal or fixed positioning (simplified).
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Overlay**: Full screen fixed black/50 backdrop with blur (`backdrop-blur-sm`).
- **Container**: Centered white card (`bg-white rounded-xl shadow-2xl`).
- **Animation**: Simple scale-in effect when opening.
- **Header**: Title + Close (X) button top right.
- **Footer**: Cancel/Confirm buttons.

**Component Props Interface:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode; // Optional custom footer buttons
}
```
*Note: Since previewer might not support portals easily, just use fixed positioning z-50.*

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Modal(...)`.
```

### 7. Footer (Multi-Column)
```markdown
I need you to build a comprehensive Footer Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: 
  - **Top**: 4 Columns.
    - Col 1: Brand Logo + Short tagline.
    - Col 2: "Product" links (Features, Pricing, etc).
    - Col 3: "Resources" links (Blog, Help, Status).
    - Col 4: Newsletter Subscribe Form (Input + Button inline).
  - **Bottom**: Divider line + Copyright text + Social Icons (Github, Twitter, LinkedIn).
- **Responsive**: Stack columns vertically on mobile.

**Component Props Interface:**
```typescript
interface LinkItem { label: string; href: string; }
interface FooterProps {
  brandName?: string;
  productLinks?: LinkItem[];
  resourceLinks?: LinkItem[];
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Footer(...)`.
```

### 8. Stats / Metrics Display
```markdown
I need you to build a Stats/Metrics Grid Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: CSS Grid. 2 columns on mobile, 4 columns on desktop.
- **Card Style**: Simple, transparent background or light gray border.
- **Content**:
  - Label (Small, uppercase, gray).
  - Value (Large, bold, dark).
  - Trend (Small pill: Green + ArrowUp if positive, Red + ArrowDown if negative).

**Component Props Interface:**
```typescript
interface StatItem {
  label: string;
  value: string;
  trend?: string; // e.g., "+12%"
  isPositive?: boolean;
}

interface StatsProps {
  items: StatItem[];
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function StatsGrid(...)`.
```

### 9. FAQ Accordion Item
```markdown
I need you to build a reusable FAQ Accordion Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: Build logic from scratch (no `Accordion` library).
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Vertical stack of items.
- **Interaction**: Clicking a question header toggles the answer visibility.
- **Visuals**:
  - Chevron Icon on the right that rotates 180deg when open.
  - Smooth height transition (if possible with CSS, otherwise just conditional render).
  - Border separation between items.

**Component Props Interface:**
```typescript
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
  allowMultiple?: boolean;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function FaqAccordion(...)`.
```

### 10. Call to Action (CTA) Banner
```markdown
I need you to build a high-impact Call to Action (CTA) Banner Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Background**: Use a rich dark gradient (e.g., `bg-gradient-to-r from-indigo-600 to-purple-600`).
- **Content**:
  - Headline: Large, white, bold text centered.
  - Subheader: White/80 opacity, readable max-width.
  - Buttons: Two buttons side-by-side (Primary White, Secondary Transparent/Outline).
- **Decorations**: Optional subtle SVG pattern overlay or glow effect.

**Component Props Interface:**
```typescript
interface CtaProps {
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function CtaBanner(...)`.
```

### 11. Tabs / TabNavigation
```markdown
I need you to build a reusable Tabs Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Horizontal list of tab headers.
- **State**: `activeTab` controls which content is shown.
- **Visuals**:
  - Active Tab: Bottom border (primary color) + Bold Text + Primary Color Text.
  - Inactive Tab: Gray text, no border.
  - Hover: Gray background or light text darkening.
- **Responsiveness**: Scrollable horizontal list on mobile if too many tabs.

**Component Props Interface:**
```typescript
interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Tabs(...)`.
```

### 12. Breadcrumbs
```markdown
I need you to build a reusable Breadcrumbs Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Horizontal list separated by icons (ChevronRight or Slash).
- **Visuals**: Small text (text-sm). Last item is bold/dark (active page), previous items are gray/clickable.
- **Icons**: Home icon for the first root item.

**Component Props Interface:**
```typescript
interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Breadcrumbs(...)`.
```

### 13. Badge / Chip Status
```markdown
I need you to build a reusable Badge/Chip Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Variants**:
  - Success: Green bg/text.
  - Warning: Yellow bg/text.
  - Error: Red bg/text.
  - Neural: Gray bg/text.
- **Visuals**: Rounded pill shape, small font (text-xs), medium font weight.
- **Optional**: Small dot indicator inside the badge.

**Component Props Interface:**
```typescript
type BadgeVariant = 'success' | 'warning' | 'error' | 'neutral' | 'primary';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  showDot?: boolean;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Badge(...)`.
```

### 14. Avatar Group stack
```markdown
I need you to build a reusable Avatar Group Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Horizontal overlapping circles.
- **Visuals**: Each avatar should have a white ring border to create separation.
- **Limit**: Show max N avatars (e.g., 4), then show a "+X" circle for the remainder.

**Component Props Interface:**
```typescript
interface AvatarGroupProps {
  images: string[]; // List of image URLs
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function AvatarGroup(...)`.
```

### 15. Toggle Switch
```markdown
I need you to build a reusable Toggle Switch Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Interaction**: Clicking toggles state (on/off).
- **Visuals**:
  - Track: Gray (off) -> Primary Color (on).
  - Thumb: White circle that slides left/right.
  - Animation: Smooth transition of background color and thumb position.
- **Accessibility**: Support `disabled` state.

**Component Props Interface:**
```typescript
interface ToggleProps {
  label?: string; // Optional label text next to switch
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function ToggleSwitch(...)`.
```

### 16. Slider (Range Input)
```markdown
I need you to build a reusable Range Slider Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS. Use `<input type="range">` with custom TW styling or custom div implementation.

**Design Requirements:**
- **Visuals**: Custom styled track and thumb.
  - Track: Gray background, filled portion in primary color.
  - Thumb: Circle handle, larger on hover.
- **Labels**: Show Min/Max values on sides, current value in tooltip or above handle.

**Component Props Interface:**
```typescript
interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
  step?: number;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Slider(...)`.
```

### 17. Progress Bar
```markdown
I need you to build a reusable Progress Bar Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Horizontal bar.
- **Visuals**:
  - Track: Light gray rounded container.
  - Fill: Primary color (blue/indigo) width % based on value.
  - Stripe/Animation: (Optional) subtle pulse or diagonal stripe pattern.
- **Label**: Show percentage text on the right or inside if bar is thick.

**Component Props Interface:**
```typescript
interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string; // e.g. "Uploading..."
  showPercentage?: boolean;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function ProgressBar(...)`.
```

### 18. Skeleton Loader
```markdown
I need you to build a reusable Skeleton Loader Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Visuals**: Light gray background (`bg-slate-200`) with a pulsing opacity animation (`animate-pulse`).
- **Variants**:
  - Text: Rectangle with set height (e.g., h-4).
  - Circle: For avatars (`rounded-full`).
  - Rect: For images/cards.

**Component Props Interface:**
```typescript
interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
  className?: string;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Skeleton(...)`.
```

### 19. Toast Notification
```markdown
I need you to build a reusable Toast Notification Component (Visual Demo) compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Fixed bottom-right or top-right container (simulated in preview).
- **Appearance**: White card, shadow-lg, border-l-4 (colored by type).
- **Content**: Icon, Title, Description, Close Button (X).
- **Types**: Success (Green), Error (Red), Info (Blue).
- **Animation**: Slide in from side.

**Component Props Interface:**
```typescript
interface ToastProps {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  onClose: () => void;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function ToastDemo(...)`.
```

### 20. Dropdown Menu
```markdown
I need you to build a reusable Dropdown Menu Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: Build logic from scratch (no `Radix`).
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Trigger**: A button that says "Options " + ChevronDown.
- **Menu**: Absolute positioned white card appearing below trigger.
- **Items**: List of clickable rows with hover gray background.
- **Divider**: Supporting separator lines between groups.
- **Interaction**: Click outside to close (use a `useEffect` listener on document).

**Component Props Interface:**
```typescript
interface DropdownItem {
  label: string;
  icon?: string;
  onClick: () => void;
  danger?: boolean; // Red text
}

interface DropdownProps {
  triggerLabel: string;
  items: DropdownItem[];
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Dropdown(...)`.
```

### 21. Sidebar Navigation (Vertical)
```markdown
I need you to build a reusable Vertical Sidebar Navigation Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Fixed width container (e.g., w-64), full height 100%.
- **Sections**:
  - Header: Logo.
  - Body: List of links. Active link has distinct background/color.
  - Footer: User profile snippet or Logout button.
- **Visuals**: Clean border-r, minimal icons.

**Component Props Interface:**
```typescript
interface NavItem {
  label: string;
  iconName: string;
  isActive?: boolean;
}

interface SidebarProps {
  items: NavItem[];
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Sidebar(...)`.
```

### 22. Pagination
```markdown
I need you to build a reusable Pagination Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Row of page numbers centered.
- **Controls**: "Previous" and "Next" buttons on edges.
- **State**: Highlight current page number (solid primary bg).
- **Truncation**: (Optional visual only) Show "..." if many pages.

**Component Props Interface:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Pagination(...)`.
```

### 23. Stepper (Wizard Steps)
```markdown
I need you to build a reusable Process Stepper Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Horizontal row of steps.
- **Step Visual**:
  - Circle with Number.
  - Completed Step: Green Check icon, colored line.
  - Active Step: Primary colored border/text.
  - Inactive Step: Gray.
- **Connector**: Line between steps.

**Component Props Interface:**
```typescript
interface Step {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // 0-indexed
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Stepper(...)`.
```

### 24. File Upload Area
```markdown
I need you to build a reusable File Upload Drag & Drop Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Visuals**: Dashed border container (`border-dashed`), light background.
- **State**: Change border color on hover/drag-over.
- **Content**: Upload Cloud Icon, text "Click to upload or drag and drop", "SVG, PNG, JPG".
- **Interaction**: Standard `<input type="file" hidden />` triggered by click.

**Component Props Interface:**
```typescript
interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function FileUpload(...)`.
```

### 25. Image Gallery / Carousel
```markdown
I need you to build a reusable Image Carousel Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: Build logic from scratch (no `Swiper`).
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Main image display + Left/Right floating chevron arrows.
- **Indicators**: Dots at the bottom showing active slide.
- **Animation**: Simple opacity fade or translate slide.

**Component Props Interface:**
```typescript
interface CarouselProps {
  images: string[]; // URLs
  autoPlay?: boolean;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Carousel(...)`.
```

### 26. Search Bar (with Results)
```markdown
I need you to build a reusable Search Bar with Dropdown Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Input**: Stylish search input with Search Icon on left.
- **Dropdown**: When typing, show a list of mock results below.
- **Result Item**: Icon + Title + Subtitle.
- **Shortcut**: Show "Cmd+K" visual hint on right (optional).

**Component Props Interface:**
```typescript
interface ResultItem {
  id: string;
  title: string;
  category: string;
}

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function SearchBar(...)`.
```

### 27. Timeline Item
```markdown
I need you to build a reusable Vertical Timeline Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Vertical line on left.
- **Item**: Dot on the line, Time on the side, Content card on the right.
- **Visuals**: Line connects dots. Dot color indicates status (done/pending).

**Component Props Interface:**
```typescript
interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  iconName?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function Timeline(...)`.
```

### 28. Code Block Display
```markdown
I need you to build a reusable Code Block / Syntax Highlighter Simulation Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: No `prismjs`. Simulate highlighting with simple color spans or just mono font styling.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Container**: Dark background (`bg-slate-900`), rounded corners.
- **Header**: Filename (e.g., `script.js`) + Copy Button icon.
- **Content**: Monospace font, scrollable x.
- **Features**: "Copy" button actually copies text to clipboard (use `navigator.clipboard`).

**Component Props Interface:**
```typescript
interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function CodeBlock(...)`.
```

### 29. User Profile Card (Small)
```markdown
I need you to build a reusable User Profile Card (Horizontal) Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Avatar Left, Name/Details Right.
- **Action**: "Follow" or "Message" button on far right.
- **Hover**: Card hover effect.
- **Stats**: Optional small stats (Followers, Following) below name.

**Component Props Interface:**
```typescript
interface UserProfileProps {
  name: string;
  handle: string; // e.g., @username
  avatarUrl: string;
  bio?: string;
  isFollowing?: boolean;
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function UserCard(...)`.
```

### 30. Notification Item
```markdown
I need you to build a reusable Notification List Item Component compatible with a Next.js Single-File Previewer.

**Technical Constraints (Strict):**
1. **Atomic & Standalone**: write specific components inside the file.
2. **Libraries**: `react` and `lucide-react`.
3. **Styling**: Tailwind CSS.

**Design Requirements:**
- **Layout**: Icon/Avatar Left, Content Middle, Time/Action Right.
- **State**: Unread (blue bg tint + blue dot) vs Read (white bg).
- **Actions**: Hover shows "Mark as read" or "Delete" icon buttons.

**Component Props Interface:**
```typescript
interface NotificationProps {
  title: string;
  message: string;
  timeAgo: string;
  isUnread: boolean;
  type: 'message' | 'alert' | 'success';
}
```

**Output Format:**
Provide the full React code block starting with `'use client';` and exporting the component as `export default function NotificationItem(...)`.
```

