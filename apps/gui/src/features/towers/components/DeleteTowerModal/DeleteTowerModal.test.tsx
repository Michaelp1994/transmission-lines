import { describe, expect, test, vi } from "vitest";
import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { mockIds } from "~tests/helpers/mockData";
import { useDeleteTowerModal } from "~/utils/modals";
import { createRender, within } from "~tests/utils/test-utils";

describe("Delete Tower Modal", () => {
    const towerId = mockIds.towerId();
    const displayDeleteModal = useDeleteTowerModal(towerId);

    const trpcFn = vi.fn().mockResolvedValue(towerId);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <Button onClick={displayDeleteModal}>Click here</Button>
        );

        await user.click(utils.getByRole("button", { name: /click here/i }));
        const dialog = await utils.findByRole("alertdialog");

        return { user, dialog, ...utils };
    }

    test("correct API call on confirmation", async () => {
        const { user, dialog } = await setup();

        await user.click(
            within(dialog).getByRole("button", { name: /confirm/i })
        );
        expect(trpcFn).toBeCalledWith("mutation", "tower.delete", {
            id: towerId,
        });

        expect(dialog).not.toBeInTheDocument();
    });

    test("no API call on cancellation", async () => {
        const { user, dialog } = await setup();

        await user.click(
            within(dialog).getByRole("button", { name: /cancel/i })
        );

        expect(trpcFn).not.toBeCalled();
        expect(dialog).not.toBeInTheDocument();
    });
});
