import { z } from "zod";

import { baseElementSchema } from "./base";

export const openDssFaultSchema = baseElementSchema.extend({
    bus1: z.string().optional(),
    bus2: z.string().optional(),
    phases: z.number().optional(),
    r: z.number().optional(),
    "%stddev": z.number().optional(),
    gMatrix: z.number().array().optional(),
    onTime: z.number().optional(),
    temporary: z.boolean().optional(),
    minAmps: z.number().optional(),
    normAmps: z.number().optional(),
    emergAmps: z.number().optional(),
    faultRate: z.number().optional(),
    pctperm: z.number().optional(),
    repair: z.number().optional(),
    baseFreq: z.number().optional(),
    enabled: z.boolean().optional(),
});

export type OpenDSSFault = z.infer<typeof openDssFaultSchema>;
