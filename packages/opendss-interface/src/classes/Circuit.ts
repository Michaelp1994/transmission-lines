import BaseElement from "./elements/BaseElement";
import OpenDssDriver from "./OpenDssDriver";

import { OpenDSSOptions, optionsSchema } from "@/schemas";

export default class Circuit {
    components: Array<BaseElement> = [];

    solution: Array<any> = [];

    isSolved: boolean = false;

    name: string;

    driver: OpenDssDriver;

    constructor(
        name: string,
        options?: OpenDSSOptions,
        debug: boolean = false
    ) {
        this.driver = new OpenDssDriver(debug);
        this.name = name;
        this.driver.createCircuit(name);
        if (options) {
            this.driver.setOptions(optionsSchema.parse(options));
        }
    }

    add(component: BaseElement) {
        this.components.push(component);
        this.isSolved = false;
    }

    remove(component: BaseElement) {
        this.components.findIndex((c) => c.id === component.id);
        this.components = this.components.filter((c) => c !== component);
    }

    close() {
        this.driver.close();
    }

    build() {
        this.components.forEach((component) => {
            const script = component.create();
            this.driver.sendArray(script);
        });
    }

    solve() {
        this.driver.solve();
        this.isSolved = true;
    }

    solveCurrents() {
        this.driver.solve();
        this.isSolved = true;
    }

    getCurrents(element: BaseElement) {
        if (!this.isSolved) {
            throw Error("Circuit is not solved");
        }

        return this.driver.getCurrents(element.getFullName());
    }
}
