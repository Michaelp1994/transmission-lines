import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { useDeleteConductorModal } from "~/utils/modals";
import { createRender, screen, within } from "~test-utils";

describe("Delete Conductor Modal", () => {
    const conductorId = faker.string.uuid();
    const trpcFn = vi.fn().mockResolvedValue({ id: conductorId });
    const render = createRender(trpcFn);
    const displayModal = useDeleteConductorModal(conductorId);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <Button onClick={displayModal}>Click Here</Button>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("alertdialog");

        return { user, dialog, ...utils };
    }

    test("correct data is sent to server on confirmation", async () => {
        const { user, dialog } = await setup();

        await user.click(
            within(dialog).getByRole("button", {
                name: /confirm/i,
            })
        );
        expect(trpcFn).toHaveBeenCalledWith("mutation", "conductor.delete", {
            id: conductorId,
        });
        expect(dialog).not.toBeInTheDocument();
    });

    test("no data is sent to server on cancellation", async () => {
        const { user, dialog } = await setup();

        await user.click(
            within(dialog).getByRole("button", {
                name: /cancel/i,
            })
        );
        expect(trpcFn).not.toHaveBeenCalled();
        expect(dialog).not.toBeInTheDocument();
    });
});
