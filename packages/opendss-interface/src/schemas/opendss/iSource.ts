import { z } from "zod";

import { baseElementSchema } from "./base";

import { scanTypeSchema, sequenceSchema } from "@/enums";

export const openDssISourceSchema = baseElementSchema.extend({
    bus1: z.string().optional(),
    amps: z.number().optional(),
    angle: z.number().optional(),
    frequency: z.number().optional(),
    phases: z.number().optional(),
    scanType: scanTypeSchema.optional(),
    sequence: sequenceSchema.optional(),
    yearly: z.string().optional(),
    daily: z.string().optional(),
    duty: z.string().optional(),
    bus2: z.string().optional(),
    spectrum: z.string().optional(),
    baseFreq: z.number().optional(),
    enabled: z.boolean().optional(),
});

export type OpenDSSISource = z.infer<typeof openDssISourceSchema>;
