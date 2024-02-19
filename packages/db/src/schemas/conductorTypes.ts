/* eslint-disable import/no-cycle */

import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { transmissionConductors } from "./transmissionConductors";

export const conductorTypes = sqliteTable("conductor_types", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    surfaceArea: real("surface_area"),
    stranding: text("stranding"),
    outerDiameter: real("outer_diameter").notNull(),
    coreDiameter: real("core_diameter"),
    layers: real("layers"),
    currentCapacity: real("current_capacity"),
    dcResistance25: real("dc_resistance_25"),
    acResistance25: real("ac_resistance_25"),
    acResistance50: real("ac_resistance_50"),
    acResistance75: real("ac_resistance_75").notNull(),
    gmr: real("gmr").notNull(),
});

export type ConductorType = typeof conductorTypes.$inferSelect;
export type NewConductorType = typeof conductorTypes.$inferInsert;

export const conductorTypesRelations = relations(
    conductorTypes,
    ({ many }) => ({
        conductors: many(transmissionConductors),
    })
);