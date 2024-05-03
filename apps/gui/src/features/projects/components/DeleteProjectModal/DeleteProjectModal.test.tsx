import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { useDeleteProjectModal } from "~/utils/modals";
import { createRender, screen, within } from "~test-utils";
import { createMockProject, mockIds } from "~tests/helpers/mockData";

describe("DeleteProjectModal", () => {
    const mockProject = createMockProject();
    const projectId = mockIds.projectId();
    const trpcFn = vi.fn().mockResolvedValue(mockProject);
    const render = createRender(trpcFn);
    const displayModal = useDeleteProjectModal(projectId);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <Button onClick={displayModal}>Click Here</Button>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("alertdialog");

        return { user, utils, dialog };
    }

    test("correct data is sent to server on confirmation", async () => {
        const { user, dialog } = await setup();
        const confirm = within(dialog).getByRole("button", {
            name: /confirm/i,
        });

        await user.click(confirm);
        expect(trpcFn).toHaveBeenCalledWith({ id: projectId });
    });
    test("no data is sent to server on cancellation", async () => {
        const { user, dialog } = await setup();

        const confirm = within(dialog).getByRole("button", {
            name: /cancel/i,
        });

        await user.click(confirm);
        expect(trpcFn).not.toBeCalled();
    });
});
