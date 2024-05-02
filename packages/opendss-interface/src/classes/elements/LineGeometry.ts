import BaseElement from "./BaseElement";
import {
    type LineGeometryInput,
    type OpenDSSLineGeometry,
    arrayTransform,
    booleanTransform,
    lineGeometrySchema,
    numberTransform,
} from "@/schemas";

export default class LineGeometry extends BaseElement<
    LineGeometryInput,
    OpenDSSLineGeometry
> {
    values;

    type = "LineGeometry";

    parameters = [
        "nconds",
        "nphases",
        "cond",
        "wire",
        "x",
        "h",
        "units",
        "normAmps",
        "emergAmps",
        "reduce",
        "spacing",
        "wires",
        "cncable",
        "tscable",
        "cncables",
        "tscables",
        "seasons",
        "ratings",
        "lineType",
    ] as const satisfies (keyof OpenDSSLineGeometry)[];

    constructor(input: LineGeometryInput) {
        super();
        this.values = lineGeometrySchema.parse(input);
    }

    transform() {
        return {
            name: `LineGeometry.${this.values.name}`,
            nconds: numberTransform(this.values.nconds),
            nphases: numberTransform(this.values.nphases),
            cond: numberTransform(this.values.cond),
            wire: this.values.wire,
            x: numberTransform(this.values.x),
            h: numberTransform(this.values.h),
            units: this.values.units,
            normAmps: numberTransform(this.values.normAmps),
            emergAmps: numberTransform(this.values.emergAmps),
            reduce: booleanTransform(this.values.reduce),
            spacing: this.values.spacing?.values.name,
            wires: arrayTransform(
                this.values.wires?.map((wire) => wire.values.name)
            ),
            cncable: this.values.cncable,
            tscable: this.values.tscable,
            cncables: arrayTransform(this.values.cncables),
            tscables: arrayTransform(this.values.tscables),
            seasons: numberTransform(this.values.seasons),
            ratings: arrayTransform(this.values.ratings),
            lineType: this.values.lineType,
        };
    }
}
