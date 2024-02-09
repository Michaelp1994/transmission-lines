import * as Math from "mathjs";

import TowerGeometry from "@repo/db/models/TowerGeometry.model";
import ConductorType from "@repo/db/models/ConductorType.model";
import ConductorLocation from "@repo/db/models/ConductorLocation.model";
import TransmissionLine from "@repo/db/models/TransmissionLine.model";

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

export default async function buildTransmissionLineMatrix(id: string) {
    const transmissionLine = await TransmissionLine.findOneBy({ id });
    console.log("Calculating Transmission line parameters...");
    if (!transmissionLine) throw Error("Can't find Transmission Line");
    const u0 = 1.2566370621219 * 10 ** -6; // N/A^2
    const e0 = 8.854187812813 * 10 ** -12; // F/m
    const freq = 60; // Hz
    const resistivity = 100; // # ohm*m
    const resistanceGround = (u0 * 2 * Math.pi * freq) / 8; // ohm/m

    const conductors: ConductorType[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const conductor of transmissionLine.conductors) {
        conductors.push(
            await ConductorType.findOneOrFail({
                where: { id: conductor.typeId },
            })
        );
    }
    // FIXME: for now, lets use the first tower geometry.
    const geometry = await TowerGeometry.findOneOrFail({
        where: { id: transmissionLine.towers[0]?.geometryId },
    });

    const reactanceGround =
        u0 * freq * Math.log(658.5 * (resistivity / freq) ** (1 / 2)); // ohm/m
    const numConductors = transmissionLine.conductors.length;
    const rMatrix = Math.zeros(numConductors, numConductors) as Math.Matrix;
    const xMatrix = Math.zeros(numConductors, numConductors) as Math.Matrix;
    const pMatrix = Math.zeros(numConductors, numConductors) as Math.Matrix;

    // eslint-disable-next-line no-restricted-syntax
    for (const [i, firstConductor] of conductors.entries()) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [j] of conductors.entries()) {
            const imageDistance = calcImageDistance(
                geometry.conductors[i],
                geometry.conductors[j]
            ); // m

            if (i === j) {
                const radius = firstConductor.outerDiameter / 2; // m
                const selfReactance =
                    u0 * freq * Math.log(1 / firstConductor.gmr); // ohm/m
                const resistance =
                    firstConductor.acResistance75 + resistanceGround; // ohm/m
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
                    geometry.conductors[i],
                    geometry.conductors[j]
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
        geometryName: geometry.name,
    };
}
