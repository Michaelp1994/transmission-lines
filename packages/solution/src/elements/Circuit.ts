import type TransmissionLine from "./TransmissionLine";
import type TowerGeometry from "./TowerGeometry";
import type ConductorType from "./ConductorType";
import OpenDSSInterface from "@repo/opendss-interface";
import type Source from "./Source";
import type Fault from "./Fault";
import type { LineID, SourceID, TowerID } from "@repo/validators/Ids";

export default class Circuit {
    transmissionLines: TransmissionLine[] = [];
    sources: Source[] = [];
    towerGeometries: TowerGeometry[] = [];
    conductorTypes: ConductorType[] = [];
    driver: OpenDSSInterface;
    fault?: Fault;

    constructor(openDssDriver: OpenDSSInterface) {
        this.driver = openDssDriver;
    }

    addSource(source: Source) {
        this.sources.push(source);
    }

    addTransmissionLine(transmissionLine: TransmissionLine) {
        this.transmissionLines.push(transmissionLine);
    }

    addTowerGeometry(towerGeometry: TowerGeometry) {
        this.towerGeometries.push(towerGeometry);
    }

    addConductorType(conductorType: ConductorType) {
        this.conductorTypes.push(conductorType);
    }

    addFault(fault: Fault) {
        this.fault = fault;
    }

    solve() {
        this.driver.sendArray(["New Circuit.TEST"]);
        this.sources.forEach((source) => {
            this.driver.sendArray(source.create());
        });

        this.towerGeometries.forEach((towerGeometry) => {
            this.driver.sendArray(towerGeometry.create());
        });

        this.conductorTypes.forEach((conductorTypes) => {
            this.driver.sendArray(conductorTypes.create());
        });

        this.transmissionLines.forEach((transmissionLine) => {
            this.driver.sendArray(transmissionLine.create());
        });

        if (this.fault) {
            this.driver.sendArray(this.fault.create());
        }

        this.driver.solve();
    }
    getScript() {
        const script = ["clearAll", "New Circuit.TEST"];
        this.sources.forEach((source) => {
            script.push(...source.create());
        });

        this.towerGeometries.forEach((towerGeometry) => {
            script.push(...towerGeometry.create());
        });

        this.conductorTypes.forEach((conductorTypes) => {
            script.push(...conductorTypes.create());
        });

        this.transmissionLines.forEach((transmissionLine) => {
            script.push(...transmissionLine.create());
        });

        if (this.fault) {
            script.push(...this.fault.create());
        }
        script.push("solve");
        script.push("show currents elements");
        return script;
    }
    readCurrent() {
        const transmissionLines = this.transmissionLines.map((line) =>
            line.getCurrent(this.driver)
        );

        const sources = this.sources.map((source) =>
            source.getCurrent(this.driver)
        );
        return {
            sources,
            transmissionLines,
        };
    }
}
