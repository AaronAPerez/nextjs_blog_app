import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';
import * as schema from './schema';

// Configure neon to use fetch API
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

// Create SQL connection
const sql = neon(process.env.DATABASE_URL);

// Create database instance
export const db = drizzle(sql, { schema });

// Helper function to check database connection
export async function checkDatabaseConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    return { success: true, timestamp: result[0].now };
  } catch (error) {
    console.error('Database connection failed:', error);
    return { success: false, error };
  }
}