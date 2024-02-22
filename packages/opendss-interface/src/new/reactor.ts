import { ConnEnum } from "@enums/index";
import splitStringsIntoRows from "@helpers/splitArray";

import BaseElement from "./base";

import { Bus, ReactorInput, reactorSchema } from "@/schemas";
import { reactorTransformer } from "@/transforms/reactor";

const parameters = [
    "bus1",
    "bus2",
    "phases",
    "kvar",
    "kv",
    "conn",
    "rMatrix",
    "xMatrix",
    "parallel",
    "r",
    "x",
    "rp",
    "z1",
    "z2",
    "z0",
    "z",
    "rCurve",
    "lCurve",
    "lmH",
    "normAmps",
    "emergAmps",
    "faultRate",
    "pctperm",
    "repair",
    "baseFreq",
    "enabled",
] as const;

export default class Reactor extends BaseElement {
    // static override type = "Reactor";

    name: string;

    bus1?: Bus;

    bus2?: Bus;

    phases?: number;

    kvar?: number;

    kv?: number;

    conn?: ConnEnum;

    rMatrix?: number[];

    xMatrix?: number[];

    parallel?: boolean;

    r?: number;

    x?: number;

    rp?: number;

    z1?: number[];

    z2?: number[];

    z0?: number[];

    z?: number[];

    rCurve?: string;

    lCurve?: string;

    lmH?: number;

    normAmps?: number;

    emergAmps?: number;

    faultRate?: number;

    pctperm?: number;

    repair?: number;

    baseFreq?: number;

    enabled?: boolean;

    constructor(input: ReactorInput) {
        super();
        const values = reactorSchema.parse(input);
        this.name = values.name;
        Object.assign(this, values);
    }

    create() {
        const values = reactorTransformer.parse(this);
        const script = [`New Reactor.${this.name}`];
        parameters.forEach((key) => {
            if (values[key] === undefined) return;
            const name = String(key).toLowerCase();
            const value = values[key];
            script.push(`${name}=${value}`);
        });
        return splitStringsIntoRows(script);
    }
}
