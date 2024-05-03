import { faker } from "@faker-js/faker";
import type {
    NewProject,
    NewSource,
    NewTransmissionConductor,
    NewTransmissionLine,
    NewTransmissionTower,
} from "@/schemas";

const randomNumber = (length: number) =>
    faker.number.int({ min: 0, max: length - 1 });

export function pickRandom<T>(array: T[]) {
    const chosen = array[randomNumber(array.length)];

    if (!chosen) {
        throw new Error("random number generator failed");
    }

    return chosen;
}

export function createMockProject(): NewProject {
    return {
        name: faker.word.noun({
            length: {
                min: 5,
                max: 20,
            },
        }),
    };
}

export function createMockSource(projectId: string): NewSource {
    return {
        projectId,
        name: faker.string.alpha({ length: { min: 5, max: 20 } }),
        enabled: faker.datatype.boolean(),
        phases: faker.number.int(10),
        voltage: faker.number.float({ min: 1, max: 1000, fractionDigits: 3 }),
        frequency: faker.number.int({ min: 1, max: 60 }),
        x1r1: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
        x0r0: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
        isc3: faker.number.int(25000),
        isc1: faker.number.int(25000),
        resistance: faker.number.float({ min: 1, max: 25, fractionDigits: 2 }),
        x: faker.number.float({ min: 1, max: 25, fractionDigits: 2 }),
        y: faker.number.float({ min: 1, max: 25, fractionDigits: 2 }),
    };
}

export function createMockTransmissionLine(
    projectId: string,
    sources: string[]
): NewTransmissionLine {
    const fromSourceId = pickRandom(sources);

    let toSourceId: string | null = pickRandom(sources);

    if (fromSourceId === toSourceId) {
        toSourceId = null;
    }

    return {
        name: faker.string.alpha({ length: { min: 5, max: 20 } }),
        projectId,
        fromSourceId,
        toSourceId,
    };
}

export function createMockTransmissionConductor(
    lineId: string,
    conductorTypes: string[]
): NewTransmissionConductor {
    const typeId = pickRandom(conductorTypes);

    return {
        lineId,
        typeId,
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
    };
}

export function createMockTransmissionTower(
    lineId: string,
    geometryTypes: string[]
): NewTransmissionTower {
    const geometryId = pickRandom(geometryTypes);

    return {
        lineId,
        geometryId,
        name: faker.string.alpha({ length: { min: 5, max: 20 } }),
        resistance: faker.number.float({
            min: 0.1,
            max: 20,
            fractionDigits: 2,
        }),
        distance: faker.number.float({
            min: 0.1,
            max: 20,
            fractionDigits: 2,
        }),
    };
}
