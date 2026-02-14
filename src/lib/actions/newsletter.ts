"use server";

import { db } from "@/db";
import { subscribers, newsletterSettings } from "@/db/schema/newsletter";
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
            const subscriber = existing[0];
            if (subscriber.isSubscribed) {
                return { error: "Email is already registered and active." };
            } else if (subscriber.verificationToken) {
                // Resend verification email if not verified yet
                await sendVerificationEmail(email, subscriber.verificationToken);
                return { message: "Verification email resent. Please check your inbox." };
            } else {
                // Was unsubscribed, reactivate immediately? Or require verification again?
                // Let's require verification for safety if they unsubscribed.
                // Actually, if they unsubscribed, they probably just want to come back. 
                // But user asked for "confirm willingness" so maybe verify again is safer.
                // For now, let's just reactivate if they were previously verified (token is null).
                // Wait, if unsubscribed, token is likely null. 
                // Let's generate new token and require verification again to be safe.
                const token = crypto.randomUUID();
                await db.update(subscribers).set({
                    verificationToken: token,
                    unsubscribedAt: null,
                    // DO NOT set isSubscribed to true yet
                }).where(eq(subscribers.email, email));

                await sendVerificationEmail(email, token);
                return { message: "Welcome back! Please verify your email to reactivate." };
            }
        }

        // New subscriber
        const token = crypto.randomUUID();
        await db.insert(subscribers).values({
            email,
            isSubscribed: false, // Default is false
            verificationToken: token
        });

        await sendVerificationEmail(email, token);

        return { success: true, message: "Please check your email to confirm your subscription." };
    } catch (error) {
        console.error("Subscription error:", error);
        return { error: "Failed to subscribe. Please try again later." };
    }
}

async function sendVerificationEmail(email: string, token: string) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
        console.warn("SMTP not configured, skipping verification email.");
        return;
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verificationUrl = `${appUrl}/verify-email?token=${token}`;

    try {
        await transporter.sendMail({
            from: `"SapaUI" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Confirm your subscription",
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Welcome to SapaUI!</h2>
                    <p>Please click the button below to confirm your subscription to our newsletter.</p>
                    <p>
                        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                            Confirm Subscription
                        </a>
                    </p>
                    <p style="font-size: 12px; color: #666;">If you didn't request this, you can ignore this email.</p>
                </div>
            `,
        });
    } catch (error) {
        console.error("Failed to send verification email:", error);
        throw error; // Re-throw to be caught by caller
    }
}

export async function verifyEmail(token: string) {
    try {
        const matching = await db.select().from(subscribers).where(eq(subscribers.verificationToken, token)).limit(1);

        if (matching.length === 0) {
            return { error: "Invalid or expired verification token." };
        }

        const subscriber = matching[0];

        await db.update(subscribers)
            .set({
                isSubscribed: true,
                verificationToken: null // Clear token after usage
            })
            .where(eq(subscribers.id, subscriber.id));

        // Optional: Send "Welcome" email now that they are verified?
        // Let's keep it simple for now.

        return { success: true, message: "Email verified! You are now subscribed." };
    } catch (error) {
        console.error("Verification error:", error);
        return { error: "Failed to verify email." };
    }
}

export async function broadcastUpdate(subject: string, content: string) {
    // This should be protected by admin check in the calling component or middleware
    try {
        const isPaused = await isNewsletterPaused();
        if (isPaused) {
            console.log("Broadcast skipped: Newsletter is paused globally.");
            return { message: "Newsletter is currently paused. No emails were sent." };
        }

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

// Check if newsletter is paused globally
export async function isNewsletterPaused() {
    try {
        const setting = await db.select().from(newsletterSettings).where(eq(newsletterSettings.key, "is_paused")).limit(1);
        return setting.length > 0 && setting[0].value === "true";
    } catch (error) {
        console.error("Failed to check newsletter settings:", error);
        return false; // Default to active if error
    }
}

// Toggle newsletter pause state
export async function toggleNewsletterPause(shouldPause: boolean) {
    try {
        const existing = await db.select().from(newsletterSettings).where(eq(newsletterSettings.key, "is_paused")).limit(1);

        if (existing.length > 0) {
            await db.update(newsletterSettings)
                .set({ value: String(shouldPause), updatedAt: new Date() })
                .where(eq(newsletterSettings.key, "is_paused"));
        } else {
            await db.insert(newsletterSettings).values({
                key: "is_paused",
                value: String(shouldPause)
            });
        }

        return { success: true, isPaused: shouldPause };
    } catch (error) {
        console.error("Failed to update newsletter settings:", error);
        return { error: "Failed to update settings" };
    }
}

// Get all subscribers for Admin UI
export async function getSubscribers() {
    try {
        const all = await db.select().from(subscribers).orderBy(subscribers.createdAt);
        return all;
    } catch (error) {
        console.error("Failed to fetch subscribers:", error);
        return [];
    }
}

// Delete subscriber (Admin only)
export async function deleteSubscriber(id: string) {
    try {
        await db.delete(subscribers).where(eq(subscribers.id, id));
        return { success: true };
    } catch (error) {
        console.error("Failed to delete subscriber:", error);
        return { error: "Failed to delete subscriber" };
    }
}
