import { z } from "zod";

import { baseElementSchema } from "./base";

import { unitsSchema } from "@/enums";

export const opendssLineCodeSchema = baseElementSchema.extend({
    nphases: z.number().optional(),
    r1: z.number().optional(),
    x1: z.number().optional(),
    r0: z.number().optional(),
    x0: z.number().optional(),
    C1: z.number().optional(),
    C0: z.number().optional(),
    units: unitsSchema.optional(),
    rmatrix: z.number().array().optional(),
    xmatrix: z.number().array().optional(),
    cMatrix: z.number().array().optional(),
    baseFreq: z.number().optional(),
    normAmps: z.number().optional(),
    emergAmps: z.number().optional(),
    faultRate: z.number().optional(),
    pctperm: z.number().optional(),
    repair: z.number().optional(),
    kron: z.boolean().optional(),
    rg: z.number().optional(),
    xg: z.number().optional(),
    rho: z.number().optional(),
    neutral: z.number().optional(),
    b1: z.number().optional(),
    b0: z.number().optional(),
    seasons: z.number().optional(),
    ratings: z.number().array().optional(),
    lineType: z.string().optional(),
});

export type OpenDSSLineCode = z.infer<typeof opendssLineCodeSchema>;
