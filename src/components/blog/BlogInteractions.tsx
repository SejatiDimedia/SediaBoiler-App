
'use client'

import { useState, useTransition } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { toggleLike, addComment, deleteComment } from '@/lib/actions/interactions'
import { Heart, MessageCircle, Send, Trash2, User, Sparkles, LogIn, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    user: {
        name: string | null;
        image: string | null;
    } | null;
}

interface BlogInteractionsProps {
    slug: string;
    initialLikeCount: number;
    initialUserHasLiked: boolean;
    initialComments: Comment[];
}

export function BlogInteractions({
    slug,
    initialLikeCount,
    initialUserHasLiked,
    initialComments
}: BlogInteractionsProps) {
    const { data: session } = useSession()
    const [isPending, startTransition] = useTransition()
    const t = useTranslations('blog.interactions')

    // Optimistic State
    const [likeCount, setLikeCount] = useState(initialLikeCount)
    const [hasLiked, setHasLiked] = useState(initialUserHasLiked)

    // Comments State
    const [comments, setComments] = useState(initialComments)
    const [commentText, setCommentText] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    const handleLike = () => {
        if (!session) {
            signIn('google')
            return
        }

        const newLiked = !hasLiked
        setHasLiked(newLiked)
        setLikeCount(prev => newLiked ? prev + 1 : prev - 1)

        startTransition(async () => {
            try {
                await toggleLike(slug)
            } catch (error) {
                setHasLiked(!newLiked)
                setLikeCount(prev => !newLiked ? prev + 1 : prev - 1)
            }
        })
    }

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!session) {
            signIn('google')
            return
        }

        if (!commentText.trim()) return

        const tempId = Date.now()
        const newComment: Comment = {
            id: tempId,
            content: commentText,
            createdAt: new Date(),
            user: {
                name: session.user?.name || 'User',
                image: session.user?.image || null
            }
        }

        setComments([newComment, ...comments])
        setCommentText('')

        startTransition(async () => {
            try {
                await addComment(slug, newComment.content)
            } catch (error) {
                setComments(commentsRef => commentsRef.filter(c => c.id !== tempId))
            }
        })
    }

    return (
        <section className="mt-24 max-w-2xl mx-auto">
            {/* Divider with Icon */}
            <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1" />
                <div className="w-2 h-2 rounded-full bg-brand-from/50" />
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1" />
            </div>

            {/* Like Section - Centralized & Heroic */}
            <div className="flex flex-col items-center justify-center mb-16 gap-4">
                <button
                    onClick={handleLike}
                    className="group relative"
                >
                    <div className={cn(
                        "relative z-10 flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500",
                        hasLiked
                            ? "bg-gradient-to-br from-red-500 to-pink-600 border-transparent text-white shadow-[0_0_20px_-10px_rgba(239,68,68,0.6)] scale-105"
                            : "bg-background border-border hover:border-red-200 hover:shadow-lg dark:hover:border-red-900/50"
                    )}>
                        <Heart className={cn(
                            "w-5 h-5 transition-all duration-500",
                            hasLiked ? "fill-current scale-110" : "text-muted-foreground group-hover:text-red-500"
                        )} />
                        <span className={cn(
                            "text-base font-medium",
                            hasLiked ? "text-white" : "text-foreground"
                        )}>
                            {likeCount}
                        </span>
                    </div>
                    {/* Glow Details */}
                    <div className={cn(
                        "absolute inset-0 rounded-full blur-xl transition-opacity duration-500",
                        hasLiked ? "bg-red-500/20 opacity-100" : "opacity-0"
                    )} />
                </button>
                <p className="text-sm text-muted-foreground font-medium tracking-wide">
                    {hasLiked ? t('thanks') : t('enjoyed')}
                </p>
            </div>

            {/* Comments Section */}
            <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="bg-brand-from/10 p-2 rounded-lg text-brand-from">
                            <MessageCircle className="w-5 h-5" />
                        </span>
                        {t('discussion')}
                        <span className="text-muted-foreground text-lg font-normal">({comments.length})</span>
                    </div>
                    {session && (
                        <button
                            onClick={() => signOut()}
                            className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-red-500 transition-colors group/logout"
                        >
                            <LogOut className="w-3.5 h-3.5 group-hover/logout:-translate-x-0.5 transition-transform" />
                            {t('signOut')}
                        </button>
                    )}
                </h3>

                {/* Comment Input or Login Card */}
                <div className="mb-12 relative group">
                    {!session ? (
                        <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-br from-brand-from/40 via-brand-to/40 to-brand-from/40 shadow-2xl shadow-brand-from/10 animate-in fade-in zoom-in duration-700">
                            <div className="relative bg-card rounded-[23px] p-10 text-center overflow-hidden">
                                {/* Ambient Glows */}
                                <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-from/10 blur-[80px] rounded-full pointer-events-none" />
                                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-to/10 blur-[80px] rounded-full pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    <div className="p-3 bg-brand-from/10 rounded-full mb-1">
                                        <LogIn className="w-6 h-6 text-brand-from" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-foreground tracking-tight">{t('join')}</h4>
                                    <p className="text-muted-foreground max-w-xs mx-auto mb-8 leading-relaxed">
                                        {t('signInDesc')}
                                    </p>
                                    <button
                                        onClick={() => signIn('google')}
                                        style={{ backgroundColor: 'white', color: '#3c4043' }}
                                        className="w-full sm:w-auto rounded-full border border-gray-200 shadow-md flex items-center justify-center gap-3 px-10 py-4 text-base font-bold transition-all hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 active:scale-95"
                                    >
                                        <svg className="w-5 h-5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                        </svg>
                                        <span>{t('signInGoogle')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={cn(
                            "rounded-3xl border transition-all duration-300 overflow-hidden bg-card shadow-sm",
                            isFocused ? "border-muted shadow-md" : "border-border"
                        )}>
                            <form onSubmit={handleSubmitComment} className="p-4">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-from to-brand-to p-[2px] shrink-0">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-background border-2 border-background">
                                            {session.user?.image ? (
                                                <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-full h-full p-2 text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            placeholder={t('placeholder')}
                                            className="w-full bg-transparent border-none !ring-0 !outline-none !ring-offset-0 focus:!ring-0 focus:!outline-none focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!outline-none text-base min-h-[80px] placeholder:text-muted-foreground/50 resize-y py-2"
                                        />
                                    </div>
                                </div>
                                <div className={cn(
                                    "flex justify-between items-center pt-2 border-t border-border/50 mt-2 transition-all duration-300",
                                    (isFocused || commentText) ? "opacity-100 translate-y-0" : "opacity-50 translate-y-2 pointer-events-none"
                                )}>
                                    <p className="text-xs text-muted-foreground font-medium">{t('markdown')}</p>
                                    <Button
                                        disabled={isPending || !commentText.trim()}
                                        type="submit"
                                        className="rounded-full bg-gradient-to-r from-brand-from to-brand-to hover:from-brand-from/90 hover:to-brand-to/90 shadow-lg shadow-brand-from/20 text-white border-none px-6"
                                    >
                                        {t('post')}
                                        <Send className="w-3.5 h-3.5 ml-2" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Comments List */}
                <div className="space-y-8">
                    {comments.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground italic bg-muted/20 rounded-2xl border border-dashed border-border/60">
                            {t('noComments')}
                        </div>
                    )}
                    {comments.map((comment) => (
                        <div key={comment.id} className="group flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0 border border-border group-hover:border-brand-from/50 transition-colors">
                                {comment.user?.image ? (
                                    <img src={comment.user.image} alt={comment.user.name || 'User'} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 m-2.5 text-muted-foreground" />
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-foreground">{comment.user?.name || 'Anonymous'}</span>
                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                        <span className="text-xs text-muted-foreground font-medium">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                                    </div>
                                </div>
                                <div className="text-foreground/80 leading-relaxed text-base">
                                    {comment.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
