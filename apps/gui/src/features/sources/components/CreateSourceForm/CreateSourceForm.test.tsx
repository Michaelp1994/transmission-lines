import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, test, vi } from "vitest";

import CreateSourceForm from "./CreateSourceForm";
import { CreateSourceFormInput } from "./FormSchema";
import I18nProvider from "../../../../contexts/I18nProvider";

beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe() {
            // do nothing
        }

        unobserve() {
            // do nothing
        }

        disconnect() {
            // do nothing
        }
    };
});

describe("Create Source Form", () => {
    test("renders form fields and buttons", () => {
        const validHandler = vi.fn();
        const invalidHandler = vi.fn();
        render(
            <I18nProvider>
                <CreateSourceForm
                    onValid={validHandler}
                    onInvalid={invalidHandler}
                />
            </I18nProvider>
        );

        // Assert that form fields are rendered
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Phases")).toBeInTheDocument();
        expect(screen.getByLabelText("Frequency")).toBeInTheDocument();
        expect(screen.getByLabelText("Enabled")).toBeInTheDocument();
        expect(screen.getByLabelText("Voltage")).toBeInTheDocument();
        expect(screen.getByLabelText("X1/R1")).toBeInTheDocument();
        expect(screen.getByLabelText("X0/R0")).toBeInTheDocument();
        expect(
            screen.getByLabelText("Short circuit 3 phase current")
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText("Short circuit 1 phase current")
        ).toBeInTheDocument();
        expect(screen.getByLabelText("Resistance")).toBeInTheDocument();

        // Assert that buttons are rendered
        expect(
            screen.getByRole("button", { name: "Reset" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Submit" })
        ).toBeInTheDocument();
    });

    test("submits form with valid input", async () => {
        const validHandler = vi.fn();
        const invalidHandler = vi.fn();
        const user = userEvent.setup();

        render(
            <I18nProvider>
                <CreateSourceForm
                    onValid={validHandler}
                    onInvalid={invalidHandler}
                />
            </I18nProvider>
        );

        const fakeSource: CreateSourceFormInput = {
            name: faker.word.noun(10),
            enabled: faker.datatype.boolean(),
            phases: faker.number.int(10),
            voltage: faker.number.float({ max: 1000, fractionDigits: 3 }),
            frequency: faker.number.int({ max: 60 }),
            x1r1: faker.number.float({ max: 10, fractionDigits: 2 }),
            x0r0: faker.number.float({ max: 10, fractionDigits: 2 }),
            isc3: faker.number.int(25000),
            isc1: faker.number.int(25000),
            resistance: faker.number.float({ max: 25, fractionDigits: 2 }),
        };

        // Fill in form fields with valid input

        // Name
        await user.clear(screen.getByLabelText("Name"));
        await user.type(screen.getByLabelText("Name"), fakeSource.name);

        // Enabled
        if (
            fakeSource.enabled !==
            !!screen.getByLabelText("Enabled").ariaChecked
        ) {
            await user.click(screen.getByLabelText("Enabled"));
        }

        // Phases
        await user.clear(screen.getByLabelText("Phases"));
        await user.type(
            screen.getByLabelText("Phases"),
            fakeSource.phases.toString()
        );

        // Voltage
        await user.clear(screen.getByLabelText("Voltage"));
        await user.type(
            screen.getByLabelText("Voltage"),
            fakeSource.voltage.toString()
        );

        // Frequency
        await user.clear(screen.getByLabelText("Frequency"));
        await user.type(
            screen.getByLabelText("Frequency"),
            fakeSource.frequency.toString()
        );

        // X1/R1
        await user.clear(screen.getByLabelText("X1/R1"));
        await user.type(
            screen.getByLabelText("X1/R1"),
            fakeSource.x1r1.toString()
        );

        // X0/R0
        await user.clear(screen.getByLabelText("X0/R0"));
        await user.type(
            screen.getByLabelText("X0/R0"),
            fakeSource.x0r0.toString()
        );

        // Short circuit 3 phase current
        await user.clear(
            screen.getByLabelText("Short circuit 3 phase current")
        );
        await user.type(
            screen.getByLabelText("Short circuit 3 phase current"),
            fakeSource.isc3.toString()
        );

        // Short circuit 1 phase current
        await user.clear(
            screen.getByLabelText("Short circuit 1 phase current")
        );
        await user.type(
            screen.getByLabelText("Short circuit 1 phase current"),
            fakeSource.isc1.toString()
        );

        // Resistance
        await user.clear(screen.getByLabelText("Resistance"));
        await user.type(
            screen.getByLabelText("Resistance"),
            fakeSource.resistance.toString()
        );

        // Submit the form
        await user.click(screen.getByRole("button", { name: "Submit" }));
        // Assert that the form is submitted successfully
        // Add your assertions here
        expect(validHandler).toHaveBeenCalledTimes(1);
        expect(validHandler).toHaveBeenCalledWith(fakeSource);
        expect(invalidHandler).toHaveBeenCalledTimes(0);
    });

    test("displays error message for invalid input", async () => {
        const validMockHandler = vi.fn();
        const invalidMockHandler = vi.fn();
        const user = userEvent.setup();

        render(
            <I18nProvider>
                <CreateSourceForm
                    onValid={validMockHandler}
                    onInvalid={invalidMockHandler}
                />
            </I18nProvider>
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
