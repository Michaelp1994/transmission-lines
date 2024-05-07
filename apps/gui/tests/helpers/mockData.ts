import { faker } from "@faker-js/faker";
import type {
    ConductorFormInput,
    GenerateConductorsFormInput,
} from "@repo/validators/forms/Conductor.schema";
import type { ConductorLocationFormInput } from "@repo/validators/forms/ConductorLocation.schema";
import type { ConductorTypeFormInput } from "@repo/validators/forms/ConductorType.schema";
import type { ProjectFormInput } from "@repo/validators/forms/Project.schema";
import type { SourceFormInput } from "@repo/validators/forms/Source.schema";
import type { TowerGeometryFormInput } from "@repo/validators/forms/TowerGeometry.schema";
import type { TransmissionLineFormInput } from "@repo/validators/forms/TransmissionLine.schema";
import type {
    GenerateTowersFormInput,
    TransmissionTowerFormInput,
} from "@repo/validators/forms/TransmissionTower.schema";

const randomElement = (length: number) =>
    faker.number.int({ min: 0, max: length - 1 });

export function pickRandomArrayElement<T>(array: T[]) {
    const chosen = array[randomElement(array.length)];

    if (!chosen) {
        throw new Error("random number generator failed");
    }

    return chosen;
}

export const mockIds = {
    geometryId: () => faker.string.uuid(),
    sourceId: () => faker.string.uuid(),
    projectId: () => faker.string.uuid(),
    lineId: () => faker.string.uuid(),
    conductorTypeId: () => faker.string.uuid(),
    conductorId: () => faker.string.uuid(),
    towerId: () => faker.string.uuid(),
    locationId: () => faker.number.int(), // conductor Location
};

export function createProject(): ProjectFormInput {
    return {
        name: faker.word.noun({
            length: {
                min: 5,
                max: 20,
            },
        }),
    };
}

export function createElectricalSource() {
    return {
        phases: faker.number.int({ min: 1, max: 10 }),
        voltage: faker.number.float({ min: 1, max: 1000, fractionDigits: 3 }),
        frequency: faker.number.int({ min: 1, max: 60 }),
        x1r1: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
        x0r0: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
        isc3: faker.number.int(25000),
        isc1: faker.number.int(25000),
        resistance: faker.number.float({ min: 1, max: 25, fractionDigits: 2 }),
    };
}

export function createGeneralSource() {
    return {
        name: faker.word.noun({
            length: {
                min: 5,
                max: 20,
            },
        }),
        enabled: faker.datatype.boolean(),
    };
}

export function createSource(): SourceFormInput {
    const electrical = createElectricalSource();
    const general = createGeneralSource();

    return {
        ...general,
        ...electrical,
    };
}

export function getSource() {
    const source = createSource();

    return {
        ...source,
        id: faker.string.uuid(),
        x: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
        y: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
    };
}

export function createTransmissionLine(
    sourceIds?: string[]
): TransmissionLineFormInput {
    const fromSourceId = sourceIds
        ? pickRandomArrayElement(sourceIds)
        : faker.string.uuid();
    const toSourceId = sourceIds
        ? pickRandomArrayElement(sourceIds)
        : faker.string.uuid();

    return {
        name: faker.word.noun({
            length: {
                min: 5,
                max: 20,
            },
        }),
        fromSourceId,
        toSourceId,
    };
}

export function getTransmissionLine(sourceIds?: string[]) {
    const transmissionLine = createTransmissionLine(sourceIds);

    return {
        id: faker.string.uuid(),
        projectId: faker.string.uuid(),
        fromSource: {
            name: faker.word.noun({
                length: {
                    min: 5,
                    max: 20,
                },
            }),
        },
        toSource: {
            name: faker.word.noun({
                length: {
                    min: 5,
                    max: 20,
                },
            }),
        },
        ...transmissionLine,
    };
}
export function createConductorLocation(): ConductorLocationFormInput {
    return {
        x: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
        y: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
    };
}

export function createConductorType(): ConductorTypeFormInput {
    return {
        name: faker.word.noun({
            length: {
                min: 5,
                max: 20,
            },
        }),
        acResistance75: faker.number.float(10),
        gmr: faker.number.float(),
        outerDiameter: faker.number.float(10),
        acResistance25: faker.number.float(10),
        acResistance50: faker.number.float(10),
        coreDiameter: faker.number.float(10),
        currentCapacity: faker.number.float(10),
        dcResistance25: faker.number.float(10),
        layers: faker.number.int(10),
        stranding: `${faker.string.numeric(10)}/ ${faker.string.numeric(10)}`,
        surfaceArea: faker.number.float(10),
    };
}

