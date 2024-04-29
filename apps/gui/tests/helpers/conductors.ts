import { faker } from "@faker-js/faker";
import { CreateConductorInput } from "@repo/validators";
import { UserEvent } from "@testing-library/user-event";

import { screen } from "~test-utils";

const labels = {
    name: /name/i,
    fromPhase: /from phase/i,
    toPhase: /to phase/i,
    bundleNumber: /bundle number/i,
    isNeutral: /is neutral/i,
    bundleSpacing: /bundle spacing/i,
    typeId: /conductor type/i,
};

export function createConductor(): CreateConductorInput {
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

export function createConductors(count: number): CreateConductorInput[] {
    return Array.from({ length: count }, createConductor);
}

export async function completeConductorForm(
    user: UserEvent,
    data: CreateConductorInput
) {
    for await (const [property, label] of Object.entries(labels)) {
        const key = property as keyof typeof data;
        const value = String(data[key]);
        const input = screen.getByLabelText(label);
        await user.clear(input);
        await user.type(input, value);
    }
}
