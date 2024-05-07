import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { useDeleteConductorTypeModal } from "~/utils/modals";
import { createRender, screen, within } from "~test-utils";

describe("Delete Conductor Type Modal", () => {
    const conductorTypeId = faker.string.uuid();
    const trpcFn = vi.fn().mockResolvedValue({ id: conductorTypeId });
    const render = createRender(trpcFn);
    const displayModal = useDeleteConductorTypeModal(conductorTypeId);

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
        expect(trpcFn).toHaveBeenCalledWith(
            "mutation",
            "conductorType.delete",
            {
                id: conductorTypeId,
            }
        );
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
