import { faker } from "@faker-js/faker";

export function createSourceElectrical() {
    return {
        phases: faker.number.int(10),
        voltage: faker.number.float({ max: 1000, fractionDigits: 3 }),
        frequency: faker.number.int({ max: 60 }),
        x1r1: faker.number.float({ max: 10, fractionDigits: 2 }),
        x0r0: faker.number.float({ max: 10, fractionDigits: 2 }),
        isc3: faker.number.int(25000),
        isc1: faker.number.int(25000),
        resistance: faker.number.float({ max: 25, fractionDigits: 2 }),
    };
}

export function createSourceGeneral() {
    return {
        name: faker.string.alpha({ length: { min: 5, max: 20 } }),
        enabled: faker.datatype.boolean(),
    };
}

export function createSource() {
    return {
        ...createSourceGeneral(),
        ...createSourceElectrical(),
    };
}

export function createFullSource() {
    return {
        id: faker.string.uuid(),
        projectId: faker.string.uuid(),
        ...createSource(),
        ...createSourceElectrical(),
    };
}

export function createSources(count: number) {
    return Array.from({ length: count }, createFullSource);
}
