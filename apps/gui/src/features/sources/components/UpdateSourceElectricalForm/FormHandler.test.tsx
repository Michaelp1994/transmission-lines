import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import FormHandler from "./FormHandler";

import { render, screen, waitForElementToBeRemoved } from "~test-utils";
import { createSourceElectrical } from "~tests/helpers/createSource";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

const labels = {
    phases: /phases/i,
    frequency: /frequency/i,
    voltage: /voltage/i,
    x1r1: /x1\/r1/i,
    x0r0: /x0\/r0/i,
    isc3: /short circuit 3 phase current/i,
    isc1: /short circuit 1 phase current/i,
    resistance: /resistance/i,
};

describe("Update Source Form", () => {
    test("submits form with valid input", async () => {
        const sourceId = faker.string.uuid();
        const source = createSourceElectrical();
        const newSource = createSourceElectrical();
        const mockTrpcFn = vi.fn(async () => source);
        render(
            <MockTrpcProvider mockFn={mockTrpcFn}>
                <FormHandler sourceId={sourceId} />
            </MockTrpcProvider>
        );

        await waitForElementToBeRemoved(screen.queryByText(/Loading/i));
        expect(mockTrpcFn).toHaveBeenCalledWith({ id: sourceId });

        // Assert that the form is filled with the source data
        for await (const [property, label] of Object.entries(labels)) {
            const key = property as keyof typeof source;
            const input = screen.getByLabelText(label);
            expect(input).toHaveValue(source[key]);
        }

        // Fill in the form
        for await (const [property, label] of Object.entries(labels)) {
            const key = property as keyof typeof newSource;
            const newValue = String(newSource[key]);
            const input = screen.getByLabelText(label);
            await userEvent.clear(input);
            await userEvent.type(input, newValue);
        }

        // Submit the form
        await userEvent.click(screen.getByRole("button", { name: "Submit" }));

        // Assert that the form is submitted successfully
        // expect(mockTrpcFn).toHaveBeenCalled();
        expect(mockTrpcFn).toHaveBeenLastCalledWith({
            ...newSource,
            id: sourceId,
        });
    });
});
