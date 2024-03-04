import BaseElement from "./BaseElement";

import {
    FaultInput,
    OpenDSSFault,
    arrayTransform,
    booleanTransform,
    busTransform,
    faultSchema,
    numberTransform,
} from "@/schemas";

export default class Fault extends BaseElement<FaultInput, OpenDSSFault> {
    type = "Fault";

    values;

    parameters = [
        "bus1",
        "bus2",
        "phases",
        "r",
        "%stddev",
        "gMatrix",
        "onTime",
        "temporary",
        "minAmps",
        "normAmps",
        "emergAmps",
        "faultRate",
        "pctperm",
        "repair",
        "baseFreq",
        "enabled",
    ] satisfies Array<keyof OpenDSSFault>;

    constructor(input: FaultInput) {
        super();
        this.values = faultSchema.parse(input);
    }

    transform() {
        return {
            name: `Fault.${this.values.name}`,
            bus1: busTransform(this.values.bus1),
            bus2: busTransform(this.values.bus2),
            phases: numberTransform(this.values.phases),
            r: numberTransform(this.values.r),
            "%stddev": numberTransform(this.values["%stddev"]),
            gMatrix: arrayTransform(this.values.gMatrix),
            onTime: numberTransform(this.values.onTime),
            temporary: booleanTransform(this.values.temporary),
            minAmps: numberTransform(this.values.minAmps),
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
