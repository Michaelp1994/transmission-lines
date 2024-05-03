import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { towerGeometries } from "./towerGeometries";
import { transmissionLines } from "./transmissionLines";

export const transmissionTowers = sqliteTable("transmission_towers", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => uuidv4()),
    name: text("name").notNull(),
    resistance: integer("resistance").notNull(),
    distance: integer("distance").notNull(),
    geometryId: text("geometryId")
        .notNull()
        .references(() => towerGeometries.id),
    lineId: text("transmission_line_id")
        .notNull()
        .references(() => transmissionLines.id),
});

export type TransmissionTower = typeof transmissionTowers.$inferSelect;
export type NewTransmissionTower = typeof transmissionTowers.$inferInsert;

export const transmissionTowersRelations = relations(
    transmissionTowers,
    ({ one }) => {
        return {
            transmissionLine: one(transmissionLines, {
                fields: [transmissionTowers.lineId],
                references: [transmissionLines.id],
            }),
            geometry: one(towerGeometries, {
                fields: [transmissionTowers.geometryId],
                references: [towerGeometries.id],
            }),
        };
    }
);
