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