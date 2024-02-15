import splitStringsIntoRows from "@helpers/splitArray";

import BaseElementInterface from "./BaseElementInterface";

export default abstract class BaseElement implements BaseElementInterface {
    /** Type of Component
     * @ignore
     */
    abstract _type: string;

    /** Name of the component */
    name: string;

    /** Electrical Parameters for Component */
    abstract parameters: Array<string | number | symbol>;

    /** Make like another object, e.g.:
     *
     * New Capacitor.C2 like=c1  ... */
    like?: string;

    constructor(options: BaseElementInterface) {
        this.name = options.name;
    }

    create() {
        const script = [`New ${this._type}.${this.name}`];
        this.parameters.forEach((key) => {
            // @ts-expect-error
            if (this[key] !== undefined) {
                // @ts-expect-error
                const value = this[key];
                if (Array.isArray(value)) {
                    const values = value.join(" ");
                    script.push(`${String(key).toLowerCase()}=[${values}]`);
                } else {
                    script.push(`${String(key).toLowerCase()}=${value}`);
                }
            }
        });
        return splitStringsIntoRows(script);
    }
}
