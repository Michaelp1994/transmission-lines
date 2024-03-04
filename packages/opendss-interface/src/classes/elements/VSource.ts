import BaseElement from "./BaseElement";

import {
    OpenDSSVSource,
    VSourceInput,
    arrayTransform,
    booleanTransform,
    busTransform,
    numberTransform,
    vSourceSchema,
} from "@/schemas";

export default class VSource extends BaseElement<VSourceInput, OpenDSSVSource> {
    values: VSourceInput;

    type = "VSource";

    parameters = [
        "bus1",
        "basekv",
        "pu",
        "angle",
        "frequency",
        "phases",
        "MVAsc3",
        "MVAsc1",
        "x1r1",
        "x0r0",
        "isc3",
        "isc1",
        "r1",
        "x1",
        "r0",
        "x0",
        "scanType",
        "sequence",
        "bus2",
        "z1",
        "z0",
        "z2",
        "puZ1",
        "puZ0",
        "puZ2",
        "baseMVA",
        "yearly",
        "daily",
        "duty",
        "model",
        "puZideal",
        "spectrum",
        "baseFreq",
        "enabled",
    ] as const satisfies Array<keyof OpenDSSVSource>;

    constructor(input: VSourceInput) {
        super();
        this.values = vSourceSchema.parse(input);
    }

    transform() {
        return {
            name: this.values.circuit
                ? `Circuit.${this.values.name}`
                : `Vsource.${this.values.name}`,
            bus1: busTransform(this.values.bus1),
            basekv: numberTransform(this.values.basekv),
            pu: numberTransform(this.values.pu),
            angle: numberTransform(this.values.angle),
            frequency: numberTransform(this.values.frequency),
            phases: numberTransform(this.values.phases),
            MVAsc3: numberTransform(this.values.MVAsc3),
            MVAsc1: numberTransform(this.values.MVAsc1),
            x1r1: numberTransform(this.values.x1r1),
            x0r0: numberTransform(this.values.x0r0),
            isc3: numberTransform(this.values.isc3),
            isc1: numberTransform(this.values.isc1),
            r1: numberTransform(this.values.r1),
            x1: numberTransform(this.values.x1),
            r0: numberTransform(this.values.r0),
            x0: numberTransform(this.values.x0),
            scanType: this.values.scanType,
            sequence: this.values.sequence,
            bus2: busTransform(this.values.bus2),
            z1: arrayTransform(this.values.z1),
            z0: arrayTransform(this.values.z0),
            z2: arrayTransform(this.values.z2),
            puZ1: arrayTransform(this.values.puZ1),
            puZ0: arrayTransform(this.values.puZ0),
            puZ2: arrayTransform(this.values.puZ2),
            baseMVA: numberTransform(this.values.baseMVA),
            yearly: this.values.yearly,
            daily: this.values.daily,
            duty: this.values.duty,
            model: this.values.model,
            puZideal: arrayTransform(this.values.puZideal),
            spectrum: this.values.spectrum,
            baseFreq: numberTransform(this.values.baseFreq),
            enabled: booleanTransform(this.values.enabled),
        };
    }
}
