import { z } from "zod";

import { baseElementSchema } from "./base";

import { unitsSchema } from "@/enums";

export const opendssLineSpacingSchema = baseElementSchema.extend({
    nConds: z.number(),
    nPhases: z.number(),
    x: z.number().array(),
    h: z.number().array(),
    units: unitsSchema.optional(),
});

export type OpenDSSLineSpacing = z.infer<typeof opendssLineSpacingSchema>;
