"use server";

import { db } from "@/db";
import { subscribers } from "@/db/schema/newsletter";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";

// Initialize Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function subscribe(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return { error: "Invalid email address" };
    }

    try {
        // Check if already subscribed
        const existing = await db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1);

        if (existing.length > 0) {
            if (existing[0].isSubscribed) {
                return { error: "Email is already registered to the network." };
            } else {
                // Reactivate subscription
                await db.update(subscribers).set({ isSubscribed: true, unsubscribedAt: null }).where(eq(subscribers.email, email));
                return { message: "Welcome back! You have been resubscribed." };
            }
        }

        // New subscriber
        await db.insert(subscribers).values({ email });

        // Send welcome email if SMTP is configured
        if (process.env.SMTP_HOST && process.env.SMTP_USER) {
            try {
                await transporter.sendMail({
                    from: `"SapaUI" <${process.env.SMTP_USER}>`,
                    to: email,
                    subject: "Welcome to SapaUI Newsletter",
                    html: "<p>Thanks for subscribing! You'll be the first to know about new components and templates.</p>",
                });
            } catch (emailError) {
                console.error("Failed to send welcome email:", emailError);
                // Don't fail the subscription if email fails, just log it
            }
        }

        return { success: true, message: "Subscribed successfully!" };
    } catch (error) {
        console.error("Subscription error:", error);
        return { error: "Failed to subscribe. Please try again later." };
    }
}

export async function broadcastUpdate(subject: string, content: string) {
    // This should be protected by admin check in the calling component or middleware
    try {
        const activeSubscribers = await db.select().from(subscribers).where(eq(subscribers.isSubscribed, true));

        if (activeSubscribers.length === 0) {
            return { message: "No active subscribers found." };
        }

        const emailList = activeSubscribers.map(sub => sub.email);

        // Sending emails sequentially to avoid hitting rate limits (common with free SMTP)
        // For larger lists, a queue system is recommended.
        let successCount = 0;

        if (process.env.SMTP_HOST && process.env.SMTP_USER) {
            const results = await Promise.allSettled(emailList.map(email =>
                transporter.sendMail({
                    from: `"SapaUI Updates" <${process.env.SMTP_USER}>`,
                    to: email,
                    subject: subject,
                    html: content,
                })
            ));
            successCount = results.filter(r => r.status === 'fulfilled').length;
        } else {
            return { error: "SMTP Configuration missing. Cannot send emails." };
        }

        return { success: true, message: `Sent to ${successCount} subscribers.` };

    } catch (error) {
        console.error("Broadcast error:", error);
        return { error: "Failed to broadcast update." };
    }
}
