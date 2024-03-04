/* eslint-disable import/no-cycle */

import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const conductorMaterials = sqliteTable("conductor_types", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    relativePermeability: real("relativePermeability"), // FIXME: check spelling.
    er: real("er"), // FIXME: check spelling.
});

export type ConductorMaterial = typeof conductorMaterials.$inferSelect;
export type NewConductorMaterial = typeof conductorMaterials.$inferInsert;
