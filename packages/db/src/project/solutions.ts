import { randomUUID } from "crypto";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const solutions = sqliteTable("solutions", {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    date: integer({ mode: "timestamp" }).notNull(), // Date()
});

export type Solution = typeof solutions.$inferSelect;
export type NewSolution = typeof solutions.$inferInsert;
