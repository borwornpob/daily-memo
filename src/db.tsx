import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be defined');
}

const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient);