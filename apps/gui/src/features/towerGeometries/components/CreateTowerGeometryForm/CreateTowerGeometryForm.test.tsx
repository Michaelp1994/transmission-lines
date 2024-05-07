import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import CreateTowerGeometryForm from "./CreateTowerGeometryForm";
import { createRender, within } from "~test-utils";
import { createTowerGeometry } from "~tests/helpers/mockData";
import completeForm from "~tests/helpers/completeForm";

const labels = {
    name: /name/i,
};

describe("CreateTowerGeometryForm", () => {
    const towerGeometry = createTowerGeometry();
    const trpcFn = vi.fn().mockResolvedValue(towerGeometry);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(<CreateTowerGeometryForm />);
        const form = await utils.findByRole("form");
        const submitBtn = within(form).getByRole("button", { name: /submit/i });

        return { user, form, submitBtn, ...utils };
    }

    test("submits form with valid input", async () => {
        const { form, user, submitBtn } = await setup();
        // Fill in form fields with valid input

        await completeForm(user, form, labels, towerGeometry);
        // Submit the form
        await user.click(submitBtn);
        // Assert that the form is submitted successfully
        expect(trpcFn).toBeCalledWith(
            "mutation",
            "towerGeometry.create",
            towerGeometry
        );
    });
    test("submits form with invalid input", async () => {
        const { form, user, submitBtn } = await setup();
        // Fill in form fields with valid input
        const badTowerGeometry = {
            ...towerGeometry,
            name: faker.string.alpha(),
        };

        await completeForm(user, form, labels, badTowerGeometry);
        // Submit the form
        await user.click(submitBtn);
        // Assert that the form is submitted successfully
        expect(trpcFn).not.toBeCalledWith(
            "mutation",
            "towerGeometry.create",
            expect.anything()
        );
    });
});
