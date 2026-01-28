import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Check for DATABASE_URL
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL is not set in environment variables');
}

// Create postgres connection with singleton pattern for development
const globalQueryClient = global as unknown as { postgres: postgres.Sql };

const client = globalQueryClient.postgres || (connectionString
    ? postgres(connectionString, {
        prepare: false,
        max: 1, // Strict limit for Supabase Session Pooling
    })
    : null);

if (process.env.NODE_ENV !== 'production' && client) {
    globalQueryClient.postgres = client;
}

const dbInstance = client ? drizzle(client, { schema }) : null;
export const db = dbInstance!;
export const sql = client;

export { schema };

// Helper to check if db is available
export function isDatabaseAvailable(): boolean {
    return db !== null;
}
