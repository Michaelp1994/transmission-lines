import type OpenDSSOptionsInterface from "@classes/OpenDSSOptionsInterface";
import { open } from "node:fs/promises";
import { EOL } from "node:os";

import BaseElement from "@elements/BaseElements/BaseElement";
import CircuitElement from "@elements/BaseElements/CircuitElement";
import OpenDssDriver from "./OpenDssDriver";

export default class GeneralStudy {
    private components: Array<BaseElement>;

    // private circuitSolved: boolean;

    driver: OpenDssDriver;

    constructor(options?: OpenDSSOptionsInterface) {
        // this.circuitSolved = false;
        this.components = [];
        this.driver = new OpenDssDriver();
        this.driver.clear();
        if (options) this.driver.setOptions(options);
    }

    /** Add Component to the circuit  */
    add(component: BaseElement) {
        this.components.push(component);
        // this.circuitSolved = false;
    }

    /** remove component from a circuit */
    remove(component: BaseElement) {
        const index = this.components.findIndex(
            (c) => c.name === component.name
        );
        if (index === -1) throw Error("cannot find component in circuit");
        const removed = this.components.splice(index, 1);
        // this.circuitSolved = false;
        if (removed[0]?.name !== component.name)
            throw Error(
                `Removed ${removed[0]?.name} instead of ${component.name}`
            );
    }

    /** save the script to a file */
    async saveScript(fileName: string) {
        const file = await open(fileName, "w");
        // const script: string[] = [];
        const script = this.components.map((component) =>
            component.create().join(EOL)
        );
        await file.appendFile(script.join(EOL));
        file.close();
    }

    /** output the script to console */
    printScript() {
        this.components.forEach((component) => {
            // eslint-disable-next-line no-console
            console.log(component.create());
        });
    }

    showCurrents() {
        this.driver.getCurrents();
    }

    setOptions(options: OpenDSSOptionsInterface) {
        this.driver.setOptions(options);
    }

    getOption(option: keyof OpenDSSOptionsInterface) {
        return this.driver.getOption(option);
    }

    setActiveElement(component: CircuitElement) {
        this.driver.setActiveElement(`${component._type}.${component.name}`);
    }

    getParameter(component: CircuitElement, property: string) {
        return this.driver.getParameter(
            `${component._type}.${component.name}`,
            property
        );
    }

    changeParameter(
        component: CircuitElement,
        property: string,
        value: string
    ) {
        this.driver.changeParameter(
            `${component._type}.${component.name}`,
            property,
            value
        );
    }

    readCurrent(component: CircuitElement, index: number) {
        return this.driver.readCurrent(
            `${component._type}.${component.name}`,
            index
        );
    }

    build() {
        this.driver.clear();
        this.components.forEach((component) => {
            const command = component.create();
            this.driver.send(command);
        });
    }

    solve() {
        this.driver.solve();
        // this.circuitSolved = true;
    }

    getBuses() {
        return this.driver.getBuses();
    }
}
