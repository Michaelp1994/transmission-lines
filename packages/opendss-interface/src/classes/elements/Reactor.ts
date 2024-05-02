import BaseElement from "./BaseElement";
import {
    type OpenDSSReactor,
    type ReactorInput,
    arrayTransform,
    booleanTransform,
    busTransform,
    numberTransform,
    reactorSchema,
} from "@/schemas";

export default class Reactor extends BaseElement<ReactorInput, OpenDSSReactor> {
    values;

    type = "Reactor";

    constructor(input: ReactorInput) {
        super();
        this.values = reactorSchema.parse(input);
    }

    parameters = [
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
    ] as const satisfies (keyof OpenDSSReactor)[];

    transform() {
        return {
            name: `Reactor.${this.values.name}`,
            bus1: busTransform(this.values.bus1),
            bus2: busTransform(this.values.bus2),
            phases: numberTransform(this.values.phases),
            kvar: numberTransform(this.values.kvar),
            kv: numberTransform(this.values.kv),
            conn: this.values.conn,
            rMatrix: arrayTransform(this.values.rMatrix),
            xMatrix: arrayTransform(this.values.xMatrix),
            parallel: booleanTransform(this.values.parallel),
            r: numberTransform(this.values.r),
            x: numberTransform(this.values.x),
            rp: numberTransform(this.values.rp),
            z1: arrayTransform(this.values.z1),
            z2: arrayTransform(this.values.z2),
            z0: arrayTransform(this.values.z0),
            z: arrayTransform(this.values.z),
            rCurve: this.values.rCurve,
            lCurve: this.values.lCurve,
            lmH: numberTransform(this.values.lmH),
            normAmps: numberTransform(this.values.normAmps),
            emergAmps: numberTransform(this.values.emergAmps),
            faultRate: numberTransform(this.values.faultRate),
            pctperm: numberTransform(this.values.pctperm),
            repair: numberTransform(this.values.repair),
            baseFreq: numberTransform(this.values.baseFreq),
            enabled: booleanTransform(this.values.enabled),
        };
    }
}
