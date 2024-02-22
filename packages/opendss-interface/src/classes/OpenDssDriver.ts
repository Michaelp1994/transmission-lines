/// <reference types="@types/activex-opendssengine" />
import winax from "winax";

import { OpenDSSOptions } from "@/schemas/opendss/options";

export default class OpenDssDriver {
    private dss: OpenDSSengine.DSS;

    private dssCircuit: OpenDSSengine.DSS["ActiveCircuit"];

    private dssSolution: OpenDSSengine.DSS["ActiveCircuit"]["Solution"];

    private dssElem: OpenDSSengine.DSS["ActiveCircuit"]["ActiveCktElement"];

    private dssMathLib: OpenDSSengine.DSS["CmathLib"];

    // private dssBus: OpenDSSengine.DSS["ActiveCircuit"]["ActiveBus"];

    private dssText: OpenDSSengine.DSS["Text"];

    constructor() {
        this.dss = new winax.Object("OpenDSSengine.DSS");
        this.dssMathLib = this.dss.CmathLib;
        this.dssText = this.dss.Text;
        this.dssCircuit = this.dss.ActiveCircuit;
        this.dssSolution = this.dssCircuit.Solution;
        this.dssElem = this.dssCircuit.ActiveCktElement;
        // this.dssBus = this.dssCircuit.ActiveBus;
    }

    clear() {
        // console.log("Clearing");
        this.dss.ClearAll();
    }

    setActiveElement(name: string) {
        this.dssCircuit.SetActiveElement(name);
        if (this.dssElem.Name.toLowerCase() !== name.toLowerCase())
            throw Error(
                `Can't find ${name} in circuit. [Found ${this.dssElem.Name}]`
            );
    }

    getParameter(name: string, property: string) {
        const prevName = this.dssElem.Name;
        this.setActiveElement(name);
        if (
            this.dssElem.Properties(property).Name.toLowerCase() !==
            property.toLowerCase()
        )
            throw new Error(`Parameter unknown ${name}`);
        const val = this.dssElem.Properties(property).Val;
        this.setActiveElement(prevName);
        return val;
    }

    changeParameter(name: string, property: string, value: string) {
        const prevName = this.dssElem.Name;
        this.setActiveElement(name);
        if (
            this.dssElem.Properties(property).Name.toLowerCase() !==
            property.toLowerCase()
        )
            throw Error(
                `Can't find ${property} property on ${name} component.`
            );
        this.dssElem.Properties(property).Val = value;
        this.setActiveElement(prevName);
    }

    readCurrent(location: string, phase: number) {
        const prevName = this.dssElem.Name;
        this.setActiveElement(location);
        const index = (phase - 1) * 2;
        const current = this.dssMathLib.ctopolardeg(
            this.dssElem.Currents[index],
            this.dssElem.Currents[index + 1]
        )[0];
        this.setActiveElement(prevName);
        return current;
    }

    getBuses() {
        return this.dssCircuit.AllBusNames;
    }

    getCurrents() {
        this.send("Show Currents Elements");
    }

    setOptions(options: OpenDSSOptions) {
        Object.keys(options).forEach((optionName) => {
            this.send(
                `SET ${optionName} = ${
                    options[optionName as keyof OpenDSSOptions]
                }`
            );
        });
        // this.dssText.Command = text;
    }

    getOption(option: keyof OpenDSSOptions) {
        this.dssText.Command = `GET ${option}`;
        return this.dssText.Result;
    }

    solve() {
        this.dssSolution.Solve();
        if (this.dss.Error.Description || this.dss.Error.Number)
            throw Error(
                `Error solving: ${this.dss.Error.Description} [${this.dss.Error.Number}]`
            );
        if (!this.dssSolution.Converged)
            throw Error("Unknown Error, Solution did not converge.");
    }

    send(commands: string | string[]) {
        if (Array.isArray(commands)) {
            commands.forEach((commandLine) => {
                this.dssText.Command = commandLine;
                if (this.dssText.Result)
                    throw Error(
                        `Error sending ${commandLine}: ${this.dssText.Result}`
                    );
                if (this.dss.Error.Description || this.dss.Error.Number)
                    throw Error(
                        `Error sending ${commandLine}: ${this.dss.Error.Description} [${this.dss.Error.Number}]`
                    );
            });
        } else {
            this.dssText.Command = commands;
            if (this.dssText.Result)
                throw Error(
                    `Error sending ${commands}: ${this.dssText.Result}`
                );
            if (this.dss.Error.Description || this.dss.Error.Number)
                throw Error(
                    `Error sending ${commands}: ${this.dss.Error.Description} [${this.dss.Error.Number}]`
                );
        }
    }
}
