"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Send, Bot, User, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatWithDocs, Message, Recommendation } from "@/lib/actions/ai-assistant";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "model", content: "Hi! I'm SapaAI. Looking for a specific component or template? Just ask!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);
        setRecommendations([]); // Clear previous recommendations while loading new ones

        try {
            const response = await chatWithDocs(userMessage, messages);

            setMessages(prev => [...prev, { role: "model", content: response.answer }]);
            if (response.recommendations && response.recommendations.length > 0) {
                setRecommendations(response.recommendations);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "model", content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Close on navigation
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Floating Trigger Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300",
                    "bg-gradient-to-r from-brand-from to-brand-to text-white hover:shadow-brand-from/25",
                    isOpen && "hidden"
                )}
            >
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold text-sm">Ask AI</span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-brand-from/10 bg-brand-from/5 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-from to-brand-to flex items-center justify-center text-white">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-foreground">Sapa Assistant</h3>
                                    <p className="text-xs text-brand-from/70">Powered by Gemini AI</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-brand-from/10 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-brand-from/60" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                        msg.role === "user" ? "bg-gradient-to-br from-brand-from to-brand-to text-white shadow-sm" : "bg-brand-from/10 text-brand-from"
                                    )}>
                                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                        msg.role === "user"
                                            ? "bg-gradient-to-br from-brand-from to-brand-to text-white rounded-tr-none"
                                            : "bg-brand-from/5 border border-brand-from/10 rounded-tl-none text-foreground"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {/* Recommendations */}
                            {recommendations.length > 0 && (
                                <div className="ml-11 grid gap-2">
                                    <p className="text-xs font-semibold text-brand-from/70 uppercase tracking-wider mb-1">
                                        Recommended for you:
                                    </p>
                                    {recommendations.map((rec) => (
                                        <Link
                                            key={rec.slug}
                                            href={rec.category === 'landing-page'
                                                ? `/library/template/${rec.slug}`
                                                : `/library/component/${rec.category}/${rec.slug}`}
                                            className="block p-3 rounded-xl border border-brand-from/20 bg-brand-from/5 hover:border-brand-from/50 hover:bg-brand-from/10 transition-all group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-brand-from uppercase tracking-wider mb-0.5">
                                                        {rec.category}
                                                    </span>
                                                    <span className="text-sm font-medium text-foreground group-hover:text-brand-from transition-colors">
                                                        {rec.name}
                                                    </span>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-brand-from/60 group-hover:text-brand-from group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-brand-from/10 flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-brand-from" />
                                    </div>
                                    <div className="flex items-center gap-1 p-3 rounded-2xl rounded-tl-none bg-brand-from/5 border border-brand-from/10">
                                        <div className="w-2 h-2 bg-brand-from/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-brand-from/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-brand-from/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-brand-from/10 bg-background">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your question..."
                                    className="w-full pl-4 pr-12 py-3 bg-brand-from/5 border border-brand-from/20 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-from/20 focus:border-brand-from transition-all text-sm placeholder:text-brand-from/40"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-gradient-to-r from-brand-from to-brand-to text-white rounded-full hover:shadow-lg hover:shadow-brand-from/25 disabled:opacity-50 transition-all"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
