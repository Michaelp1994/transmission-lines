/* eslint-disable import/no-cycle */

import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

import { Source, sources } from "./sources";
import {
    TransmissionLineWithRelations,
    transmissionLines,
} from "./transmissionLines";

export const projects = sqliteTable("projects", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => uuidv4()),
    name: text("name").notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export const projectsRelations = relations(projects, ({ many }) => ({
    sources: many(sources),
    transmissionLines: many(transmissionLines),
}));

export type ProjectWithRelations = Project & {
    sources: Source[];
    transmissionLines: TransmissionLineWithRelations[];
};
