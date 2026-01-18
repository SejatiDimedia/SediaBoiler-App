import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Check for DATABASE_URL
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL is not set in environment variables');
}

// Create postgres connection only if we have a connection string
const client = connectionString
    ? postgres(connectionString, {
        prepare: false,
        max: 1,  // Keep low for Supabase Session Pooler. For better concurrency, use Transaction Pooler (port 6543)
    })
    : null;

export const db = client ? drizzle(client, { schema }) : null;
export const sql = client; // Export client for manual cleanup

export { schema };

// Helper to check if db is available
export function isDatabaseAvailable(): boolean {
    return db !== null;
}
