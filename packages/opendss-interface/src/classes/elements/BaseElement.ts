import type {
    BaseElementInput,
    OpenDSSBaseElement,
} from "@/schemas/elements/base";

import splitStringsIntoRows from "@helpers/splitArray";
import { v4 as uuidv4 } from "uuid";

export default abstract class BaseElement<
    I extends BaseElementInput = BaseElementInput & Record<string, any>,
    O extends OpenDSSBaseElement = OpenDSSBaseElement & Record<string, any>,
> {
    protected abstract parameters: (keyof O)[];

    protected abstract type: string;

    id: string;

    // abstract name: string;
    abstract values: I;

    constructor() {
        this.id = uuidv4();
    }

    create() {
        const output = this.transform();
        const script: string[] = [`New ${output.name}`];

        this.parameters.forEach((key) => {
            if (key in output && output[key] !== undefined) {
                // @ts-expect-error FIXME: Can't specify that the keyof O is only a string
                const parameter = key.toLowerCase();
                const value = output[key];

                script.push(`${parameter}=${value}`);
            }
        });

        return splitStringsIntoRows(script);
    }

    getFullName() {
        return `${this.type}.${this.values.name}`;
    }
    abstract transform(): O;
}
