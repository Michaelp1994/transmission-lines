import type { Project } from "@repo/db/controllers/project";

import OpenDSSDriver from "@repo/opendss-interface";

import Circuit from "./elements/Circuit";
import ConductorType from "./elements/ConductorType";
import Fault from "./elements/Fault";
import Source from "./elements/Source";
import TowerGeometry from "./elements/TowerGeometry";
import TransmissionLine from "./elements/TransmissionLine";
import { getConnectedPhases } from "./helpers/getConnectedPhases";

export default function createCircuit(project: Project) {
    const driver = new OpenDSSDriver();
    const circuit = new Circuit(driver);

    const sources = project.sources.map((source) => {
        const connectedPhases = getConnectedPhases(
            source,
            project.transmissionLines
        );
        const newSource = new Source(source, connectedPhases);
        circuit.addSource(newSource);
        return newSource;
    });

    const towerGeometries = project.towerGeometries.map((towerGeometry) => {
        const newTowerGeometry = new TowerGeometry(towerGeometry);
        circuit.addTowerGeometry(newTowerGeometry);
        return newTowerGeometry;
    });

    const conductorTypes = project.conductorTypes.map((conductorType) => {
        const newConductorType = new ConductorType(conductorType);
        circuit.addConductorType(newConductorType);
        return newConductorType;
    });

    const transmissionLines = project.transmissionLines.map(
        (transmissionLine) => {
            const newTransmissionLine = new TransmissionLine(transmissionLine);
            circuit.addTransmissionLine(newTransmissionLine);
            return newTransmissionLine;
        }
    );

    return circuit;
}
