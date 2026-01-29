import { Link } from '@/i18n/navigation';
import { getMostLikedPosts } from '@/lib/actions/interactions';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Heart, Sparkles, TrendingUp, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export async function MostLikedSection({ locale }: { locale: string }) {
    const mostLikedPosts = await getMostLikedPosts(4);

    if (!mostLikedPosts || mostLikedPosts.length === 0) {
        return null;
    }

    const t = await getTranslations('blog.mostPopular');

    // Helper to get localized string
    const getLocalized = (content: any) => {
        if (!content) return '';
        // @ts-ignore
        return content[locale] || content['en'] || '';
    };

    return (
        <section className="mb-24 relative">
            {/* Decorative Background Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-from/5 via-transparent to-brand-to/5 blur-3xl rounded-full pointer-events-none -z-10" />

            <div className="flex items-end justify-between mb-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-bold tracking-wider uppercase rounded-full border border-brand-from/20 bg-gradient-to-r from-brand-from/10 to-brand-to/10 text-brand-from">
                        <Flame className="w-3 h-3 fill-brand-from animate-pulse" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-from to-brand-to">
                            {t('trending')}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-brand-from to-brand-to">
                        {t('title')}
                    </h2>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>{t('description')}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mostLikedPosts.map((post, index) => (
                    <Link
                        key={post?.id}
                        href={`/blog/${post?.slug}`}
                        className="group relative flex flex-col h-full bg-card rounded-3xl overflow-hidden border border-border/40 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-from/20 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-brand-from/15 hover:to-brand-to/15 hover:border-brand-from/50"
                    >
                        {/* Image Container */}
                        <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                            {post?.coverImage ? (
                                <img
                                    src={post.coverImage}
                                    alt={getLocalized(post.title)}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
                                    <span className="text-2xl font-bold opacity-10">Sedia</span>
                                </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                            {/* Rank Badge - Premium Style */}
                            <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-md font-black text-lg shadow-lg ring-1 ring-black/5 text-foreground group-hover:scale-110 transition-transform duration-300">
                                <span className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-br",
                                    index === 0 ? "from-yellow-400 to-amber-600" :
                                        index === 1 ? "from-slate-300 to-slate-500" :
                                            index === 2 ? "from-amber-700 to-amber-900" : "from-foreground to-muted-foreground"
                                )}>
                                    #{index + 1}
                                </span>
                            </div>

                            {/* Like Pill */}
                            <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-bold flex items-center gap-1.5 border border-white/10 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-brand-from group-hover:to-brand-to transition-all duration-300">
                                <Heart className="w-3.5 h-3.5 fill-current text-white/90" />
                                {post.likeCount}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1 relative bg-gradient-to-b from-card/50 to-card">
                            <h3 className="font-bold text-lg leading-tight mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-from group-hover:to-brand-to transition-colors duration-300">
                                {getLocalized(post?.title)}
                            </h3>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1 leading-relaxed">
                                {getLocalized(post?.excerpt)}
                            </p>

                            <div className="flex items-center justify-between mt-auto border-t border-border/40 pt-4">
                                <span className="text-xs font-bold text-muted-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-from group-hover:to-brand-to transition-all">
                                    {t('readArticle')}
                                </span>
                                <div className="h-8 w-8 rounded-full bg-brand-from/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-brand-from group-hover:to-brand-to group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-brand-from/20">
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
