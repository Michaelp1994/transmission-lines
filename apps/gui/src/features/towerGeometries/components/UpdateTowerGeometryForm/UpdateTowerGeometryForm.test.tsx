import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import UpdateTowerGeometryForm from "./UpdateTowerGeometryForm";
import { createRender, within } from "~test-utils";
import { getTowerGeometry, mockIds } from "~tests/helpers/mockData";
import completeForm from "~tests/helpers/completeForm";

const labels = {
    name: /name/i,
};

describe("Update Tower Geometry Form", () => {
    const geometryId = mockIds.geometryId();
    const oldTowerGeometry = getTowerGeometry();
    const newTowerGeometry = getTowerGeometry();
    const trpcFn = vi.fn().mockResolvedValue(oldTowerGeometry);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <UpdateTowerGeometryForm geometryId={geometryId} />
        );
        const form = await utils.findByRole("form");

        return { form, user, ...utils };
    }

    test("correctly calls API", async () => {
        await setup();

        expect(trpcFn).toHaveBeenCalledWith("query", "towerGeometry.getById", {
            id: geometryId,
        });
    });

    test("submits form with valid input", async () => {
        const { form, user } = await setup();

        // Fill in the form
        await completeForm(user, form, labels, newTowerGeometry);

        // Submit the form
        const submitBtn = within(form).getByRole("button", { name: /submit/i });

        await user.click(submitBtn);

        // Assert that the form is submitted successfully
        expect(trpcFn).toHaveBeenLastCalledWith(
            "mutation",
            "towerGeometry.update",
            {
                ...newTowerGeometry,
                id: geometryId,
            }
        );
    });

    test("doesn't submits form with invalid input", async () => {
        const { form, user } = await setup();
        const badTowerGeometry = {
            ...newTowerGeometry,
            name: faker.string.alpha(),
        };

        // Fill in the form
        await completeForm(user, form, labels, badTowerGeometry);

        // Submit the form
        const submitBtn = within(form).getByRole("button", { name: /submit/i });

        await user.click(submitBtn);

        // Assert that the form is submitted successfully
        expect(trpcFn).not.toHaveBeenCalledWith(
            "mutation",
            "towerGeometry.update",
            expect.anything()
        );
    });
});
