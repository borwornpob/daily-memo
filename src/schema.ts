import {
  serial,
  text,
  pgTable,
  pgSchema,
  timestamp,
} from "drizzle-orm/pg-core";

export const schema = pgSchema("note");

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  profileId: text("id")
    .unique()
    .references(() => profile.id),
});

export const profile = pgTable("profile", {
  id: text("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});