import { z } from "zod";

import { baseElementSchema } from "./base";
import { busSchema } from "../common/bus";

import { connSchema } from "@/enums";

export const reactorSchema = baseElementSchema.extend({
    bus1: busSchema.optional(),
    bus2: busSchema.optional(),
    phases: z.number().optional(),
    kvar: z.number().optional(),
    kv: z.number().optional(),
    conn: connSchema.optional(),
    rMatrix: z.number().array().optional(),
    xMatrix: z.number().array().optional(),
    parallel: z.boolean().optional(),
    r: z.number().optional(),
    x: z.number().optional(),
    rp: z.number().optional(),
    z1: z.number().array().optional(),
    z2: z.number().array().optional(),
    z0: z.number().array().optional(),
    z: z.number().array().optional(),
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

export type ReactorInput = z.infer<typeof reactorSchema>;
