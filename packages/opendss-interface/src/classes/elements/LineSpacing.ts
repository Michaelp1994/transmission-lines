import BaseElement from "./BaseElement";
import {
    type LineSpacingInput,
    type OpenDSSLineSpacing,
    arrayTransform,
    lineSpacingSchema,
    numberTransform,
} from "@/schemas";

export default class LineSpacing extends BaseElement<
    LineSpacingInput,
    OpenDSSLineSpacing
> {
    values;

    type = "LineSpacing";

    parameters = ["nConds", "nPhases", "x", "h", "units"] satisfies (keyof OpenDSSLineSpacing)[];

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
