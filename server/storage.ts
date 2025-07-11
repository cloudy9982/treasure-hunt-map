import { users, punchBoxProgress, type User, type InsertUser, type PunchBoxProgress, type InsertPunchBoxProgress } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserProgress(userId: number): Promise<PunchBoxProgress[]>;
  updateBoxProgress(userId: number, dayNumber: number, isOpened: boolean): Promise<PunchBoxProgress>;
  getBoxProgress(userId: number, dayNumber: number): Promise<PunchBoxProgress | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getUserProgress(userId: number): Promise<PunchBoxProgress[]> {
    return await db.select().from(punchBoxProgress).where(eq(punchBoxProgress.userId, userId));
  }

  async updateBoxProgress(userId: number, dayNumber: number, isOpened: boolean): Promise<PunchBoxProgress> {
    const existing = await this.getBoxProgress(userId, dayNumber);
    
    if (existing) {
      const [updated] = await db
        .update(punchBoxProgress)
        .set({ 
          isOpened, 
          openedAt: isOpened ? new Date() : null 
        })
        .where(and(
          eq(punchBoxProgress.userId, userId),
          eq(punchBoxProgress.dayNumber, dayNumber)
        ))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(punchBoxProgress)
        .values({
          userId,
          dayNumber,
          isOpened,
          openedAt: isOpened ? new Date() : null
        })
        .returning();
      return created;
    }
  }

  async getBoxProgress(userId: number, dayNumber: number): Promise<PunchBoxProgress | undefined> {
    const [progress] = await db
      .select()
      .from(punchBoxProgress)
      .where(and(
        eq(punchBoxProgress.userId, userId),
        eq(punchBoxProgress.dayNumber, dayNumber)
      ));
    return progress || undefined;
  }
}

export const storage = new DatabaseStorage();
