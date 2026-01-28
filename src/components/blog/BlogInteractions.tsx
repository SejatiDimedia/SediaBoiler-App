
'use client'

import { useState, useTransition } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { toggleLike, addComment, deleteComment } from '@/lib/actions/interactions'
import { Heart, MessageCircle, Send, Trash2, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

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

    // Optimistic State
    const [likeCount, setLikeCount] = useState(initialLikeCount)
    const [hasLiked, setHasLiked] = useState(initialUserHasLiked)

    // Comments State
    const [comments, setComments] = useState(initialComments)
    const [commentText, setCommentText] = useState('')

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
                const serverLiked = await toggleLike(slug)
                // Sync if mismatch, but usually relying on revalidate
            } catch (error) {
                // Revert
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
                // Server revalidation will update real list on next visit/refresh
                // Or we can refetch manually if needed.
            } catch (error) {
                setComments(commentsRef => commentsRef.filter(c => c.id !== tempId))
            }
        })
    }

    return (
        <div className="mt-16 border-t border-border/40 pt-10">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                Discussion <span className="text-muted-foreground text-lg font-normal">({comments.length})</span>
            </h3>

            {/* Like Button */}
            <div className="mb-10">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLike}
                    className={cn(
                        "gap-3 rounded-full h-12 text-base transition-all duration-300",
                        hasLiked ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-950/30 dark:border-red-900/50" : "hover:border-red-200 hover:text-red-600"
                    )}
                >
                    <Heart className={cn("w-5 h-5", hasLiked && "fill-current")} />
                    {likeCount} Likes
                </Button>
            </div>

            {/* Comment Form */}
            <div className="mb-12 bg-muted/30 p-6 rounded-2xl border border-border/50">
                {!session ? (
                    <div className="text-center py-4">
                        <p className="text-muted-foreground mb-4">Join the conversation</p>
                        <Button onClick={() => signIn('google')} className="bg-brand-from text-white">
                            Sign in with Google to Comment
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmitComment} className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-brand-from/10 overflow-hidden shrink-0">
                            {session.user?.image ? (
                                <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-5 h-5 m-2.5 text-brand-from" />
                            )}
                        </div>
                        <div className="flex-1 space-y-4">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="What are your thoughts?"
                                className="w-full bg-background border border-border rounded-xl p-4 min-h-[100px] focus:ring-2 focus:ring-brand-from/20 focus:border-brand-from outline-none transition-all resize-y"
                            />
                            <div className="flex justify-end">
                                <Button disabled={isPending || !commentText.trim()} type="submit" className="rounded-full bg-brand-from hover:bg-brand-to text-white">
                                    <Send className="w-4 h-4 mr-2" />
                                    Post Comment
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </div>

            {/* Comments List */}
            <div className="space-y-8">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="w-10 h-10 rounded-full bg-brand-from/10 overflow-hidden shrink-0 border border-border">
                            {comment.user?.image ? (
                                <img src={comment.user.image} alt={comment.user.name || 'User'} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-5 h-5 m-2.5 text-brand-from" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-foreground">{comment.user?.name || 'Anonymous'}</span>
                                <span className="text-xs text-muted-foreground">• {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                            </div>
                            <p className="text-foreground/80 leading-relaxed bg-muted/20 p-4 rounded-r-xl rounded-bl-xl inline-block">
                                {comment.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
