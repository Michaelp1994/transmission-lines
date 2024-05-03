import { faker } from "@faker-js/faker";
import type { ConductorFormInput } from "@repo/validators/forms/Conductor.schema";
import type { ConductorLocationFormInput } from "@repo/validators/forms/ConductorLocation.schema";
import type { ConductorTypeFormInput } from "@repo/validators/forms/ConductorType.schema";
import type { ProjectFormInput } from "@repo/validators/forms/Project.schema";
import type { SourceFormInput } from "@repo/validators/forms/Source.schema";

export const geometryId = () => faker.string.uuid();

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

export function createMockProject(): ProjectFormInput {
    return {
        name: faker.word.noun({
            length: {
                min: 5,
                max: 20,
            },
        }),
    };
}

export function createSource(): SourceFormInput {
    return {
        id: faker.string.uuid(),
        name: faker.string.alpha({ length: { min: 5, max: 20 } }),
        enabled: faker.datatype.boolean(),
        projectId: faker.string.uuid(),
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

export function createConductorLocation(): ConductorLocationFormInput {
    return {
        x: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
        y: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
    };
}

export function createConductorType(): ConductorTypeFormInput {
    return {
        id: faker.string.uuid(),
        name: faker.string.alpha(10),
    };
}

export function createConductor(): ConductorFormInput {
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
        typeId: faker.string.uuid(),
    };
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

export function createGenerateConductor() {
    return {
        lineId: faker.string.uuid(),
        phases: faker.number.int(),
        circuits: faker.number.int(),
        neutrals: faker.number.int(),
        phaseTypeId: faker.string.uuid(),
        neutralTypeId: faker.string.uuid(),
    };
}

export function createArray<T>(count: number, fn: () => T) {
    return Array.from({ length: count }, fn);
}
