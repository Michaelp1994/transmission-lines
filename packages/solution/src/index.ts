import type { Project } from "@repo/db/controllers/project";
import OpenDSSDriver from "@repo/opendss-interface";
import Source from "./elements/Source";
import { getConnectedPhases } from "./helpers/getConnectedPhases";
import TowerGeometry from "./elements/TowerGeometry";
import ConductorType from "./elements/ConductorType";
import TransmissionLine from "./elements/TransmissionLine";
import Circuit from "./elements/Circuit";
import Fault from "./elements/Fault";

export default function solveProject(project: Project, busName: string) {
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
    const fault = new Fault(busName);
    circuit.addFault(fault);

    circuit.solve();
    const currents = circuit.readCurrent();
    const script = circuit.getScript();
    return {
        ...currents,
        script,
    };
}

export type Solution = ReturnType<typeof solveProject>;
