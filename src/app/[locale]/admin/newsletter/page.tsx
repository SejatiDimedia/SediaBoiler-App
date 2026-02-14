"use client";

import { useState, useTransition } from "react";
import { broadcastUpdate } from "@/lib/actions/newsletter";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Loader2, Send, Mail } from "lucide-react";

export default function NewsletterAdminPage() {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleBroadcast = (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm("Are you sure you want to send this email to ALL subscribers?")) return;

        startTransition(async () => {
            const result = await broadcastUpdate(subject, content);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.message);
                setSubject("");
                setContent("");
            }
        });
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-from/10 rounded-xl">
                    <Mail className="w-6 h-6 text-brand-from" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Newsletter Broadcast</h1>
                    <p className="text-muted-foreground">Send updates to all subscribers</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <form onSubmit={handleBroadcast} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-from/20 focus:border-brand-from outline-none transition-all"
                            placeholder="e.g. New Template Added: SaaS Landing Page"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">HTML Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-brand-from/20 focus:border-brand-from outline-none transition-all min-h-[300px] font-mono text-sm"
                            placeholder="<p>Hello Subscribers,</p><p>We have added a new component...</p>"
                            required
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            Supports basic HTML tags for formatting.
                        </p>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-brand-from text-white hover:bg-brand-from/90"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Broadcast to All
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
