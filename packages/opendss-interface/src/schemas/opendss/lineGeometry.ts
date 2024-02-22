import { z } from "zod";

import { baseElementSchema } from "./base";

import { unitsSchema } from "@/enums";

export const opendssLineGeometrySchema = baseElementSchema.extend({
    nconds: z.number().optional(),
    nphases: z.number().optional(),
    cond: z.number().optional(),
    wire: z.string().optional(),
    x: z.number().optional(),
    h: z.number().optional(),
    units: unitsSchema.optional(),
    normAmps: z.number().optional(),
    emergAmps: z.number().optional(),
    reduce: z.boolean().optional(),
    spacing: z.string().optional(),
    wires: z.string().array().optional(),
    cncable: z.string().optional(),
    tscable: z.string().optional(),
    cncables: z.string().array().optional(),
    tscables: z.string().array().optional(),
    Seasons: z.number().optional(),
    Ratings: z.number().array().optional(),
    LineType: z.string().optional(),
});

export type OpenDSSLineGeometry = z.infer<typeof opendssLineGeometrySchema>;
