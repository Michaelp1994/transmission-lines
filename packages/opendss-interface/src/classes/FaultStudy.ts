import type OpenDSSOptionsInterface from "@classes/OpenDSSOptionsInterface";

import { Fault, LineGeometry, LineSpacing, WireData } from "./elements";
import Source from "./molecules/Source";
import TransmissionLine from "./molecules/TransmissionLine";
import OpenDssDriver from "./OpenDssDriver";

export default class FaultStudy {
    private sources: Source[] = [];

    private transmissionLines: TransmissionLine[] = [];

    private wireDatas: WireData[] = [];

    private lineSpacings: LineSpacing[] = [];

    private lineGeometries: LineGeometry[] = [];

    private fault = new Fault({
        name: "SHORT_CIRCUIT",
        bus1: `NOWHERE.1`,
        bus2: `NOWHERE.1`,
        phases: 1,
    });

    driver: OpenDssDriver;

    constructor(options?: OpenDSSOptionsInterface) {
        // this.circuitSolved = false;
        this.driver = new OpenDssDriver();
        this.driver.clear();
        if (options) this.driver.setOptions(options);
    }

    /** Add Component to the circuit  */
    addSource(component: Source) {
        this.sources.push(component);
        // this.circuitSolved = false;
    }

    addTransmissionLine(component: TransmissionLine) {
        this.transmissionLines.push(component);
    }

    addWireData(component: WireData) {
        this.wireDatas.push(component);
    }

    addLineSpacings(component: LineSpacing) {
        this.lineSpacings.push(component);
    }

    addLineGeometry(component: LineGeometry) {
        this.lineGeometries.push(component);
    }

    build() {
        this.driver.clear();
        this.sources.forEach((source) => {
            const command = source.create();
            this.driver.send(command);
        });
        this.lineSpacings.forEach((lineSpacing) => {
            const command = lineSpacing.create();
            this.driver.send(command);
        });
        this.wireDatas.forEach((wireData) => {
            const command = wireData.create();
            this.driver.send(command);
        });

        this.lineGeometries.forEach((lineGeometry) => {
            const command = lineGeometry.create();
            this.driver.send(command);
        });

        this.transmissionLines.forEach((tranmissionLine) => {
            const command = tranmissionLine.create();
            this.driver.send(command);
        });

        const command = this.fault.create();
        this.driver.send(command);
    }

    worstCase() {
        this.build();
        this.driver.getCurrents();
        return 10;
    }
}
