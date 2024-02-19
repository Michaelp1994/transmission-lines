import type { ConductorType } from "@repo/db/schemas/conductorTypes";
import type { Project } from "@repo/db/schemas/projects";
import type { Source as SourceDB } from "@repo/db/schemas/sources";
import type {
    TowerGeometry,
    TowerGeometryWithRelations,
} from "@repo/db/schemas/towerGeometries";
import { TransmissionConductor } from "@repo/db/schemas/transmissionConductors";
import type { TransmissionLine as TransmissionLineDB } from "@repo/db/schemas/transmissionLines";
import { TransmissionTower } from "@repo/db/schemas/transmissionTowers";
import FaultStudy from "@repo/opendss-interface/classes/FaultStudy";
import Source from "@repo/opendss-interface/classes/molecules/Source";
import TransmissionLine from "@repo/opendss-interface/classes/molecules/TransmissionLine";
import {
    LineGeometry,
    LineSpacing,
    WireData,
} from "@repo/opendss-interface/elements";

type TransmissionConductorWithRelations = TransmissionConductor & {
    type: ConductorType;
};

type TransmissionTowerWithRelations = TransmissionTower & {
    geometry: TowerGeometry;
};

type TransmissionLineWithRelations = TransmissionLineDB & {
    fromSource: SourceDB;
    toSource: SourceDB;
    conductors: TransmissionConductorWithRelations[];
    towers: TransmissionTowerWithRelations[];
};

type ProjectWithRelations = Project & {
    sources: SourceDB[];
    transmissionLines: TransmissionLineWithRelations[];
};

export default async function buildCircuit(
    project: ProjectWithRelations,
    towerGeometries: TowerGeometryWithRelations[],
    conductorTypes: ConductorType[]
) {
    console.log("Building Circuit");
    const study = new FaultStudy();
    // Sources
    project.sources.forEach((sourceInput, index) => {
        const source = new Source(sourceInput, index === 0);
        study.addSource(source);
    });

    // Line Spacing
    towerGeometries.forEach((towerGeometry) => {
        const lineSpacing = new LineSpacing({
            name: towerGeometry.name,
            nConds: towerGeometry.conductors.length,
            nPhases: towerGeometry.conductors.length,
            x: towerGeometry.conductors.map((conductor) => conductor.x),
            h: towerGeometry.conductors.map((conductor) => conductor.y),
            units: "m",
        });
        study.addLineSpacings(lineSpacing);
    });

    // WireData
    conductorTypes.forEach(async (conductorType) => {
        const wireData = new WireData({
            name: conductorType.name,
            diam: conductorType.outerDiameter,
            gmrac: conductorType.gmr,
            rac: conductorType.acResistance75,
            radUnits: "mm",
            gmrUnits: "mm",
            rUnits: "km",
        });
        study.addWireData(wireData);
    });

    // START OF TRANSMISSION LINE
    // eslint-disable-next-line no-restricted-syntax
    for await (const line of project.transmissionLines) {
        const wireNames = line.conductors.map(
            (conductor) => conductor.type.name
        );
        const geometryNames = line.towers.map((tower) => tower.geometry.name);
        const uniqueGeometries = [...new Set(geometryNames)];

        // eslint-disable-next-line no-restricted-syntax
        for await (const geometryName of uniqueGeometries) {
            const lineGeometry = new LineGeometry({
                name: `${line.name}_${geometryName}`,
                nconds: line.conductors.length,
                nphases: line.conductors.length,
                spacing: geometryName,
                reduce: false,
                wires: wireNames,
            });
            study.addLineGeometry(lineGeometry);
        }

        // Transmission Lines
        const tLine = new TransmissionLine(line);
        study.addTransmissionLine(tLine);
    }
    console.log("Circuit built");
    return study;
}
