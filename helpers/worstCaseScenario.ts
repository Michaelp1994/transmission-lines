import { Fault } from "@repo/opendss-interface/elements";
import GeneralStudy from "@repo/opendss-interface/classes/GeneralStudy";
import type {
    UpdatedProject,
    UpdatedSource,
    UpdatedTransmissionTower,
    UpdatedTransmissionLine,
} from "./buildCircuit";

export interface SourceResults extends UpdatedSource {
    current: number;
}

export interface TransmissionTowerResults extends UpdatedTransmissionTower {
    current: number;
}

export interface TransmissionLineResults extends UpdatedTransmissionLine {
    towers: TransmissionTowerResults[];
}

export interface WorstCaseResults extends UpdatedProject {
    sources: SourceResults[];
    transmissionLines: TransmissionLineResults[];
}

export default async function worseCaseScenario2(
    study: GeneralStudy,
    updatedProject: UpdatedProject
) {
    const results: WorstCaseResults = { ...updatedProject } as WorstCaseResults;
    const faultPhase = 1;
    const fault = new Fault("SHORT_CIRCUIT", {
        bus1: `NOWHERE.1`,
        bus2: `NOWHERE.1`,
        phases: 1,
    });
    study.add(fault);

    study.build();
    study.setOptions({
        earthModel: "FullCarson",
    });

    updatedProject.sources.forEach((source, index) => {
        const buses = study.getParameter(source.reactor, "bus1").split(".");
        const busName = buses.shift();
        const numPhases = buses?.length;
        const faultPhases = Array(numPhases).fill(faultPhase).join(".");
        const groundPhases = buses?.join(".");
        study.changeParameter(fault, "phases", `${numPhases}`);
        study.changeParameter(fault, "bus1", `${busName}.${faultPhases}`);
        study.changeParameter(fault, "bus2", `${busName}.${groundPhases}`);
        study.solve();
        const totalCurrent = [...Array(numPhases).keys()].reduce<number>(
            (sumCurrent, phase) =>
                sumCurrent + study.readCurrent(source.reactor, phase + 1),
            0
        );
        results.sources[index].current = totalCurrent;
    });

    updatedProject.transmissionLines.forEach((transmissionLine, line_index) => {
        transmissionLine.towers.forEach((tower, tower_index) => {
            const buses = study.getParameter(tower.reactor, "bus1").split(".");
            const busName = buses.shift();
            const numPhases = buses?.length;
            const faultPhases = Array(numPhases).fill(faultPhase).join(".");
            const groundPhases = buses?.join(".");
            study.changeParameter(fault, "phases", `${numPhases}`);
            study.changeParameter(fault, "bus1", `${busName}.${faultPhases}`);
            study.changeParameter(fault, "bus2", `${busName}.${groundPhases}`);
            study.solve();
            const totalCurrent = [...Array(numPhases).keys()].reduce<number>(
                (sumCurrent, phase) =>
                    sumCurrent + study.readCurrent(tower.reactor, phase + 1),
                0
            );
            results.transmissionLines[line_index].towers[tower_index].current =
                totalCurrent;
        });
    });
    return results;
}
