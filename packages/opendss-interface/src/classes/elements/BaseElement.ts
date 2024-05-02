import { v4 as uuidv4 } from "uuid";
import splitStringsIntoRows from "@helpers/splitArray";
import type {
    BaseElementInput,
    OpenDSSBaseElement,
} from "@/schemas/elements/base";

export default abstract class BaseElement<
    I extends BaseElementInput = BaseElementInput & { [key: string]: any },
    O extends OpenDSSBaseElement = OpenDSSBaseElement & { [key: string]: any },
> {
    // abstract name: string;
    abstract values: I;

    id: string;

    protected abstract type: string;

    protected abstract parameters: (keyof O)[];

    getFullName() {
        return `${this.type}.${this.values.name}`;
    }

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
    abstract transform(): O;
}
