import { faker } from "@faker-js/faker";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import UpdateSourceElectricalForm from "./UpdateSourceElectricalForm";
import { createRender, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import { createElectricalSource } from "~tests/helpers/mockData";

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
    const sourceId = faker.string.uuid();
    const source = createElectricalSource();
    const newSource = createElectricalSource();
    const trpcFn = vi.fn().mockResolvedValue(source);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <UpdateSourceElectricalForm sourceId={sourceId} />
        );
        const form = await utils.findByRole("form");

        return { form, user, ...utils };
    }

    test("correctly calls API", async () => {
        await setup();
        expect(trpcFn).toHaveBeenCalledTimes(1);
        expect(trpcFn).toHaveBeenCalledWith("query", "source.getById", {
            id: sourceId,
        });
    });

    test("correct form data", async () => {
        const { form } = await setup();

        expect(form).toHaveFormValues(source);
    });

    test("submits form with valid input", async () => {
        const { form, user } = await setup();

        trpcFn.mockClear();
        // Fill in the form
        await completeForm(user, form, labels, newSource);
        // Submit the form
        const submitBtn = within(form).getByRole("button", { name: /submit/i });

        await user.click(submitBtn);

        // Assert that the form is submitted successfully
        expect(trpcFn).toHaveBeenCalledTimes(1);
        expect(trpcFn).toHaveBeenLastCalledWith(
            "mutation",
            "source.updateElectrical",
            {
                ...newSource,
                id: sourceId,
            }
        );
    });

    test("displays error message for invalid input", async () => {
        const { form, user } = await setup();

        trpcFn.mockClear();
        const badSource = {
            ...newSource,
            phases: 0,
        };

        // Fill in the form
        await completeForm(user, form, labels, badSource);
        // Submit the form
        const submitBtn = within(form).getByRole("button", { name: /submit/i });

        await user.click(submitBtn);

        // Assert that the form is not submitted.
        expect(trpcFn).not.toHaveBeenCalled();
    });
});
