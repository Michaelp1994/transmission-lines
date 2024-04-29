import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import BaseForm from "./BaseForm";

import { render, screen } from "~test-utils";
import { createSource } from "~tests/helpers/createSource";

const labels = {
    name: /name/i,
    phases: /phases/i,
    frequency: /frequency/i,
    voltage: /voltage/i,
    x1r1: /x1\/r1/i,
    x0r0: /x0\/r0/i,
    isc3: /short circuit 3 phase current/i,
    isc1: /short circuit 1 phase current/i,
    resistance: /resistance/i,
};

describe("Create Source Form", () => {
    test("renders form fields and buttons", () => {
        const validHandler = vi.fn();
        const invalidHandler = vi.fn();
        render(<BaseForm onValid={validHandler} onInvalid={invalidHandler} />);

        // Assert that form fields are rendered
        Object.values(labels).forEach((label) => {
            expect(screen.getByLabelText(label)).toBeInTheDocument();
        });

        // Assert that buttons are rendered
        ["Reset", "Submit"].forEach((buttonText) => {
            expect(
                screen.getByRole("button", { name: buttonText })
            ).toBeInTheDocument();
        });
    });

    test("submits form with valid input", async () => {
        const user = userEvent.setup();

        const validHandler = vi.fn();
        const invalidHandler = vi.fn();

        render(<BaseForm onValid={validHandler} onInvalid={invalidHandler} />);

        const fakeSource = createSource();

        // Fill in form fields with valid input
        for await (const [property, label] of Object.entries(labels)) {
            const key = property as keyof typeof fakeSource;
            const value = String(fakeSource[key]);
            const input = screen.getByLabelText(label);
            await user.clear(input);
            await user.type(input, value);
        }

        // Check or uncheck the enabled checkbox
        if (
            fakeSource.enabled !==
            !!screen.getByLabelText("Enabled").ariaChecked
        ) {
            await user.click(screen.getByLabelText("Enabled"));
        }

        // Submit the form
        await user.click(screen.getByRole("button", { name: "Submit" }));
        // Assert that the form is submitted successfully
        expect(invalidHandler).toHaveBeenCalledTimes(0);

        expect(validHandler).toHaveBeenCalledTimes(1);
        expect(validHandler).toHaveBeenCalledWith(fakeSource);
    });

    test("displays error message for invalid input", async () => {
        const validMockHandler = vi.fn();
        const invalidMockHandler = vi.fn();
        const user = userEvent.setup();

        render(
            <BaseForm
                onValid={validMockHandler}
                onInvalid={invalidMockHandler}
            />
        );

        await user.type(screen.getByLabelText("Name"), " ");
        // Fill in form fields with invalid input

        // Submit the form
        await user.click(screen.getByRole("button", { name: "Submit" }));

        // Assert that Input is invalid
        expect(screen.getByLabelText("Name")).toBeInvalid();
        // expect(screen).toHaveAttribute()
        expect(validMockHandler).toHaveBeenCalledTimes(0);
        expect(invalidMockHandler).toHaveBeenCalledTimes(1);
        expect(invalidMockHandler).toMatchInlineSnapshot(`
          [MockFunction spy] {
            "calls": [
              [
                {
                  "name": {
                    "message": "String must contain at least 2 character(s)",
                    "ref": {
                      "focus": [Function],
                      "reportValidity": [Function],
                      "select": [Function],
                      "setCustomValidity": [Function],
                    },
                    "type": "too_small",
                  },
                },
              ],
            ],
            "results": [
              {
                "type": "return",
                "value": undefined,
              },
            ],
          }
        `);
    });
});
