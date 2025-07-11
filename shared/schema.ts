import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const punchBoxProgress = pgTable("punch_box_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  dayNumber: integer("day_number").notNull(),
  isOpened: boolean("is_opened").default(false),
  openedAt: timestamp("opened_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPunchBoxProgressSchema = createInsertSchema(punchBoxProgress).pick({
  userId: true,
  dayNumber: true,
  isOpened: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPunchBoxProgress = z.infer<typeof insertPunchBoxProgressSchema>;
export type PunchBoxProgress = typeof punchBoxProgress.$inferSelect;
