// const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db", { max: 1 });
// migrate(drizzle(migrationClient), ...)
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be defined");
}

const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });

await migrate(drizzle(migrationClient), { migrationsFolder: "./migrations" });

await migrationClient.end();
