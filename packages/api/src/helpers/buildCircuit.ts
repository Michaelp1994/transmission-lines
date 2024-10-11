import type { LibraryDatabase, ProjectDatabase } from "@repo/db";

import { eq } from "@repo/db/drizzle";
import { sources } from "@repo/db/project/sources";
import {
    type TransmissionConductor,
    transmissionConductors,
} from "@repo/db/project/transmissionConductors";
import {
    type TransmissionLine,
    transmissionLines,
} from "@repo/db/project/transmissionLines";
import {
    type TransmissionTower,
    transmissionTowers,
} from "@repo/db/project/transmissionTowers";
import { conductorLocations } from "@repo/db/schemas/conductorLocations";
import { conductorTypes } from "@repo/db/schemas/conductorTypes";
import { towerGeometries } from "@repo/db/schemas/towerGeometries";
import Circuit from "@repo/opendss-interface/Circuit";
import Line from "@repo/opendss-interface/elements/Line";
import LineGeometry from "@repo/opendss-interface/elements/LineGeometry";
import LineSpacing from "@repo/opendss-interface/elements/LineSpacing";
import Reactor from "@repo/opendss-interface/elements/Reactor";
import VSource from "@repo/opendss-interface/elements/VSource";
import WireData from "@repo/opendss-interface/elements/WireData";

