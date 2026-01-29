import { getPostBySlug } from '@/lib/actions/blog';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/library/CodeBlock';
import { BlogInteractions } from '@/components/blog/BlogInteractions';
import { getPostInteractions } from '@/lib/actions/interactions';
import { ShareButtons } from '@/components/blog/ShareButtons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const { success, data: post } = await getPostBySlug(slug);

    if (!success || !post) {
        return {
            title: 'Post Not Found',
        };
    }

    // @ts-ignore
    const title = post.title[locale] || post.title['en'];
    // @ts-ignore
    const excerpt = post.excerpt ? (post.excerpt[locale] || post.excerpt['en']) : '';

    return {
        title: title,
        description: excerpt,
        openGraph: {
            title: title,
            description: excerpt,
            images: post.coverImage ? [post.coverImage] : [],
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const { success, data: post } = await getPostBySlug(slug);
    const interactions = await getPostInteractions(slug);

    if (!success || !post) {
        notFound();
    }

    // Helper to get localized string
    const getLocalized = (content: any) => {
        if (!content) return '';
        // @ts-ignore
        return content[locale] || content['en'] || '';
    };

    const t = await getTranslations('blog');

    const title = getLocalized(post.title);
    const content = getLocalized(post.content);
    const date = new Date(post.publishedAt || post.createdAt).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Calculate read time (rough estimate)
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / 200);

    return (
        <article className="min-h-screen bg-background pb-20 pt-8 lg:pt-12 relative overflow-hidden">
            {/* Subtle top light */}
            <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-brand-from/5 to-transparent pointer-events-none z-0" />

            <div className="relative z-10 container mx-auto px-4 max-w-3xl">
                {/* Navigation & Meta */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Blog
                    </Link>
                    <ShareButtons title={title} />
                </div>

                {/* Minimal Header */}
                <header className="mb-10 text-left">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <time dateTime={post.publishedAt?.toString()} className="font-semibold text-brand-from">
                            {date}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span>{readTime} min read</span>
                    </div>

                    <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight text-foreground mb-6">
                        {title}
                    </h1>

                    {post.excerpt && (
                        <p className="text-xl text-muted-foreground leading-relaxed border-l-2 border-brand-from/20 pl-4">
                            {getLocalized(post.excerpt)}
                        </p>
                    )}
                </header>

                {/* Cover Image - Slim & Rounded */}
                {post.coverImage && (
                    <div className="rounded-xl overflow-hidden mb-12 border border-border/50 bg-muted aspect-[2.4/1] shadow-sm relative group">
                        <img
                            src={post.coverImage}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl" />
                    </div>
                )}

                {/* Main Content - Editorial Typography */}
                {/* Main Content - Custom Rendered for Complete Control, bypassing Prose plugin */}
                <div className="max-w-none">
                    <ReactMarkdown
                        components={{
                            // Headings
                            h1: ({ children }) => (
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-16 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-brand-from to-brand-to w-fit">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6 flex items-center gap-3 group">
                                    <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-brand-from to-brand-to shrink-0" />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:from-brand-from group-hover:to-brand-to transition-all duration-500">
                                        {children}
                                    </span>
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
                                    <span className="text-brand-from/50">#</span>
                                    {children}
                                </h3>
                            ),
                            // Text
                            p: ({ children }) => (
                                <p className="text-lg text-foreground/85 leading-loose mb-6 font-normal tracking-wide">
                                    {children}
                                </p>
                            ),
                            strong: ({ children }) => (
                                <strong className="font-bold text-foreground bg-brand-from/10 px-1 rounded-sm">
                                    {children}
                                </strong>
                            ),
                            // Lists
                            ul: ({ children }) => (
                                <ul className="flex flex-col gap-3 my-8 ml-2">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-outside ml-6 flex flex-col gap-3 my-8 text-foreground/80 font-medium">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => {
                                // Check if it's an ordered list item by context if possible, but simpler to just robustly style both.
                                // For UL, we can assume no bullets provided by parent UL style usually, but lets try to detect or just default generic.
                                // ReactMarkdown 'li' doesn't easily know parent. 
                                // Actually, 'ul' above removes list-style. So we need to add custom marker here
                                // But generic 'li' handles both content. 
                                // Let's try a safe bet: standard LI for OL, custom for UL is tricky without context.
                                // We'll stick to CSS markers for OL, but for UL we cleared it? 
                                // Revert specific UL clear, use standard class but styled.
                                return (
                                    <li className="text-lg leading-relaxed pl-2 relative">
                                        {children}
                                    </li>
                                )
                            },
                            // Links
                            a: ({ children, href }) => (
                                <Link
                                    href={href || '#'}
                                    className="inline-block font-semibold text-brand-from border-b-2 border-brand-from/30 hover:border-brand-from transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    {children}
                                </Link>
                            ),
                            // Blockquote - Visual Feature
                            blockquote: ({ children }) => (
                                <blockquote className="relative my-10 p-8 rounded-2xl bg-gradient-to-br from-brand-from/5 to-transparent border border-brand-from/10 shadow-[0_0_40px_-15px_rgba(var(--brand-from-rgb),0.2)] icon-quote">
                                    <Sparkles className="absolute top-4 right-4 w-6 h-6 text-brand-from/20" />
                                    <div className="relative z-10 text-xl font-medium italic text-foreground/90 leading-relaxed font-serif">
                                        {children}
                                    </div>
                                </blockquote>
                            ),
                            // Code Blocks
                            pre: ({ children }) => <>{children}</>,
                            code({ className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                const isInline = !match;

                                if (!isInline && match) {
                                    return (
                                        <CodeBlock
                                            code={String(children).replace(/\n$/, '')}
                                            language={match[1]}
                                        />
                                    );
                                }

                                return (
                                    <code className={`${className} bg-brand-from/10 text-brand-from px-1.5 py-0.5 rounded-md text-[0.9em] font-mono font-bold border border-brand-from/20`} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            // Images
                            img: (props) => (
                                <div className="my-12 relative group rounded-3xl overflow-hidden shadow-2xl bg-muted">
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 z-10 rounded-3xl" />
                                    <img
                                        {...props}
                                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {props.alt && (
                                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                            <p className="text-white font-medium text-sm text-center">{props.alt}</p>
                                        </div>
                                    )}
                                </div>
                            ),
                            // Separator
                            hr: () => (
                                <hr className="my-16 border-t-2 border-dashed border-border/60 w-1/3 mx-auto" />
                            )
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

                {/* Interactions Section */}
                <BlogInteractions
                    slug={slug}
                    initialLikeCount={interactions.likeCount}
                    initialUserHasLiked={interactions.userHasLiked}
                    initialComments={interactions.comments}
                />

                {/* Footer Section - Brands Gradient Card */}
                <div className="mt-24 pt-16 border-t border-border/40">
                    <div className="relative overflow-hidden rounded-3xl p-[1px] shadow-2xl">
                        {/* Border Gradient Container */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-from via-brand-to to-brand-from opacity-50" />

                        <div className="relative rounded-[22px] overflow-hidden bg-background/90 backdrop-blur-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 group h-full w-full">
                            {/* Ambient Glows */}
                            <div className="absolute -left-20 -top-20 h-64 w-64 bg-brand-from/20 blur-[100px] transition-all duration-1000 group-hover:bg-brand-from/30 opacity-50" />
                            <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-brand-to/20 blur-[100px] transition-all duration-1000 group-hover:bg-brand-to/30 opacity-50" />

                            {/* Background Grid - White/Grey for contrast */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                            <div className="relative z-10 text-center md:text-left max-w-lg">
                                {/* Gradient Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-wider uppercase rounded-full border border-brand-from/20 bg-gradient-to-r from-brand-from/10 to-brand-to/10 shadow-sm">
                                    <Sparkles className="w-3 h-3 text-brand-from" />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-from to-brand-to">
                                        {t('footer.badge')}
                                    </span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                                    {t('footer.title')}
                                </h3>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {t('footer.description')}
                                </p>
                            </div>

                            <div className="relative z-10 shrink-0">
                                <Link href="/blog">
                                    <Button size="lg" className="rounded-full px-8 h-14 text-base shadow-xl shadow-brand-from/20 hover:shadow-brand-from/40 hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-brand-from to-brand-to text-white border-none">
                                        <BookOpen className="w-5 h-5 mr-2.5" />
                                        {t('footer.button')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
