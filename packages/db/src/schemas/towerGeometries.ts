/* eslint-disable import/no-cycle */
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

import { conductorLocations } from "./conductorLocations";
import { transmissionTowers } from "./transmissionTowers";

export const towerGeometries = sqliteTable("tower_geometries", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => uuidv4()),
    name: text("name").notNull(),
});

export type TowerGeometry = typeof towerGeometries.$inferSelect;
export type NewTowerGeometry = typeof towerGeometries.$inferInsert;

export const towerGeometriesRelations = relations(
    towerGeometries,
    ({ many }) => ({
        towers: many(transmissionTowers),
        conductors: many(conductorLocations),
    })
);
