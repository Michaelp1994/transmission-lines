import { randomUUID } from "crypto";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { solutions } from "./solutions";
import { transmissionConductors } from "./transmissionConductors";

export const solutionConductors = sqliteTable("solution_conductors", {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    solutionId: text()
        .notNull()
        .references(() => solutions.id),
    conductorId: text()
        .notNull()
        .references(() => transmissionConductors.id),
    currentIn: integer().notNull(),
    currentOut: integer().notNull(),
});

export type SolutionConductor = typeof solutionConductors.$inferSelect;
export type NewSolutionConductor = typeof solutionConductors.$inferInsert;