export function getConductorType() {
    const conductorType = createConductorType();

    return {
        id: faker.string.uuid(),
        ...conductorType,
    };
}

export function createConductor(
    conductorTypeIds: ReturnType<typeof getConductorType>[]
): [ConductorFormInput, ReturnType<typeof getConductorType>] {
    const type = pickRandomArrayElement(conductorTypeIds);

    return [
        {
            name: faker.word.noun({
                length: {
                    min: 5,
                    max: 20,
                },
            }),
            fromPhase: faker.number.int({ min: 1, max: 20 }),
            toPhase: faker.number.int({ min: 1, max: 20 }),
            bundleNumber: faker.number.int({ min: 1, max: 20 }),
            isNeutral: faker.datatype.boolean(),
            bundleSpacing: faker.number.float({
                min: 0.1,
                max: 20,
                fractionDigits: 2,
            }),
            typeId: type.id,
        },
        type,
    ];
}

export function createConductorTable() {
    return {
        lineId: faker.string.uuid(),
        name: faker.string.alpha({ length: { min: 5, max: 20 } }),
        fromPhase: faker.number.int({ min: 1, max: 20 }),
        toPhase: faker.number.int({ min: 1, max: 20 }),
        bundleNumber: faker.number.int({ min: 1, max: 20 }),
        isNeutral: faker.datatype.boolean(),
        bundleSpacing: faker.number.float({
            min: 0.1,
            max: 20,
            fractionDigits: 2,
        }),
        type: {
            name: faker.string.alpha(10),
        },
    };
}

export function createGenerateConductor(
    typeIds: ReturnType<typeof getConductorType>[]
): [
    GenerateConductorsFormInput,
    ReturnType<typeof getConductorType>,
    ReturnType<typeof getConductorType>,
] {
    const phaseType = pickRandomArrayElement(typeIds);
    const neutralType = pickRandomArrayElement(typeIds);

    return [
        {
            phases: faker.number.int(),
            circuits: faker.number.int(),
            neutrals: faker.number.int(),
            phaseTypeId: phaseType.id,
            neutralTypeId: neutralType.id,
        },
        phaseType,
        neutralType,
    ];
}

export function createGenerateTowers(
    geometries: ReturnType<typeof getGeometry>[]
): [GenerateTowersFormInput, ReturnType<typeof getGeometry>] {
    const geometry = pickRandomArrayElement(geometries);

    return [
        {
            namePrefix: faker.string.alpha(),
            distance: faker.number.float({ min: 1, max: 100 }),
            numTowers: faker.number.int({ min: 1, max: 20 }),
            resistance: faker.number.int({ min: 1, max: 20 }),
            geometryId: geometry.id,
        },
        geometry,
    ];
}

export function getGeometry() {
    return {
        id: faker.string.uuid(),
        name: faker.word.noun({
            length: {
                min: 5,
                max: 20,
            },
        }),
    };
}

export function createTower(
    geometryIds?: string[]
): TransmissionTowerFormInput {
    const geometryId = geometryIds
        ? pickRandomArrayElement(geometryIds)
        : faker.string.uuid();

    return {
        name: faker.word.noun({
            length: {
                min: 5,
                max: 20,
            },
        }),
        resistance: faker.number.float({ min: 1, max: 25, fractionDigits: 2 }),
        distance: faker.number.float({ min: 1, max: 200, fractionDigits: 2 }),
        geometryId,
    };
}

export function getTower(geometryIds?: string[]) {
    return {
        id: faker.string.uuid(),
        geometry: {
            name: faker.word.noun({ length: { min: 5, max: 20 } }),
        },
        ...createTower(geometryIds),
    };
}

export function createTowerGeometry(): TowerGeometryFormInput {
    return {
        name: faker.word.noun({
            length: {
                min: 3,
                max: 20,
            },
        }),
    };
}

export function getTowerGeometry() {
    return {
        id: faker.string.uuid(),
        ...createTowerGeometry(),
    };
}

export function createArray<T>(count: number, fn: () => T) {
    return Array.from({ length: count }, fn);
}
