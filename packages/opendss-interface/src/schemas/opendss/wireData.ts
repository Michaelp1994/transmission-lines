import { z } from "zod";

import { baseElementSchema } from "./base";

import { allUnitsSchema, unitsSchema } from "@/enums";

export const opendssWireDataSchema = baseElementSchema.extend({
    rdc: z.number().optional(),
    rac: z.number().optional(),
    rUnits: unitsSchema.optional(),
    gmrac: z.number().optional(),
    gmrUnits: allUnitsSchema.optional(),
    radius: z.number().optional(),
    radUnits: allUnitsSchema.optional(),
    normAmps: z.number().optional(),
    emergAmps: z.number().optional(),
    diam: z.number().optional(),
    seasons: z.number().optional(),
    ratings: z.number().array().optional(),
    capRadius: z.number().optional(),
});

export type OpenDSSWireData = z.infer<typeof opendssWireDataSchema>;
