import type BaseElement from "./elements/BaseElement";

import { type OpenDSSOptions, optionsSchema } from "../schemas";
import OpenDssDriver from "./OpenDssDriver";

export default class Circuit {
    components: BaseElement[] = [];

    driver: OpenDssDriver;

    isSolved = false;

    name: string;

    solution: any[] = [];

    constructor(name: string, options?: OpenDSSOptions, debug = false) {
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

    build() {
        this.components.forEach((component) => {
            const script = component.create();

            this.driver.sendArray(script);
        });
    }

    close() {
        this.driver.close();
    }

    getCurrents(element: BaseElement) {
        if (!this.isSolved) {
            throw new Error("Circuit is not solved");
        }

        return this.driver.getCurrents(element.getFullName());
    }

    remove(component: BaseElement) {
        this.components.findIndex((c) => c.id === component.id);
        this.components = this.components.filter((c) => c !== component);
    }

    solve() {
        this.driver.solve();
        this.isSolved = true;
    }

    solveCurrents() {
        this.driver.solve();
        this.isSolved = true;
    }
}
