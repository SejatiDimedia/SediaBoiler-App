import { getPosts } from '@/lib/actions/blog';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Blog' });
    return {
        title: t('meta_title') || 'Blog | SediaBoiler',
        description: t('meta_description') || 'Insights, tutorials, and latest news regarding our ecosystem.',
    };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { success, data: allPosts } = await getPosts(locale);
    const t = await getTranslations('blog');

    // Helper to get localized string
    const getLocalized = (content: any) => {
        if (!content) return '';
        // @ts-ignore
        return content[locale] || content['en'] || '';
    };

    // Separate featured post (first one) from the rest
    const featuredPost = allPosts && allPosts.length > 0 ? allPosts[0] : null;
    const regularPosts = allPosts && allPosts.length > 1 ? allPosts.slice(1) : [];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Decor - Uses Brand Gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-from/5 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-to/5 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <div className="inline-flex items-center rounded-full border border-brand-from/20 bg-gradient-to-r from-brand-from/5 to-brand-to/5 px-3 py-1 text-sm font-medium mb-4 backdrop-blur-sm">
                        <Sparkles className="mr-2 h-3.5 w-3.5 text-brand-from" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-from to-brand-to font-bold">
                            {t('badge')}
                        </span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        {t('title')}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                {/* Featured Post */}
                {featuredPost && (
                    <div className="mb-20">
                        <Link
                            href={`/blog/${featuredPost.slug}`}
                            // Removed hover:border-brand-from/30 and hover:shadow-brand-from/10
                            className="group relative block w-full rounded-3xl overflow-hidden bg-card border border-border/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
                        >
                            {/* Gradient Border Line on Top - KEPT as subtle accent, but removed heavy opacity transition if needed. 
                                User asked to remove "hover color effect". I'll make it static or remove hover reliance. 
                                I'll keep the top border as a static accent or remove it if "color effect" means all colors.
                                I'll remove the hover opacity change so it doesn't "flash" color.
                            */}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:h-[450px]">
                                {/* Image Info */}
                                <div className="relative h-64 lg:h-full overflow-hidden">
                                    {featuredPost.coverImage ? (
                                        <div className="absolute inset-0">
                                            <img
                                                src={featuredPost.coverImage}
                                                alt={getLocalized(featuredPost.title)}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent lg:bg-gradient-to-r" />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                            <span className="text-6xl font-black text-muted-foreground/10">FEATURED</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content Info */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center bg-card/50 backdrop-blur-sm lg:bg-transparent relative">
                                    {/* Removed Ambient Glow on hover */}

                                    <div className="flex items-center gap-2 text-sm font-medium mb-4">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-from opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-from"></span>
                                        </span>
                                        {/* Gradient Badge Text - kept as requested previously */}
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-from to-brand-to font-bold">
                                            {t('featured')}
                                        </span>
                                    </div>

                                    {/* Removed group-hover:bg-clip-text etc. Back to simple color, or kept gradient but static?
                                        User said "hover color effect... di hilangkan saja".
                                        I will revert the HOVER change, but keep the text clean or gradient static if preferred.
                                        I will keep the text foreground (standard) to be safe/clean as requested.
                                    */}
                                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground leading-tight transition-colors">
                                        {getLocalized(featuredPost.title)}
                                    </h2>

                                    <p className="text-muted-foreground text-lg mb-8 line-clamp-3 leading-relaxed">
                                        {getLocalized(featuredPost.excerpt)}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString(locale, {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </div>
                                        <span className="inline-flex items-center text-sm font-bold">
                                            <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                                                {t('readArticle')}
                                            </span>
                                            <ArrowRight className="ml-2 h-4 w-4 text-brand-from transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Regular Posts Grid */}
                {regularPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {regularPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="aspect-[16/10] w-full overflow-hidden bg-muted relative">
                                    {post.coverImage ? (
                                        <img
                                            src={post.coverImage}
                                            alt={getLocalized(post.title)}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
                                            <span className="text-3xl font-bold opacity-10">Sedia</span>
                                        </div>
                                    )}

                                    {/* Date Badge */}
                                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-border/50 shadow-sm text-brand-from">
                                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString(locale, {
                                            month: 'short', day: 'numeric'
                                        })}
                                    </div>
                                </div>

                                <div className="flex-1 p-6 flex flex-col relative text-left">
                                    {/* Removed the hover gradient bg overlay */}

                                    <h3 className="text-xl font-bold mb-3 line-clamp-2 text-foreground transition-all relative z-10">
                                        {getLocalized(post.title)}
                                    </h3>

                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed relative z-10">
                                        {getLocalized(post.excerpt)}
                                    </p>

                                    <div className="flex items-center font-bold text-sm mt-auto group/btn w-fit relative z-10">
                                        <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                                            {t('readMore')}
                                        </span>
                                        <ArrowRight className="w-3.5 h-3.5 ml-1 text-brand-from transition-transform group-hover/btn:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    (!featuredPost) && (
                        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                            <p className="text-muted-foreground">{t('noPosts')}</p>
                        </div>
                    )
                )}

                {/* Newsletter / CTA Section could go here */}
            </div>
        </div>
    );
}
