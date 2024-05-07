import { describe, expect, test, vi } from "vitest";
import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { createRender, within } from "~test-utils";
import { useUpdateTowerModal } from "~/utils/modals";
import {
    mockIds,
    createArray,
    getGeometry,
    createTower,
} from "~tests/helpers/mockData";
import completeForm from "~tests/helpers/completeForm";
import selectAction from "~tests/helpers/selectAction";
import UnreachableError from "~tests/UnreachableError";

const labels = {
    name: /name/i,
    resistance: /resistance/i,
    distance: /distance/i,
};

describe("Update Tower Modal", () => {
    const towerId = mockIds.towerId();
    const geometries = createArray(10, getGeometry);
    const oldTower = createTower(geometries.map((g) => g.id));
    const newTower = createTower(geometries.map((g) => g.id));
    const trpcFn = vi.fn().mockResolvedValue(oldTower);
    const render = createRender(trpcFn);
    const displayUpdateModal = useUpdateTowerModal(towerId);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <Button onClick={displayUpdateModal}>Click here</Button>
        );

        trpcFn.mockResolvedValueOnce(oldTower);
        trpcFn.mockResolvedValueOnce(geometries);

        await user.click(utils.getByRole("button", { name: /click here/i }));
        const modal = await utils.findByRole("dialog");
        const form = await within(modal).findByRole("form");

        return { user, modal, form, ...utils };
    }

    test("should call the correct TRPC and display old information", async () => {
        await setup();

        expect(trpcFn).toHaveBeenCalledWith("query", "tower.getById", {
            id: towerId,
        });
        // expect(form).toHaveFormValues(oldTower);
    });

    test("should update tower on form submission", async () => {
        const { user, form } = await setup();
        const geometry = geometries.find((g) => g.id === newTower.geometryId);

        if (!geometry) {
            throw new UnreachableError();
        }

        await completeForm(user, form, labels, newTower);
        // tower geometry select
        await selectAction(user, form, /geometry type/i, geometry.name);

        await user.click(within(form).getByRole("button", { name: /update/i }));

        expect(trpcFn).toHaveBeenCalledWith("mutation", "tower.update", {
            ...newTower,
            id: towerId,
        });
    });
    test("should not update tower on form submission with invalid data", async () => {
        const { user, form } = await setup();
        const geometry = geometries.find((g) => g.id === newTower.geometryId);

        if (!geometry) {
            throw new UnreachableError();
        }

        await completeForm(user, form, labels, {
            ...newTower,
            name: faker.string.alpha(),
        });
        // tower geometry select
        await selectAction(user, form, /geometry type/i, geometry.name);

        await user.click(within(form).getByRole("button", { name: /update/i }));

        expect(trpcFn).not.toHaveBeenCalledWith(
            "mutation",
            "tower.update",
            expect.anything()
        );
    });
});
