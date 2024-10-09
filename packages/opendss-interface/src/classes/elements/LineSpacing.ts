import {
    arrayTransform,
    type LineSpacingInput,
    lineSpacingSchema,
    numberTransform,
    type OpenDSSLineSpacing,
} from "@/schemas";

import BaseElement from "./BaseElement";

export default class LineSpacing extends BaseElement<
    LineSpacingInput,
    OpenDSSLineSpacing
> {
    parameters = [
        "nConds",
        "nPhases",
        "x",
        "h",
        "units",
    ] satisfies (keyof OpenDSSLineSpacing)[];

    type = "LineSpacing";

    values;

    constructor(input: LineSpacingInput) {
        super();
        this.values = lineSpacingSchema.parse(input);
    }

    transform() {
        return {
            name: `LineSpacing.${this.values.name}`,
            nConds: numberTransform(this.values.nConds),
            nPhases: numberTransform(this.values.nPhases),
            x: arrayTransform(this.values.x),
            h: arrayTransform(this.values.h),
            units: this.values.units,
        };
    }
}
