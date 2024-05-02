import type { ConductorLocation } from "@repo/db/schemas/conductorLocations";
import type { ConductorType } from "@repo/db/schemas/conductorTypes";
import type { TowerGeometry } from "@repo/db/schemas/towerGeometries";
import type { TransmissionConductor } from "@repo/db/schemas/transmissionConductors";
import * as Math from "mathjs";

function calcDistance(
    conductor1: ConductorLocation,
    conductor2: ConductorLocation
) {
    return Math.sqrt(
        (conductor2.x - conductor1.x) ** 2 + (conductor2.y - conductor1.y) ** 2
    );
}

function calcImageDistance(
    conductor1: ConductorLocation,
    conductor2: ConductorLocation
) {
    return Math.sqrt(
        (conductor2.x - conductor1.x) ** 2 +
            (-1 * conductor2.y - conductor1.y) ** 2
    );
}

type TowerGeometryWithLocations = TowerGeometry & {
    conductors: ConductorLocation[];
};
type TransmissionConductorWithTypes = TransmissionConductor & {
    type: ConductorType;
};

export default function buildTransmissionLineMatrix(
    geometry: TowerGeometryWithLocations,
    conductors: TransmissionConductorWithTypes[]
) {
    console.log("Calculating Transmission line parameters...");
    const u0 = 1.2566370621219 * 10 ** -6; // N/A^2
    const e0 = 8.854187812813 * 10 ** -12; // F/m
    const freq = 60; // Hz
    const resistivity = 100; // # ohm*m
    const resistanceGround = (u0 * 2 * Math.pi * freq) / 8; // ohm/m

    const reactanceGround =
        u0 * freq * Math.log(658.5 * (resistivity / freq) ** (1 / 2)); // ohm/m

    const numConductors = conductors.length;
    const rMatrix = Math.zeros(numConductors, numConductors) as Math.Matrix;
    const xMatrix = Math.zeros(numConductors, numConductors) as Math.Matrix;
    const pMatrix = Math.zeros(numConductors, numConductors) as Math.Matrix;

     
    for (const [i, firstConductor] of conductors.entries()) {
         
        for (const [j, secondConductor] of conductors.entries()) {
            const imageDistance = calcImageDistance(
                geometry.conductors[i]!,
                geometry.conductors[j]!
            ); // m

            if (i === j) {
                const radius = firstConductor.type.outerDiameter / 2; // m
                const selfReactance =
                    u0 * freq * Math.log(1 / firstConductor.type.gmr); // ohm/m
                const resistance =
                    firstConductor.type.acResistance75 + resistanceGround; // ohm/m
                const reactance = selfReactance + reactanceGround; // ohm/m
                const elastance = Math.multiply(
                    (1 / (2 * Math.pi * e0)) * 10 ** -9,
                    Math.log(Math.divide(imageDistance, radius) as number)
                ); // m/nF

                xMatrix.subset(Math.index(i, i), reactance);
                rMatrix.subset(Math.index(i, i), resistance);
                pMatrix.subset(Math.index(i, i), elastance);
            } else {
                const conductorDistance = calcDistance(
                    geometry.conductors[i]!,
                    geometry.conductors[j]!
                ); // m
                const mutualReactance = Math.multiply(
                    u0 * freq,
                    Math.log(Math.divide(1, conductorDistance) as number)
                ); // ohm/m
                const resistance = resistanceGround; // ohm/m
                const reactance = mutualReactance + reactanceGround; // ohm/m
                const elastance =
                    (1 / (2 * Math.pi * e0)) *
                    Math.log(
                        Math.divide(imageDistance, conductorDistance) as number
                    ) *
                    10 ** -9; // m/nF

                xMatrix.subset(Math.index(i, j), reactance);
                rMatrix.subset(Math.index(i, j), resistance);
                pMatrix.subset(Math.index(i, j), elastance);
            }
        }
    }
    const cMatrix = Math.inv(pMatrix); // nF/m

    return {
        rMatrix: rMatrix.toArray(),
        xMatrix: xMatrix.toArray(),
        cMatrix: cMatrix.toArray(),
    };
}
