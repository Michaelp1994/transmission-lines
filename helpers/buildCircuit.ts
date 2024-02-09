import TowerGeometry from "@repo/db/models/TowerGeometry.model";
import ConductorType from "@repo/db/models/ConductorType.model";
import GeneralStudy from "@repo/opendss-interface/classes/GeneralStudy";
import Source from "@repo/db/models/Source.model";
import TransmissionLine from "@repo/db/models/TransmissionLine.model";

import {
    Circuit,
    Line,
    LineGeometry,
    LineSpacing,
    Reactor,
    Vsource,
    WireData,
} from "@repo/opendss-interface/elements";
import { Context } from "@/context";

const NEUTRAL_PHASE = 20;

export default async function buildCircuit(ctx: Context) {
    console.log("Building Circuit");
    const study = new GeneralStudy();
    // Sources
    const sources = await Source.find();
    const transmissionLines = await TransmissionLine.find();
    sources.forEach((sourceInput, index) => {
        let source: Circuit | Vsource;
        if (index === 0) {
            source = new Circuit({
                name: sourceInput.name,
                bus1: `B_${sourceInput.name}`,
                phases: sourceInput.phases,
                basekv: sourceInput.voltage,
                x1r1: sourceInput.x1r1,
                Isc1: sourceInput.isc1,
                Isc3: sourceInput.isc3,
                x0r0: sourceInput.x0r0,
            });
        } else {
            source = new Vsource({
                name: sourceInput.name,
                bus1: `B_${sourceInput.name}`,
                phases: sourceInput.phases,
                basekv: sourceInput.voltage,
                x1r1: sourceInput.x1r1,
                Isc1: sourceInput.isc1,
                Isc3: sourceInput.isc3,
                x0r0: sourceInput.x0r0,
            });
        }
        const reactor = new Reactor({
            name: `${sourceInput.name}_RT`,
            bus1: `B_${sourceInput.name}.${NEUTRAL_PHASE}`,
            bus2: `B_${sourceInput.name}.0`,
            R: sourceInput.resistance,
            X: 0,
            phases: 1,
        });
        study.add(source);
        study.add(reactor);
        updatedProject.sources.push({
            source,
            reactor,
        });
    });

    // Line Spacing
    const allGeometryIds = transmissionLines
        .map((line) => line.towers.map((tower) => tower.geometryId))
        .flat();
    const uniqueGeometryIds = [...new Set(allGeometryIds)];

    // eslint-disable-next-line no-restricted-syntax
    for await (const geometryId of uniqueGeometryIds) {
        const lineSpacing = await TowerGeometry.findOneByOrFail({
            id: geometryId,
        });
        const lineSpacingClass = new LineSpacing({
            name: lineSpacing.name,
            nConds: lineSpacing.conductors.length,
            nPhases: lineSpacing.conductors.length,
            x: lineSpacing.conductors.map((conductor) => conductor.x),
            h: lineSpacing.conductors.map((conductor) => conductor.y),
            units: "m",
        });
        study.add(lineSpacingClass);
    }
    // WireData
    const allConductorTypeIds = transmissionLines
        .map((line) => line.conductors.map((conductor) => conductor.typeId))
        .flat();
    const uniqueConductorTypeIds = [...new Set(allConductorTypeIds)];
    uniqueConductorTypeIds.map(async (conductorTypeId) => {
        const conductorType = await ConductorType.findOneByOrFail({
            id: conductorTypeId,
        });
        const wireDataClass = new WireData({
            name: conductorType.name,
            diam: conductorType.outerDiameter,
            gmrac: conductorType.gmr,
            rac: conductorType.acResistance75,
            radUnits: "mm",
            gmrUnits: "mm",
            rUnits: "km",
        });
        study.add(wireDataClass);
        return wireDataClass;
    });

    // START OF TRANSMISSION LINE
    let lineIndex = 0;
    // eslint-disable-next-line no-restricted-syntax
    for await (const line of transmissionLines) {
        const wireNames: string[] = [];
        // eslint-disable-next-line no-restricted-syntax
        for await (const conductorInput of line.conductors) {
            const conductorClass = await ConductorType.findOneByOrFail({
                id: conductorInput.typeId,
            });

            wireNames.push(conductorClass.name);
        }

        // Line Geometries
        const allGeometryIds = line.towers.map((tower) => tower.geometryId);
        const uniqueGeometries = [...new Set(allGeometryIds)];

        // eslint-disable-next-line no-restricted-syntax
        for await (const geometryId of uniqueGeometries) {
            const geometry = await TowerGeometry.findOneByOrFail({
                id: geometryId,
            });
            const geometryClass = new LineGeometry({
                name: `${line.name}_${geometry.name}`,
                nconds: line.conductors.length,
                nphases: line.conductors.length,
                spacing: geometry.name,
                reduce: false,
                wires: wireNames,
            });
            study.add(geometryClass);
        }

        // Transmission Lines
        const fromSource = await Source.findOneByOrFail({
            id: line.fromSource,
        });
        const toSource = line.toSource
            ? await Source.findOneByOrFail({ id: line.toSource })
            : { name: `NOWHERE_${line.name}` };
        const numConductors = line.conductors.length;
        const numNeutrals = line.conductors.filter(
            (conductor) => conductor.isNeutral
        ).length;
        const fromPhases = line.conductors.map((transmissionLine) =>
            transmissionLine.isNeutral
                ? NEUTRAL_PHASE
                : transmissionLine.fromPhase
        );
        const intermediatePhases = line.conductors.map(
            (transmissionLine, index) =>
                transmissionLine.isNeutral ? NEUTRAL_PHASE : index + 1
        );
        const toPhases = line.conductors.map((transmissionLine) =>
            transmissionLine.isNeutral
                ? NEUTRAL_PHASE
                : transmissionLine.toPhase
        );

        const initialPhases = fromPhases.join(".");
        const middlePhases = intermediatePhases.join(".");
        const finalPhases = toPhases.join(".");

        let index = 0;
        // eslint-disable-next-line no-restricted-syntax
        for await (const tower of line.towers) {
            const name = `${line.name}_${tower.name}`;
            const geometry = await TowerGeometry.findOneByOrFail({
                id: tower.geometryId,
            });
            const towerNumber = index + 1;
            if (towerNumber === 1) {
                const lineObject = new Line({
                    name: `${name}_line`,
                    bus1: `B_${fromSource.name}.${initialPhases}`,
                    bus2: `${name}.${middlePhases}`,
                    phases: numConductors,
                    length: tower.distance,
                    units: "km",
                    geometry: `${line.name}_${geometry.name}`,
                });
                const reactorObject = new Reactor({
                    name: `${name}_RT`,
                    bus1: `${name}.${NEUTRAL_PHASE}`,
                    bus2: `${name}.0`,
                    R: tower.resistance,
                    X: 0,
                    phases: 1,
                });
                study.add(lineObject);
                study.add(reactorObject);
                updatedProject.transmissionLines[lineIndex].towers[index].line =
                    lineObject;
                updatedProject.transmissionLines[lineIndex].towers[
                    index
                ].reactor = reactorObject;
            } else {
                const prevName = `${line.name}_${line.towers[index - 1].name}`;
                const lineObject = new Line({
                    name: `${name}_line`,
                    bus1: `${prevName}.${middlePhases}`,
                    bus2: `${name}.${middlePhases}`,
                    length: tower.distance,
                    phases: numConductors,
                    units: "km",
                    geometry: `${line.name}_${geometry.name}`,
                });

                const reactorObject = new Reactor({
                    name: `${name}_RT`,
                    bus1: `${name}.${NEUTRAL_PHASE}`,
                    bus2: `${name}.0`,
                    R: tower.resistance,
                    X: 0,
                    phases: 1,
                });
                study.add(lineObject);
                study.add(reactorObject);
                updatedProject.transmissionLines[lineIndex].towers[index].line =
                    lineObject;
                updatedProject.transmissionLines[lineIndex].towers[
                    index
                ].reactor = reactorObject;

                if (towerNumber === line.towers.length) {
                    const lastLineObject = new Line({
                        name: `${name}_extra_span`,
                        bus1: `${name}.${middlePhases}`,
                        bus2: `B_${toSource.name}.${finalPhases}`,
                        length: tower.distance, // FIXME: This is wrong, assuming the last line to substation is same as previous
                        phases: numConductors,
                        units: "km",
                        geometry: `${line.name}_${geometry.name}`,
                    });
                    study.add(lastLineObject);
                }
            }
            index += 1;
        }
        lineIndex += 1;
    }
    console.log("Circuit built");
    return {
        updatedProject,
        study,
    };
}
