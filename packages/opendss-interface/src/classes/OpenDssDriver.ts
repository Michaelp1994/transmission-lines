import type { OpenDSSOptions } from "@/schemas";

import winax from "winax";

import OpenDSSError from "./OpenDSSError";

export default class OpenDssDriver {
    debug: boolean;

    dss: OpenDSSengine.DSS;

    dssBus: OpenDSSengine.DSS["ActiveCircuit"]["ActiveBus"];

    dssCircuit: OpenDSSengine.DSS["ActiveCircuit"];

    dssElem: OpenDSSengine.DSS["ActiveCircuit"]["ActiveCktElement"];

    dssMathLib: OpenDSSengine.DSS["CmathLib"];

    dssSolution: OpenDSSengine.DSS["ActiveCircuit"]["Solution"];

    dssText: OpenDSSengine.DSS["Text"];

    isSolved = false;

    isStarted = false;

    constructor(debug = false) {
        this.debug = debug;
        this.dss = new winax.Object("OpenDSSengine.DSS");
        if (!this.dss.Start(0)) {
            this.close();
            throw new OpenDSSError("Unable to start OpenDSS engine");
        }
        this.isStarted = true;
        this.dss.AllowForms = false;
        this.dss.ClearAll();
        this.dssMathLib = this.dss.CmathLib;
        this.dssText = this.dss.Text;
        this.dssCircuit = this.dss.ActiveCircuit;
        this.dssSolution = this.dssCircuit.Solution;
        this.dssElem = this.dssCircuit.ActiveCktElement;
        this.dssBus = this.dssCircuit.ActiveBus;
    }

    changeParameter(name: string, property: string, value: string) {
        this.setActiveElement(name);
        if (
            this.dssElem.Properties(property).Name.toLowerCase() !==
            property.toLowerCase()
        ) {
            this.close();
            throw new OpenDSSError(
                `Can't find ${property} property on ${name} component.`
            );
        }

        this.dssElem.Properties(property).Val = value;
    }

    clear() {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }
        this.dss.ClearAll();
    }

    close() {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }
        this.clear();
        // @ts-expect-error
        winax.release(this.dss);
        this.isStarted = false;
    }

    createCircuit(name: string) {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }
        this.dss.NewCircuit(name);
    }

    getActiveCircuit() {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }

        return this.dssCircuit.Name;
    }

    // Requires Solve First
    getBusNames() {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }

        return this.dssCircuit.AllBusNames;
    }

    getCurrents(name: string) {
        this.setActiveElement(name);
        const currents = this.dssElem.Currents as number[];
        const phases = this.dssElem.NodeOrder as number[];

        return phases.map((phase, index) => {
            return {
                phase,
                current: {
                    current: currents[index * 2],
                    angle: currents[index * 2 + 1],
                },
            };
        });
    }

    getElementNames() {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }

        return this.dssCircuit.AllElementNames;
    }

    // Requires Solve First
    getNodeNames() {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }

        return this.dssCircuit.AllNodeNames;
    }

    getNumCircuits() {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }

        return this.dss.NumCircuits;
    }

    getNumElements() {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }

        return this.dssCircuit.NumCktElements;
    }

    getOption(option: keyof OpenDSSOptions) {
        this.dssText.Command = `GET ${option}`;

        return this.dssText.Result;
    }

    getParameter(name: string, property: string) {
        this.setActiveElement(name);
        if (
            this.dssElem.Properties(property).Name.toLowerCase() !==
            property.toLowerCase()
        ) {
            this.close();
            throw new OpenDSSError(`Parameter unknown ${name}`);
        }
        const val = this.dssElem.Properties(property).Val;

        return val;
    }

    getVersion() {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }

        return this.dss.Version;
    }

    sendArray(commands: string[]) {
        commands.forEach((command) => {
            this.sendString(command);
        });
    }

    sendString(text: string) {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }
        this.dssText.Command = text;
        if (this.debug) {
            console.log(`Sent: ${text}`);
            if (this.dssText.Result) {
                console.log(`Received: ${this.dssText.Result}`);
            }
        }
        if (this.dss.Error.Description || this.dss.Error.Number) {
            this.close();
            throw new OpenDSSError(
                `Error: ${this.dss.Error.Description} [${this.dss.Error.Number}]`
            );
        }
    }

    setActiveCircuit(name: string) {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }
        this.setOption("circuit", name);
    }

    setActiveElement(name: string) {
        if (this.dssElem.Name === name) {
            return;
        }
        const result = this.dssCircuit.SetActiveElement(name);

        console.log("result: ", result);
        if (this.dssElem.Name.toLowerCase() !== name.toLowerCase()) {
            this.close();
            throw new OpenDSSError(
                `Can't find ${name} in circuit. [Found ${this.dssElem.Name}]`
            );
        }
    }

    setOption(option: keyof OpenDSSOptions, value: string) {
        this.sendString(`SET ${option} = ${value}`);
    }

    setOptions(options: OpenDSSOptions) {
        Object.entries(options).forEach(([name, value]) => {
            this.setOption(name, value);
        });
    }

    solve() {
        if (!this.isStarted) {
            throw new OpenDSSError("OpenDSS Engine is not started");
        }
        this.dssSolution.Solve();
        if (this.dss.Error.Description || this.dss.Error.Number) {
            this.close();
            throw new OpenDSSError(
                `Error solving: ${this.dss.Error.Description} [${this.dss.Error.Number}]`
            );
        }
        if (!this.dssSolution.Converged) {
            this.close();
            throw new Error(`Unknown Error, Solution did not converge.`);
        }
    }
}
