import { describe, expect, test, vi } from "vitest";
import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { createRender, within } from "~test-utils";
import {
    createArray,
    createTower,
    getGeometry,
    mockIds,
} from "~tests/helpers/mockData";
import { useCreateTowerModal } from "~/utils/modals";
import completeForm from "~tests/helpers/completeForm";
import selectAction from "~tests/helpers/selectAction";
import UnreachableError from "~tests/UnreachableError";

const labels = {
    name: /name/i,
    resistance: /resistance/i,
    distance: /distance/i,
    // geometryId: /geometry type/i,
};

describe("Create Tower Modal", () => {
    const lineId = mockIds.lineId();
    const geometries = createArray(10, getGeometry);
    const mockTower = createTower(geometries.map((g) => g.id));
    const trpcFn = vi.fn().mockResolvedValue(mockTower);
    const render = createRender(trpcFn);
    const displayCreateModal = useCreateTowerModal(lineId);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <Button onClick={displayCreateModal}>Click here</Button>
        );

        trpcFn.mockResolvedValue(geometries);
        await user.click(utils.getByRole("button", { name: /click here/i }));
        const modal = await utils.findByRole("dialog");
        const form = await within(modal).findByRole("form");

        return { user, modal, form, ...utils };
    }

    test("should create tower on form submission", async () => {
        const { user, form } = await setup();
        const geometry = geometries.find((g) => g.id === mockTower.geometryId);

        if (!geometry) {
            throw new UnreachableError();
        }

        await completeForm(user, form, labels, mockTower);
        // tower geometry select
        await selectAction(user, form, /geometry type/i, geometry.name);

        await user.click(within(form).getByRole("button", { name: /create/i }));

        expect(trpcFn).toHaveBeenCalledWith("mutation", "tower.create", {
            ...mockTower,
            lineId,
        });
    });
    test("should not create tower on form submission with invalid data", async () => {
        const { user, form } = await setup();
        const geometry = geometries.find((g) => g.id === mockTower.geometryId);

        if (!geometry) {
            throw new UnreachableError();
        }

        await completeForm(user, form, labels, {
            ...mockTower,
            name: faker.string.alpha(),
        });
        // tower geometry select
        await selectAction(user, form, /geometry type/i, geometry.name);

        await user.click(within(form).getByRole("button", { name: /create/i }));

        expect(trpcFn).not.toHaveBeenCalledWith(
            "mutation",
            "tower.create",
            expect.anything()
        );
    });
});
