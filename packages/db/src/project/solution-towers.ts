import { randomUUID } from "crypto";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { solutions } from "./solutions";
import { transmissionTowers } from "./transmissionTowers";

export const solutionTowers = sqliteTable("solution_towers", {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    solutionId: text()
        .notNull()
        .references(() => solutions.id),
    towerId: text()
        .notNull()
        .references(() => transmissionTowers.id),
    currentIn: integer().notNull(),
    currentOut: integer().notNull(),
});

export type SolutionTower = typeof solutionTowers.$inferSelect;
export type NewSolutionTower = typeof solutionTowers.$inferInsert;
