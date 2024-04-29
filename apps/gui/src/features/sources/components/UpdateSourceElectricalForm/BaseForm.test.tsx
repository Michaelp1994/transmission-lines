import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import Form from "./BaseForm";

import { render, screen } from "~test-utils";
import { createSourceElectrical } from "~tests/helpers/createSource";

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
    test("renders form fields and buttons", () => {
        const validHandler = vi.fn();
        const invalidHandler = vi.fn();
        const source = createSourceElectrical();
        render(
            <Form
                data={source}
                onValid={validHandler}
                onInvalid={invalidHandler}
            />
        );

        // Assert that form fields are rendered
        Object.values(labels).forEach((label) => {
            expect(screen.getByLabelText(label)).toBeInTheDocument();
        });

        // Assert that buttons are rendered
        expect(
            screen.getByRole("button", { name: "Reset" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Submit" })
        ).toBeInTheDocument();
    });

    test("renders old data", async () => {
        const validHandler = vi.fn();
        const invalidHandler = vi.fn();
        const source = createSourceElectrical();
        render(
            <Form
                data={source}
                onValid={validHandler}
                onInvalid={invalidHandler}
            />
        );

        // Assert that form fields are rendered
        Object.values(labels).forEach((label) => {
            expect(screen.getByLabelText(label)).toHaveValue();
        });

        for await (const [property, label] of Object.entries(labels)) {
            const key = property as keyof typeof source;
            const value = source[key];
            expect(screen.getByLabelText(label)).toHaveValue(value);
        }
    });

    test("submits form with valid input", async () => {
        const validHandler = vi.fn();
        const invalidHandler = vi.fn();
        const source = createSourceElectrical();
        const newSource = createSourceElectrical();
        render(
            <Form
                data={source}
                onValid={validHandler}
                onInvalid={invalidHandler}
            />
        );

        for await (const [property, label] of Object.entries(labels)) {
            const key = property as keyof typeof newSource;
            const value = String(newSource[key]);
            const input = screen.getByLabelText(label);
            await userEvent.clear(input);
            await userEvent.type(input, value);
        }

        // Submit the form
        await userEvent.click(screen.getByRole("button", { name: "Submit" }));

        // Assert that the form is submitted successfully
        expect(invalidHandler).not.toHaveBeenCalled();
        expect(validHandler).toHaveBeenCalledWith(newSource);
    });

    test("doesn't submit form with invalid input", async () => {
        const validHandler = vi.fn();
        const invalidHandler = vi.fn();
        const source = createSourceElectrical();
        render(
            <Form
                data={source}
                onValid={validHandler}
                onInvalid={invalidHandler}
            />
        );

        const input = screen.getByLabelText(/phases/i);
        // Fill in the form fields
        await userEvent.clear(input);
        await userEvent.type(input, "-1");

        // Submit the form
        await userEvent.click(screen.getByRole("button", { name: "Submit" }));
        expect(invalidHandler).toHaveBeenCalled();
        expect(validHandler).not.toHaveBeenCalled();
    });
});
