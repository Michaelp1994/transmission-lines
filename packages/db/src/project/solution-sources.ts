import { randomUUID } from "crypto";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { solutions } from "./solutions";
import { sources } from "./sources";

export const solutionSources = sqliteTable("solution_sources", {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    solutionId: text()
        .notNull()
        .references(() => solutions.id),
    sourceId: text()
        .notNull()
        .references(() => sources.id),
    currentIn: integer().notNull(),
    currentOut: integer().notNull(),
});

export type SolutionSource = typeof solutionSources.$inferSelect;
export type NewSolutionSource = typeof solutionSources.$inferInsert;
