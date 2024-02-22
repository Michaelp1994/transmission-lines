import GeneralElement from "@elements/BaseElements/GeneralElement";
import { UnitsEnum } from "@enums/enums";

import LineSpacingInterface from "./LineSpacingInterface";

/**   General  */
export default class LineSpacing
    extends GeneralElement
    implements LineSpacingInterface
{
    override readonly #type = "LineSpacing";

    readonly parameters: Array<keyof this> = [
        "nConds",
        "nPhases",
        "x",
        "h",
        "units",
        "like",
    ];

    nConds?: number;

    nPhases?: number;

    x?: number[];

    h?: number[];

    units?: UnitsEnum;

    constructor(options: LineSpacingInterface) {
        super(options);
        Object.assign(this, options);
    }
}
