import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `lost-in-the-web_${name}`);

export const leaderboard = createTable(
  "leaderboard",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    playerName: varchar("player_name", { length: 256 }).notNull(),
    score: integer("score").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (leaderboard) => ({
    scoreIndex: index("score_idx").on(leaderboard.score),
    nameIndex: index("name_idx").on(leaderboard.playerName),
  })
);

export const users = createTable(
  "users",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    playerName: varchar("player_name", { length: 256 }).notNull().unique(),
    email: varchar("email", { length: 256 }),
    isActive: integer("is_active").default(1).notNull(), // 1 = active, 0 = unregistered
    lastActive: timestamp("last_active", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (users) => ({
    nameIndex: index("user_name_idx").on(users.playerName),
    emailIndex: index("user_email_idx").on(users.email),
  })
);

export const userProgress = createTable(
  "user_progress",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: integer("user_id").references(() => users.id).notNull(),
    level: integer("level").notNull(),
    completed: integer("completed").default(0).notNull(), // 1 = completed, 0 = not completed
    score: integer("score").default(0).notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (userProgress) => ({
    userLevelIndex: index("user_level_idx").on(userProgress.userId, userProgress.level),
  })
);