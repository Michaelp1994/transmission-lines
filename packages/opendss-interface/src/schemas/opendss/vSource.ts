import { z } from "zod";

import { baseElementSchema } from "./base";

import { modelSchema, scanTypeSchema, sequenceSchema } from "@/enums";

export const openDssVSourceSchema = baseElementSchema.extend({
    bus1: z.string().optional(),
    basekv: z.number().optional(),
    pu: z.number().optional(),
    angle: z.number().optional(),
    frequency: z.number().optional(),
    phases: z.number().optional(),
    MVAsc3: z.number().optional(),
    MVAsc1: z.number().optional(),
    x1r1: z.number().optional(),
    x0r0: z.number().optional(),
    isc3: z.number().optional(),
    isc1: z.number().optional(),
    r1: z.number().optional(),
    x1: z.number().optional(),
    r0: z.number().optional(),
    x0: z.number().optional(),
    scanType: scanTypeSchema.optional(),
    sequence: sequenceSchema.optional(),
    bus2: z.string().optional(),
    z1: z.number().array().optional(),
    z0: z.number().array().optional(),
    z2: z.number().array().optional(),
    puZ1: z.number().array().optional(),
    puZ0: z.number().array().optional(),
    puZ2: z.number().array().optional(),
    baseMVA: z.number().optional(),
    yearly: z.string().optional(),
    daily: z.string().optional(),
    duty: z.string().optional(),
    model: modelSchema.optional(),
    puZideal: z.number().array().optional(),
    spectrum: z.string().optional(),
    baseFreq: z.number().optional(),
    enabled: z.boolean().optional(),
});

export type OpenDSSVSource = z.infer<typeof openDssVSourceSchema>;
