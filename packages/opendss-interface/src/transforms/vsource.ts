import { modelSchema, scanTypeSchema, sequenceSchema } from "@enums/parameters";
import { z } from "zod";

import { arrayTransform, booleanTransform, busTransform } from "./basic";

import { busSchema } from "@/schemas";

export const vsourceTransformer = z.object({
    bus1: busSchema.transform(busTransform).optional(),
    basekv: z.number().transform(String).optional(),
    pu: z.number().transform(String).optional(),
    angle: z.number().transform(String).optional(),
    frequency: z.number().transform(String).optional(),
    phases: z.number().transform(String).optional(),
    MVAsc3: z.number().transform(String).optional(),
    MVAsc1: z.number().transform(String).optional(),
    x1r1: z.number().transform(String).optional(),
    x0r0: z.number().transform(String).optional(),
    isc3: z.number().transform(String).optional(),
    isc1: z.number().transform(String).optional(),
    r1: z.number().transform(String).optional(),
    x1: z.number().transform(String).optional(),
    r0: z.number().transform(String).optional(),
    x0: z.number().transform(String).optional(),
    scanType: scanTypeSchema.optional(),
    sequence: sequenceSchema.optional(),
    bus2: busSchema.transform(busTransform).optional(),
    z1: z.number().array().transform(arrayTransform).optional(),
    z0: z.number().array().transform(arrayTransform).optional(),
    z2: z.number().array().transform(arrayTransform).optional(),
    puZ1: z.number().array().transform(arrayTransform).optional(),
    puZ0: z.number().array().transform(arrayTransform).optional(),
    puZ2: z.number().array().transform(arrayTransform).optional(),
    baseMVA: z.number().optional(),
    yearly: z.string().optional(),
    daily: z.string().optional(),
    duty: z.string().optional(),
    model: modelSchema.optional(),
    puZideal: z.number().array().transform(arrayTransform).optional(),
    spectrum: z.string().optional(),
    baseFreq: z.number().optional(),
    enabled: z.boolean().transform(booleanTransform).optional(),
});

export type VSourceInput = z.input<typeof vsourceTransformer>;
export type OpenDSSVSource = z.output<typeof vsourceTransformer>;