export default async function buildCircuit(
    projectDb: ProjectDatabase,
    libraryDb: LibraryDatabase
) {
    const projectSources = await projectDb.select().from(sources);
    const tlines = await projectDb.select().from(transmissionLines);

    const projectTransmissionLines: (TransmissionLine & {
        conductors: TransmissionConductor[];
        towers: TransmissionTower[];
    })[] = [];

    for await (const tline of tlines) {
        const conductors = await projectDb
            .select()
            .from(transmissionConductors)
            .where(eq(transmissionConductors.lineId, tline.id));
        const towers = await projectDb
            .select()
            .from(transmissionTowers)
            .where(eq(transmissionTowers.lineId, tline.id));
        projectTransmissionLines.push({
            ...tline,
            conductors,
            towers,
        });
    }

    console.log("Building Circuit");
    const circuit = new Circuit("Circuit");
    // Sources
    projectSources.forEach((sourceInput) => {
        const phaseArray = projectTransmissionLines
            .filter(
                (transmissionLine) =>
                    transmissionLine.fromSourceId === sourceInput.id ||
                    transmissionLine.toSourceId === sourceInput.id
            )
            .flatMap((transmissionLine) =>
                transmissionLine.conductors
                    .filter((conductor) => conductor.isNeutral)
                    .map((conductor) =>
                        transmissionLine.fromSourceId === sourceInput.id
                            ? conductor.fromPhase
                            : conductor.toPhase
                    )
            );

        const uniquePhases = [...new Set(phaseArray)].sort((a, b) => a - b);
        const source = new VSource({
            name: sourceInput.name,
            bus1: {
                name: `B_${sourceInput.name}`,
                phases: uniquePhases,
            },
            phases: sourceInput.phases,
            basekv: sourceInput.voltage,
            x1r1: sourceInput.x1r1,
            isc1: sourceInput.isc1,
            isc3: sourceInput.isc3,
            x0r0: sourceInput.x0r0,
        });
        const reactor = new Reactor({
            name: `${sourceInput.name}_RT`,
            bus1: {
                name: `B_${sourceInput.name}`,
                phases: uniquePhases,
            },
            bus2: {
                name: `B_${sourceInput.name}`,
                phases: new Array(uniquePhases.length).fill(0),
            },
            r: sourceInput.resistance,
            x: 0,
            phases: uniquePhases.length,
        });
        circuit.add(source);
        circuit.add(reactor);
    });

    // Line Spacing
    const allGeometryIds = projectTransmissionLines
        .map((line) => line.towers.map((tower) => tower.geometryId))
        .flat();
    const uniqueGeometryIds = [...new Set(allGeometryIds)];

    for await (const geometryId of uniqueGeometryIds) {
        // const towerGeometry = await findTowerGeometry(geometryId);
        const [towerGeometry] = await libraryDb
            .select()
            .from(towerGeometries)
            .where(eq(towerGeometries.id, geometryId))
            .execute();

        if (!towerGeometry) {
            throw Error("Can't find Tower Geometry");
        }

        const conductors = await libraryDb
            .select()
            .from(conductorLocations)
            .where(eq(conductorLocations.geometryId, towerGeometry.id))
            .execute();

        const lineSpacing = new LineSpacing({
            name: towerGeometry.name,
            nConds: conductors.length,
            nPhases: conductors.length,
            x: conductors.map((conductor) => conductor.x),
            h: conductors.map((conductor) => conductor.y),
            units: "m",
        });
        circuit.add(lineSpacing);
    }
    // WireData
    const allConductorTypeIds = projectTransmissionLines
        .map((line) => line.conductors.map((conductor) => conductor.typeId))
        .flat();
    const uniqueConductorTypeIds = [...new Set(allConductorTypeIds)];
    uniqueConductorTypeIds.map(async (conductorTypeId) => {
        const [conductorType] = await libraryDb
            .select()
            .from(conductorTypes)
            .where(eq(conductorTypes.id, conductorTypeId))
            .execute();
        if (!conductorType) {
            throw Error(`Can't find conductor type with id=${conductorTypeId}`);
        }
        const wireData = new WireData({
            name: conductorType.name,
            diam: conductorType.outerDiameter,
            gmrac: conductorType.gmr,
            rac: conductorType.acResistance75,
            radUnits: "mm",
            gmrUnits: "mm",
            rUnits: "km",
        });
        circuit.add(wireData);
        return wireData;
    });

    // START OF TRANSMISSION LINE
    for await (const line of projectTransmissionLines) {
        const wireNames: string[] = [];

        for await (const conductorInput of line.conductors) {
            const [conductorType] = await libraryDb
                .select()
                .from(conductorTypes)
                .where(eq(conductorTypes.id, conductorInput.typeId))
                .execute();
            if (!conductorType) {
                throw new Error(
                    `Can't find conductor type with id=${conductorInput.typeId}`
                );
            }
            wireNames.push(conductorType.name);
        }

        // Line Geometries
        const allGeometryIds = line.towers.map((tower) => tower.geometryId);
        const uniqueGeometries = [...new Set(allGeometryIds)];

        for await (const geometryId of uniqueGeometries) {
            const [towerGeometry] = await libraryDb
                .select()
                .from(towerGeometries)
                .where(eq(towerGeometries.id, geometryId))
                .execute();
            if (!towerGeometry) {
                throw new Error("Can't find tower geometry");
            }
            const lineGeometry = new LineGeometry({
                name: `${line.name}_${towerGeometry.name}`,
                nconds: line.conductors.length,
                nphases: line.conductors.length,
                spacing: towerGeometry.name,
                reduce: false,
                wires: wireNames,
            });
            circuit.add(lineGeometry);
        }

        // Transmission Lines
        const fromSource = projectSources.find(
            (s) => s.id === line.fromSourceId
        );
        if (!fromSource) {
            throw new Error("Can't find source");
        }
        const toSource = line.toSourceId
            ? projectSources.find((s) => s.id === line.toSourceId)
            : { name: `NOWHERE_${line.name}` };
        if (!toSource) {
            throw new Error("Can't find source");
        }

        const numConductors = line.conductors.length;
        const fromPhases = line.conductors.map(
            (transmissionLine) => transmissionLine.fromPhase
        );
        const intermediatePhases = [...Array(numConductors).keys()].map(
            (i) => i + 1
        ); // array from 1 to numPhases
        const toPhases = line.conductors.map(
            (transmissionLine) => transmissionLine.toPhase
        );

        const initialPhases = fromPhases;
        const middlePhases = intermediatePhases;
        const finalPhases = toPhases;

        const numNeutrals = line.conductors.filter(
            (conductor) => conductor.isNeutral
        ).length;

        const neutralBus1Phases = line.conductors.reduce<number[]>(
            (phases, conductor, index) => {
                if (conductor.isNeutral) {
                    phases.push(index + 1);
                }
                return phases;
            },
            []
        );
        const neutralBus2Phases = new Array(numNeutrals).fill(0);
        let index = 0;

        for await (const tower of line.towers) {
            const name = `${line.name}_${tower.name}`;
            const [geometry] = await libraryDb
                .select()
                .from(towerGeometries)
                .where(eq(towerGeometries.id, tower.geometryId))
                .execute();
            if (!geometry) {
                throw new Error("Can't find tower geometry");
            }
            const towerNumber = index + 1;
            if (towerNumber === 1) {
                const lineObject = new Line({
                    name: `${name}_line`,
                    bus1: {
                        name: `B_${fromSource.name}`,
                        phases: initialPhases,
                    },
                    bus2: {
                        name,
                        phases: middlePhases,
                    },
                    phases: numConductors,
                    length: tower.distance,
                    units: "km",
                    geometry: `${line.name}_${geometry.name}`,
                });
                const reactorObject = new Reactor({
                    name: `${name}_RT`,
                    bus1: {
                        name,
                        phases: neutralBus1Phases,
                    },
                    bus2: {
                        name,
                        phases: neutralBus2Phases,
                    },
                    r: tower.resistance,
                    x: 0,
                    phases: numNeutrals,
                });
                circuit.add(lineObject);
                circuit.add(reactorObject);
            } else {
                const prevTower = line.towers[index - 1];
                if (!prevTower) {
                    throw new Error("Can't find previous tower");
                }
                const prevName = `${line.name}_${prevTower.name}`;
                const lineObject = new Line({
                    name: `${name}_line`,
                    bus1: {
                        name: prevName,
                        phases: middlePhases,
                    },
                    bus2: {
                        name,
                        phases: middlePhases,
                    },
                    length: tower.distance,
                    phases: numConductors,
                    units: "km",
                    geometry: `${line.name}_${geometry.name}`,
                });

                const reactorObject = new Reactor({
                    name: `${name}_RT`,
                    bus1: {
                        name,
                        phases: neutralBus1Phases,
                    },
                    bus2: {
                        name,
                        phases: neutralBus2Phases,
                    },
                    r: tower.resistance,
                    x: 0,
                    phases: numNeutrals,
                });
                circuit.add(lineObject);
                circuit.add(reactorObject);

                if (towerNumber === line.towers.length) {
                    const lastLineObject = new Line({
                        name: `${name}_extra_span`,
                        bus1: {
                            name,
                            phases: middlePhases,
                        },
                        bus2: {
                            name: toSource.name,
                            phases: finalPhases,
                        },
                        length: tower.distance, // FIXME: This is wrong, assuming the last line to substation is same as previous
                        phases: numConductors,
                        units: "km",
                        geometry: `${line.name}_${geometry.name}`,
                    });
                    circuit.add(lastLineObject);
                }
            }
            index += 1;
        }
    }
    return circuit;
}
