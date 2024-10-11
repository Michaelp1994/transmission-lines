import { z } from "zod";

import { baseElementSchema } from "./base";
import { unitsSchema } from "./enums";

export const lineSpacingSchema = baseElementSchema.extend({
    nConds: z.number().optional(),
    nPhases: z.number().optional(),
    x: z.number().array().optional(),
    h: z.number().array().optional(),
    units: unitsSchema.optional(),
});

export type LineSpacingInput = z.infer<typeof lineSpacingSchema>;

export const opendssLineSpacingSchema = baseElementSchema.extend({
    nConds: z.string().optional(),
    nPhases: z.string().optional(),
    x: z.string().optional(),
    h: z.string().optional(),
    units: unitsSchema.optional(),
});

export type OpenDSSLineSpacing = z.infer<typeof opendssLineSpacingSchema>;
