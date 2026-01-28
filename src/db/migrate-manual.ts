
import { db } from './index';
import { sql } from 'drizzle-orm';

async function main() {
    console.log('Starting manual migration...');

    try {
        // Users
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "users" (
                "id" text PRIMARY KEY NOT NULL,
                "name" text,
                "email" text,
                "emailVerified" timestamp,
                "image" text,
                CONSTRAINT "users_email_unique" UNIQUE("email")
            );
        `);
        console.log('Created users table');

        // Accounts
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "accounts" (
                "userId" text NOT NULL REFERENCES "users"("id") ON DELETE cascade,
                "type" text NOT NULL,
                "provider" text NOT NULL,
                "providerAccountId" text NOT NULL,
                "refresh_token" text,
                "access_token" text,
                "expires_at" integer,
                "token_type" text,
                "scope" text,
                "id_token" text,
                "session_state" text,
                CONSTRAINT "accounts_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
            );
        `);
        console.log('Created accounts table');

        // Sessions
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "sessions" (
                "sessionToken" text PRIMARY KEY NOT NULL,
                "userId" text NOT NULL REFERENCES "users"("id") ON DELETE cascade,
                "expires" timestamp NOT NULL
            );
        `);
        console.log('Created sessions table');

        // Verification Tokens
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "verification_tokens" (
                "identifier" text NOT NULL,
                "token" text NOT NULL,
                "expires" timestamp NOT NULL,
                CONSTRAINT "verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
            );
        `);
        console.log('Created verification_tokens table');

        // Comments
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "comments" (
                "id" serial PRIMARY KEY NOT NULL,
                "content" text NOT NULL,
                "post_id" integer NOT NULL REFERENCES "posts"("id") ON DELETE cascade,
                "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE cascade,
                "created_at" timestamp DEFAULT now() NOT NULL,
                "updated_at" timestamp DEFAULT now() NOT NULL
            );
        `);
        console.log('Created comments table');

        // Likes
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "likes" (
                "post_id" integer NOT NULL REFERENCES "posts"("id") ON DELETE cascade,
                "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE cascade,
                "created_at" timestamp DEFAULT now() NOT NULL,
                CONSTRAINT "likes_post_id_user_id_pk" PRIMARY KEY("post_id","user_id")
            );
        `);
        console.log('Created likes table');

        console.log('Migration completed successfully.');
    } catch (e) {
        console.error('Migration failed:', e);
    }
    process.exit(0);
}

main();
