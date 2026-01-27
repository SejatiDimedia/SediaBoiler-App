import { getPostBySlug } from '@/lib/actions/blog';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/library/CodeBlock';

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
        title: `${title} | SediaBoiler Blog`,
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
                <div className="prose prose-lg dark:prose-invert max-w-none 
                    /* Headings */
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:scroll-m-20
                    prose-h1:text-4xl prose-h1:font-extrabold prose-h1:mb-8
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-2
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
                    
                    /* Body Text */
                    prose-p:text-foreground/85 prose-p:leading-8 prose-p:my-6
                    prose-strong:text-foreground prose-strong:font-bold
                    
                    /* Links */
                    prose-a:text-foreground prose-a:font-semibold prose-a:underline prose-a:decoration-brand-from/50 prose-a:underline-offset-4 prose-a:decoration-2 hover:prose-a:decoration-brand-from hover:prose-a:text-brand-from prose-a:transition-all
                    
                    /* Lists */
                    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:text-foreground/85 prose-li:my-2 prose-li:leading-7
                    prose-li:marker:text-brand-from prose-li:marker:font-bold
                    
                    /* Blockquotes */
                    prose-blockquote:border-l-4 prose-blockquote:border-brand-from prose-blockquote:bg-muted/30 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:my-10 prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:leading-loose prose-blockquote:shadow-sm
                    
                    /* Images */
                    prose-img:rounded-xl prose-img:border prose-img:border-border/50 prose-img:shadow-lg prose-img:my-12 prose-img:w-full prose-img:bg-muted
                    
                    /* Separators */
                    prose-hr:my-16 prose-hr:border-border/50
                    
                    /* Code (Inline - Block is handled by component) */
                    prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none
                ">
                    <ReactMarkdown
                        components={{
                            // Unwrap pre to avoid background color leaks in margins
                            pre: ({ children }: any) => <>{children}</>,
                            code({ className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                const isInline = !match;

                                if (!isInline && match) {
                                    return (
                                        <div className="not-prose my-12">
                                            <CodeBlock
                                                code={String(children).replace(/\n$/, '')}
                                                language={match[1]}
                                            />
                                        </div>
                                    );
                                }

                                return (
                                    <code className={`${className} bg-gradient-to-r from-brand-from to-brand-to px-1.5 py-0.5 rounded-md text-[0.9em] font-mono font-bold text-white shadow-sm shadow-brand-from/20`} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

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
