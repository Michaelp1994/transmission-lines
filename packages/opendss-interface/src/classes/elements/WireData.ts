import {
    arrayTransform,
    numberTransform,
    type OpenDSSWireData,
    type WireDataInput,
    wireDataSchema,
} from "@/schemas";

import BaseElement from "./BaseElement";

export default class WireData extends BaseElement<
    WireDataInput,
    OpenDSSWireData
> {
    parameters = [
        "rdc",
        "rac",
        "rUnits",
        "gmrac",
        "gmrUnits",
        "radius",
        "radUnits",
        "normAmps",
        "emergAmps",
        "diam",
        "seasons",
        "ratings",
        "capRadius",
    ] as const satisfies (keyof OpenDSSWireData)[];

    type = "WireData";

    values;

    constructor(input: WireDataInput) {
        super();
        this.values = wireDataSchema.parse(input);
    }

    transform() {
        return {
            name: `WireData.${this.values.name}`,
            rdc: numberTransform(this.values.rdc),
            rac: numberTransform(this.values.rac),
            rUnits: this.values.rUnits,
            gmrac: numberTransform(this.values.gmrac),
            gmrUnits: this.values.gmrUnits,
            radius: numberTransform(this.values.radius),
            radUnits: this.values.radUnits,
            normAmps: numberTransform(this.values.normAmps),
            emergAmps: numberTransform(this.values.emergAmps),
            diam: numberTransform(this.values.diam),
            seasons: numberTransform(this.values.seasons),
            ratings: arrayTransform(this.values.ratings),
            capRadius: numberTransform(this.values.capRadius),
        };
    }
}
