import { Vsource } from "@elements/Vsource";
import VsourceInterface from "@elements/Vsource/VsourceInterface";

/**   Circuit Element, PC Element  */
export default class Circuit extends Vsource {
    override _type = "Circuit";

    constructor(options: VsourceInterface) {
        super(options);
        Object.assign(this, options);
    }
}
