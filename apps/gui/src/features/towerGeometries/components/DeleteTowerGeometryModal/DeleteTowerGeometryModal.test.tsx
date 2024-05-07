import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { Button } from "@repo/ui";
import { createRender, within } from "~test-utils";
import { useDeleteTowerGeometryModal } from "~/utils/modals";
import { getTowerGeometry } from "~tests/helpers/mockData";

describe("Delete Tower Geometry Modal", () => {
    const tower = getTowerGeometry();
    const displayDeleteModal = useDeleteTowerGeometryModal(tower.id);

    const trpcFn = vi.fn().mockResolvedValue(tower);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <Button onClick={displayDeleteModal}>Click here</Button>
        );

        await user.click(utils.getByRole("button", { name: /click here/i }));
        const dialog = await utils.findByRole("alertdialog");

        return { user, ...utils, dialog };
    }

    test("correct API call on confirmation", async () => {
        const { user, dialog } = await setup();

        await user.click(
            within(dialog).getByRole("button", { name: /confirm/i })
        );
        expect(trpcFn).toBeCalledWith("mutation", "towerGeometry.delete", {
            id: tower.id,
        });
        expect(dialog).not.toBeInTheDocument();
    });
    test("doesn't call API on cancel", async () => {
        const { dialog, user } = await setup();

        await user.click(
            within(dialog).getByRole("button", { name: /cancel/i })
        );

        expect(trpcFn).not.toBeCalled();
        expect(dialog).not.toBeInTheDocument();
    });
});
