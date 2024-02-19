/* eslint-disable import/no-cycle */

import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

import { type Project, projects } from "./projects";
import { type Source, sources } from "./sources";
import {
    type TransmissionConductorWithRelations,
    transmissionConductors,
} from "./transmissionConductors";
import {
    type TransmissionTowerWithRelations,
    transmissionTowers,
} from "./transmissionTowers";

export const transmissionLines = sqliteTable("transmission_lines", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => uuidv4()),
    name: text("name").notNull(),
    projectId: text("project_id")
        .notNull()
        .references(() => projects.id),
    fromSourceId: text("from_source_id")
        .notNull()
        .references(() => sources.id),
    toSourceId: text("to_source_id").references(() => sources.id),
});

export type TransmissionLine = typeof transmissionLines.$inferSelect;
export type NewTransmissionLine = typeof transmissionLines.$inferInsert;

export const transmissionLinesRelations = relations(
    transmissionLines,
    ({ one, many }) => ({
        fromSource: one(sources, {
            fields: [transmissionLines.fromSourceId],
            references: [sources.id],
        }),
        toSource: one(sources, {
            fields: [transmissionLines.toSourceId],
            references: [sources.id],
        }),
        project: one(projects, {
            fields: [transmissionLines.projectId],
            references: [projects.id],
        }),
        towers: many(transmissionTowers),
        conductors: many(transmissionConductors),
    })
);

export type TransmissionLineWithRelations = TransmissionLine & {
    fromSource: Source;
    toSource: Source;
    project: Project;
    towers: TransmissionTowerWithRelations[];
    conductors: TransmissionConductorWithRelations[];
};
