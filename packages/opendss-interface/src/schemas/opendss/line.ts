import { z } from "zod";

import { baseElementSchema } from "./base";

import { earthModelSchema, unitsSchema } from "@/enums";

export const opendssLineSchema = baseElementSchema.extend({
    bus1: z.string().optional(),
    bus2: z.string().optional(),
    lineCode: z.string().optional(),
    length: z.number().optional(),
    phases: z.number().optional(),
    r1: z.number().optional(),
    x1: z.number().optional(),
    r0: z.number().optional(),
    x0: z.number().optional(),
    c1: z.number().optional(),
    c0: z.number().optional(),
    rMatrix: z.number().array().optional(),
    xMatrix: z.number().array().optional(),
    cMatrix: z.number().array().optional(),
    switch: z.boolean().optional(),
    rg: z.number().optional(),
    xg: z.number().optional(),
    rho: z.number().optional(),
    geometry: z.string().optional(),
    units: unitsSchema.optional(),
    spacing: z.string().optional(),
    wires: z.string().array().optional(),
    earthModel: earthModelSchema.optional(),
    cnCables: z.string().array().optional(),
    tsCables: z.string().array().optional(),
    b1: z.number().optional(),
    b0: z.number().optional(),
    seasons: z.number().optional(),
    ratings: z.number().array().optional(),
    lineType: z.string().optional(),
    normAmps: z.number().optional(),
    emergAmps: z.number().optional(),
    faultRate: z.number().optional(),
    pctperm: z.number().optional(),
    repair: z.number().optional(),
    baseFreq: z.number().optional(),
    enabled: z.boolean().optional(),
});

export type OpenDSSLine = z.infer<typeof opendssLineSchema>;
