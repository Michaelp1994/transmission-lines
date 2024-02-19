/* eslint-disable import/no-cycle */

import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { TowerGeometryWithRelations, towerGeometries } from "./towerGeometries";
import {
    TransmissionLineWithRelations,
    transmissionLines,
} from "./transmissionLines";

export const transmissionTowers = sqliteTable("transmission_towers", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    resistance: integer("resistance").notNull(),
    distance: integer("distance").notNull(),
    geometryId: integer("geometryId")
        .notNull()
        .references(() => towerGeometries.id),
    transmissionLineId: integer("transmission_line_id")
        .notNull()
        .references(() => transmissionLines.id),
});

export type TransmissionTower = typeof transmissionTowers.$inferSelect;
export type NewTransmissionTower = typeof transmissionTowers.$inferInsert;

export const transmissionTowersRelations = relations(
    transmissionTowers,
    ({ one }) => ({
        transmissionLine: one(transmissionLines, {
            fields: [transmissionTowers.transmissionLineId],
            references: [transmissionLines.id],
        }),
        geometry: one(towerGeometries, {
            fields: [transmissionTowers.geometryId],
            references: [towerGeometries.id],
        }),
    })
);

export type TransmissionTowerWithRelations = TransmissionTower & {
    transmissionLine: TransmissionLineWithRelations;
    geometry: TowerGeometryWithRelations;
};
