import BaseElement from "./BaseElement";
import {
    type LineInput,
    type OpenDSSLine,
    arrayTransform,
    booleanTransform,
    busTransform,
    lineSchema,
    numberTransform,
} from "@/schemas";

export default class Line extends BaseElement<LineInput, OpenDSSLine> {
    values: LineInput;

    type = "Line";

    constructor(input: LineInput) {
        super();
        this.values = lineSchema.parse(input);
    }

    parameters = [
        "bus1",
        "bus2",
        "lineCode",
        "length",
        "phases",
        "r1",
        "x1",
        "r0",
        "x0",
        "c1",
        "c0",
        "rMatrix",
        "xMatrix",
        "cMatrix",
        "switch",
        "rg",
        "xg",
        "rho",
        "geometry",
        "units",
        "spacing",
        "wires",
        "earthModel",
        "cnCables",
        "tsCables",
        "b1",
        "b0",
        "seasons",
        "ratings",
        "lineType",
        "normAmps",
        "emergAmps",
        "faultRate",
        "pctperm",
        "repair",
        "baseFreq",
        "enabled",
    ] as const satisfies (keyof OpenDSSLine)[];

    transform() {
        return {
            name: `Line.${this.values.name}`,
            bus1: busTransform(this.values.bus1),
            bus2: busTransform(this.values.bus2),
            lineCode: this.values.lineCode,
            length: numberTransform(this.values.length),
            phases: numberTransform(this.values.phases),
            r1: numberTransform(this.values.r1),
            x1: numberTransform(this.values.x1),
            r0: numberTransform(this.values.r0),
            x0: numberTransform(this.values.x0),
            c1: numberTransform(this.values.c1),
            c0: numberTransform(this.values.c0),
            rMatrix: arrayTransform(this.values.rMatrix),
            xMatrix: arrayTransform(this.values.xMatrix),
            cMatrix: arrayTransform(this.values.cMatrix),
            switch: booleanTransform(this.values.switch),
            rg: numberTransform(this.values.rg),
            xg: numberTransform(this.values.xg),
            rho: numberTransform(this.values.rho),
            geometry: this.values.geometry?.values.name,
            units: this.values.units,
            spacing: this.values.spacing,
            wires: arrayTransform(this.values.wires),
            earthModel: this.values.earthModel,
            cnCables: arrayTransform(this.values.cnCables),
            tsCables: arrayTransform(this.values.tsCables),
            b1: numberTransform(this.values.b1),
            b0: numberTransform(this.values.b0),
            seasons: numberTransform(this.values.seasons),
            ratings: arrayTransform(this.values.ratings),
            lineType: this.values.lineType,
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
