import { relations } from "drizzle-orm";
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
  profileId: text("profile_id")
    .unique()
    .references(() => profile.id),
  githubId: text("github_id").unique(),
  username: text("username").unique(),
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

export const note = pgTable("note", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).notNull(),
});

export const userRelation = relations(user, ({ one, many }) => ({
  UserProfile: one(profile, {
    fields: [user.profileId],
    references: [profile.id],
  }),

  Notes: many(note),
}));

export const noteRelation = relations(note, ({ one }) => ({
  User: one(user, {
    fields: [note.userId],
    references: [user.id],
  }),
}));
