import BaseElement from "./base";
import OpenDssDriver from "./OpenDssDriver";

import { OpenDSSOptions } from "@/schemas";

export default class Study {
    components: Array<BaseElement> = [];

    driver: OpenDssDriver;

    constructor(options?: OpenDSSOptions) {
        this.driver = new OpenDssDriver();
        this.driver.clear();
        if (options) this.driver.setOptions(options);
    }

    add(component: BaseElement) {
        this.components.push(component);
    }

    build() {
        this.driver.clear();
        this.components.forEach((component) => {
            const command = component.create();
            this.driver.send(command);
        });
    }
}
