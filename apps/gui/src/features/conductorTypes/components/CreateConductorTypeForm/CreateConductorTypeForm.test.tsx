import { faker } from "@faker-js/faker";
import { describe, expect, test, vi } from "vitest";
import CreateConductorTypeForm from "./CreateConductorTypeForm";
import { render, screen } from "~test-utils";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

const labels = {
    name: /name/i,
    surfaceArea: /surface area/i,
    outerDiameter: /outer diameter/i,
    coreDiameter: /core diameter/i,
    stranding: /stranding/i,
    layers: /layers/i,
    currentCapacity: /current capacity/i,
    dcResistance25: /25° dc/i,
    acResistance25: /25° ac/i,
    acResistance50: /50° ac/i,
    acResistance75: /75° ac/i,
    gmr: /geometric mean radius/i,
};

describe("Create Conductor Type Form", () => {
    test("renders the form", () => {
        const mockFn = vi.fn(() => Promise.resolve());

        render(
            <MockTrpcProvider mockFn={mockFn}>
                <CreateConductorTypeForm />
            </MockTrpcProvider>
        );

        Object.values(labels).forEach((label) => {
            expect(screen.getByLabelText(label)).toBeInTheDocument();
        });
    });
    test("submits the form with correct inputs", async () => {
        const mockFn = vi.fn(() => Promise.resolve());
        const newConductorType = {
            name: faker.string.alpha({ length: { min: 3, max: 20 } }),
            surfaceArea: faker.number.float({ min: 0, max: 100 }),
            outerDiameter: faker.number.float({ min: 0, max: 100 }),
            coreDiameter: faker.number.float({ min: 0, max: 100 }),
            stranding: `${faker.number.int({ min: 1, max: 100 })}/${faker.number.int({ min: 1, max: 100 })}`,
            layers: faker.number.int({ min: 1, max: 100 }),
            currentCapacity: faker.number.float({ min: 0, max: 100 }),
            dcResistance25: faker.number.float({ min: 0, max: 100 }),
            acResistance25: faker.number.float({ min: 0, max: 100 }),
            acResistance50: faker.number.float({ min: 0, max: 100 }),
            acResistance75: faker.number.float({ min: 0, max: 100 }),
            gmr: faker.number.float({ min: 0, max: 100 }),
        };

        render(
            <MockTrpcProvider mockFn={mockFn}>
                <CreateConductorTypeForm />
            </MockTrpcProvider>
        );
    });
});
