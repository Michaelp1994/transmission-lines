import { connSchema } from "@enums/index";
import { z } from "zod";

// import { arrayTransform, booleanTransform, busTransform } from "./basic";

import { Bus, reactorSchema } from "@/schemas";

const arrayTransform = (input?: Array<string | number>) =>
    input ? `[${input.join(" ")}]` : undefined;
const booleanTransform = (input?: boolean) => {
    if (input === undefined) return undefined;
    return input ? "true" : "false";
};
const busTransform = (input?: Bus) =>
    input ? `${input.name}.${input.phases.join(".")}` : undefined;

const input = reactorSchema.shape;

export const reactorTransformer = z.object({
    bus1: input.bus1.transform(busTransform),
    bus2: input.bus2.transform(busTransform),
    phases: input.phases.transform(String),
    kvar: input.kvar,
    kv: input.kv.transform(String),
    conn: connSchema,
    rMatrix: input.rMatrix.transform(arrayTransform),
    xMatrix: input.xMatrix.transform(arrayTransform),
    parallel: input.parallel.transform(booleanTransform),
    r: input.r.transform(String),
    x: input.x.transform(String),
    rp: input.rp.transform(String),
    z1: input.z1.transform(arrayTransform),
    z2: input.z2.transform(arrayTransform),
    z0: input.z0.transform(arrayTransform),
    z: input.z.transform(arrayTransform),
    rCurve: input.rCurve,
    lCurve: input.lCurve,
    lmH: input.lmH.transform(String),
    normAmps: input.normAmps.transform(String),
    emergAmps: input.emergAmps.transform(String),
    faultRate: input.faultRate.transform(String),
    pctperm: input.pctperm.transform(String),
    repair: input.repair.transform(String),
    baseFreq: input.baseFreq.transform(String),
    enabled: input.enabled.transform(booleanTransform),
});

// export const reactorTransformer = z.object({
//     bus1: busSchema.transform(busTransform).optional(),
//     bus2: busSchema.transform(busTransform).optional(),
//     phases: z.number().transform(String).optional(),
//     kvar: z.number().transform(String).optional(),
//     kv: z.number().transform(String).optional(),
//     conn: connSchema.optional(),
//     rMatrix: z.number().array().transform(arrayTransform).optional(),
//     xMatrix: z.number().array().transform(arrayTransform).optional(),
//     parallel: z.boolean().transform(booleanTransform).optional(),
//     r: z.number().transform(String).optional(),
//     x: z.number().transform(String).optional(),
//     rp: z.number().transform(String).optional(),
//     z1: z.number().array().transform(arrayTransform).optional(),
//     z2: z.number().array().transform(arrayTransform).optional(),
//     z0: z.number().array().transform(arrayTransform).optional(),
//     z: z.number().array().transform(arrayTransform).optional(),
//     rCurve: z.string().optional(),
//     lCurve: z.string().optional(),
//     lmH: z.number().transform(String).optional(),
//     normAmps: z.number().transform(String).optional(),
//     emergAmps: z.number().transform(String).optional(),
//     faultRate: z.number().transform(String).optional(),
//     pctperm: z.number().transform(String).optional(),
//     repair: z.number().transform(String).optional(),
//     baseFreq: z.number().transform(String).optional(),
//     enabled: z.boolean().transform(booleanTransform).optional(),
// });

export type ReactorInput = z.input<typeof reactorTransformer>;
export type OpenDSSReactor = z.output<typeof reactorTransformer>;
