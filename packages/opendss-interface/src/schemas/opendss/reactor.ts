import { z } from "zod";

import { baseElementSchema } from "./base";

import { connSchema } from "@/enums";

export const opendssReactorSchema = baseElementSchema.extend({
    bus1: z.string().optional(),
    bus2: z.string().optional(),
    phases: z.number().optional(),
    kvar: z.number().optional(),
    kv: z.number().optional(),
    conn: connSchema.optional(),
    rMatrix: z.string().optional(),
    xMatrix: z.string().optional(),
    parallel: z.boolean().optional(),
    r: z.number().optional(),
    x: z.number().optional(),
    rp: z.number().optional(),
    z1: z.string().optional(),
    z2: z.string().optional(),
    z0: z.string().optional(),
    z: z.string().optional(),
    rCurve: z.string().optional(),
    lCurve: z.string().optional(),
    lmH: z.number().optional(),
    normAmps: z.number().optional(),
    emergAmps: z.number().optional(),
    faultRate: z.number().optional(),
    pctperm: z.number().optional(),
    repair: z.number().optional(),
    baseFreq: z.number().optional(),
    enabled: z.boolean().optional(),
});

export type OpenDSSReactor = z.infer<typeof opendssReactorSchema>;
