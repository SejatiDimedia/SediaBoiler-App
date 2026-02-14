import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const subscribers = pgTable("subscribers", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull().unique(),
    isSubscribed: boolean("is_subscribed").default(false).notNull(),
    verificationToken: text("verification_token"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    unsubscribedAt: timestamp("unsubscribed_at"),
});

export const newsletterSettings = pgTable("newsletter_settings", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    key: text("key").notNull().unique(), // e.g., 'is_paused'
    value: text("value").notNull(), // 'true' or 'false'
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
