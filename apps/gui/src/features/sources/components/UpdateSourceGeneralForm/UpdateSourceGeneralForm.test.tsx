import { faker } from "@faker-js/faker";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import UpdateSourceGeneralForm from "./UpdateSourceGeneralForm";
import { createRender, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import { createGeneralSource, mockIds } from "~tests/helpers/mockData";

const labels = {
    name: /name/i,
    enabled: /enabled/i,
};

describe("Update Source General Form", () => {
    const sourceId = mockIds.sourceId();
    const source = createGeneralSource();
    const newSource = createGeneralSource();
    const trpcFn = vi.fn().mockResolvedValue(source);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(<UpdateSourceGeneralForm sourceId={sourceId} />);
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
    // TODO: enabled is not working correctly. seems to be always starting true
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
            "source.updateGeneral",
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
            name: faker.string.alpha(),
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
