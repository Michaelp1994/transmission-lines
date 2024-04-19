/* eslint-disable import/no-cycle */

import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

import { sources } from "./sources";
import { transmissionLines } from "./transmissionLines";

export const projects = sqliteTable("projects", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => uuidv4()),
    name: text("name").notNull().unique(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export const projectsRelations = relations(projects, ({ many }) => ({
    sources: many(sources),
    transmissionLines: many(transmissionLines),
}));
