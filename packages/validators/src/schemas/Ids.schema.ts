import * as z from "zod";

export const sourceId = z.string().uuid();
export const projectId = z.string().uuid();
export const lineId = z.string().uuid();
export const geometryId = z.string().uuid();
export const conductorTypeId = z.string().uuid();
export const conductorId = z.string().uuid();
export const towerId = z.string().uuid();

export type SourceID = z.infer<typeof sourceId>;
export type ProjectID = z.infer<typeof projectId>;
export type LineID = z.infer<typeof lineId>;
export type GeometryID = z.infer<typeof geometryId>;
export type ConductorTypeID = z.infer<typeof conductorTypeId>;
export type ConductorID = z.infer<typeof conductorId>;
export type TowerID = z.infer<typeof towerId>;
