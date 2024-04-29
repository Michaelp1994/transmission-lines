import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";

import FormHandler from "./FormHandler";

import { render, screen } from "~test-utils";
import { createSource } from "~tests/helpers/createSource";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

const labels = {
    name: /name/i,
    phases: /phases/i,
    frequency: /frequency/i,
    // enabled: /enabled/i,
    voltage: /voltage/i,
    x1r1: /x1\/r1/i,
    x0r0: /x0\/r0/i,
    isc3: /short circuit 3 phase current/i,
    isc1: /short circuit 1 phase current/i,
    resistance: /resistance/i,
} as const;

describe("Create Source Form Handler", () => {
    test("submits form with valid input", async () => {
        const user = userEvent.setup();
        const projectId = faker.string.uuid();
        const trpcFn = vi.fn(async () => ({ id: faker.string.uuid() }));

        render(
            <MockTrpcProvider mockFn={trpcFn}>
                <FormHandler projectId={projectId} />
            </MockTrpcProvider>
        );

        const fakeSource = createSource();

        // Fill in form fields with valid input
        for await (const [property, label] of Object.entries(labels)) {
            const key = property as keyof typeof fakeSource;
            const value = String(fakeSource[key]);
            const input = screen.getByLabelText(label);
            await user.clear(input);
            await user.type(input, value);
        }

        // Enabled
        if (
            fakeSource.enabled !==
            !!screen.getByLabelText("Enabled").ariaChecked
        ) {
            await user.click(screen.getByLabelText("Enabled"));
        }

        // Submit the form
        await user.click(screen.getByRole("button", { name: "Submit" }));
        // Assert that the form is submitted successfully

        // Add your assertions here
        expect(trpcFn).toBeCalled();
        expect(trpcFn).toBeCalledWith({
            ...fakeSource,
            projectId,
        });
    });
});
