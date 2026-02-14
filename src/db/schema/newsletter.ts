import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const subscribers = pgTable("subscribers", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull().unique(),
    isSubscribed: boolean("is_subscribed").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    unsubscribedAt: timestamp("unsubscribed_at"),
});
