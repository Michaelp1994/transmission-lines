/* eslint-disable import/no-cycle */

import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { ConductorType, conductorTypes } from "./conductorTypes";
import { TransmissionLine, transmissionLines } from "./transmissionLines";

export const transmissionConductors = sqliteTable("transmission_conductors", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    fromPhase: integer("from_phase").notNull(),
    toPhase: integer("to_phase").notNull(),
    bundleNumber: integer("bundle_number").notNull(),
    bundleSpacing: integer("bundle_spacing").notNull(),
    isNeutral: integer("isNeutral", { mode: "boolean" }).notNull(),
    typeId: integer("type_id")
        .notNull()
        .references(() => conductorTypes.id),
    transmissionLineId: text("transmission_line_id")
        .notNull()
        .references(() => transmissionLines.id),
});

export type TransmissionConductor = typeof transmissionConductors.$inferSelect;
export type NewTransmissionConductor =
    typeof transmissionConductors.$inferInsert;

export const transmissionConductorsRelations = relations(
    transmissionConductors,
    ({ one }) => ({
        type: one(conductorTypes, {
            fields: [transmissionConductors.typeId],
            references: [conductorTypes.id],
        }),
        transmissionLine: one(transmissionLines, {
            fields: [transmissionConductors.transmissionLineId],
            references: [transmissionLines.id],
        }),
    })
);

export type TransmissionConductorWithRelations = TransmissionConductor & {
    type: ConductorType;
    transmissionLine: TransmissionLine;
};
