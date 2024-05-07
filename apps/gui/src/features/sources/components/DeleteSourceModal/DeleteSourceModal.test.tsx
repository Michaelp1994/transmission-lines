import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { useDeleteSourceModal } from "~/utils/modals";
import { createRender, screen, within } from "~test-utils";
import { getSource } from "~tests/helpers/mockData";

describe("Delete Source Modal", () => {
    const source = getSource();

    const displayDeleteModal = useDeleteSourceModal(source.id);

    const trpcMockFn = vi.fn().mockResolvedValue(source);
    const render = createRender(trpcMockFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <Button onClick={displayDeleteModal}>Click here</Button>
        );

        await user.click(utils.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("alertdialog");

        return { user, ...utils, dialog };
    }

    test("correct API call on confirmation", async () => {
        const { dialog, user } = await setup();

        await user.click(
            within(dialog).getByRole("button", { name: /confirm/i })
        );
        expect(trpcMockFn).toBeCalledWith("mutation", "source.delete", {
            id: source.id,
        });
        expect(dialog).not.toBeInTheDocument();
    });
    test("doesn't call API on cancel", async () => {
        const { dialog, user } = await setup();

        await user.click(
            within(dialog).getByRole("button", { name: /cancel/i })
        );

        expect(trpcMockFn).not.toBeCalled();
        expect(dialog).not.toBeInTheDocument();
    });
});
