import { serial, text, pgTable, pgSchema } from "drizzle-orm/pg-core";

export const schema = pgSchema("note");

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
});
