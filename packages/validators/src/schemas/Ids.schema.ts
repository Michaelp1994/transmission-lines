import * as z from "zod";

export const sourceId = z.string().uuid();
export const projectId = z.string().uuid();
export const lineId = z.string().uuid();
export const geometryId = z.number();
export const conductorTypeId = z.number();
