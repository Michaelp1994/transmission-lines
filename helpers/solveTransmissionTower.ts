import { Fault } from "@repo/opendss-interface/elements";
import GeneralStudy from "@repo/opendss-interface/classes/GeneralStudy";
import { FaultLocation } from "@repo/validators/schemas/TowerFault.schema";

export interface CurrentResult {
    name: string;
    current: number;
}

export interface SourceResults2 extends UpdatedSource {
    groundCurrent: number;
    lineCurrents: CurrentResult[];
}

export interface TransmissionTowerResults2 extends UpdatedTransmissionTower {
    groundCurrent: number;
    lineCurrents: CurrentResult[];
}

export interface TransmissionLineResults2 extends UpdatedTransmissionLine {
    towers: TransmissionTowerResults2[];
}

export interface TransmissionTowerProjectResults extends UpdatedProject {
    sources: SourceResults2[];
    transmissionLines: TransmissionLineResults2[];
}

export default async function solveTransmissionTowerFault(
    study: GeneralStudy,
    updatedProject: UpdatedProject,
    location: FaultLocation
) {
    const results: TransmissionTowerProjectResults = {
        ...updatedProject,
    } as TransmissionTowerProjectResults;
    const faultPhase = 1;
    const faultLine = findTransmissionLine(
        location.transmissionLine,
        updatedProject.transmissionLines
    );
    const faultTower = findTransmissionTower(location.tower, faultLine);

    const buses = faultTower.reactor.bus1!.split(".");
    const busName = buses.shift();
    const numPhases = buses?.length;
    const faultPhases = Array(numPhases).fill(faultPhase).join(".");
    const groundPhases = buses?.join(".");

    const fault = new Fault({
        name: "SHORT_CIRCUIT",
        bus1: `${busName}.${faultPhases}`,
        bus2: `${busName}.${groundPhases}`,
        phases: numPhases,
    });

    study.add(fault);
    study.build();
    study.setOptions({
        earthModel: "FullCarson",
    });
    study.solve();
    // study.saveScript("test.dss");
    updatedProject.sources.forEach((source, index) => {
        const numPhases = source.reactor.phases;
        const totalCurrent = [...Array(numPhases).keys()].reduce<number>(
            (sumCurrent, phase) =>
                sumCurrent + study.readCurrent(source.reactor, phase + 1),
            0
        );
        results.sources[index].groundCurrent = totalCurrent;
    });

    updatedProject.transmissionLines.forEach((transmissionLine, line_index) => {
        transmissionLine.towers.forEach((tower, tower_index) => {
            results.transmissionLines[line_index].towers[
                tower_index
            ].lineCurrents = [];
            transmissionLine.conductors.forEach(
                (conductor, conductor_index) => {
                    const current = study.readCurrent(
                        tower.line,
                        conductor_index + 1
                    );
                    results.transmissionLines[line_index].towers[
                        tower_index
                    ].lineCurrents.push({
                        name: conductor.name,
                        current,
                    });
                }
            );
            const numPhases = tower.reactor.phases;
            const totalCurrent = [...Array(numPhases).keys()].reduce<number>(
                (sumCurrent, phase) =>
                    sumCurrent + study.readCurrent(tower.reactor, phase + 1),
                0
            );
            results.transmissionLines[line_index].towers[
                tower_index
            ].groundCurrent = totalCurrent;
        });
    });
    return results;
}
