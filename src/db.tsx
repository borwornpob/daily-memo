import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { user, session } from "./schema";
import { Lucia } from "lucia";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be defined");
}

const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient);

// Init lucia
const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
  }
}
