import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import ModalProvider from "~/contexts/ModalProvider";
import { useDeleteProjectModal } from "~/utils/modals";
import { render, screen, within } from "~test-utils";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

describe("DeleteProjectModal", () => {
    test("calls correct TRPC call on confirmation", async () => {
        const user = userEvent.setup();
        const mockFn = vi.fn(() => Promise.resolve({ name: "Test Project" }));
        const projectId = faker.string.uuid();
        const displayModal = useDeleteProjectModal(projectId);

        render(
            <MockTrpcProvider mockFn={mockFn}>
                <ModalProvider>
                    <Button onClick={displayModal}>Click Here</Button>
                </ModalProvider>
            </MockTrpcProvider>
        );
        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("alertdialog");
        const confirm = within(dialog).getByRole("button", {
            name: /confirm/i,
        });

        await user.click(confirm);
        expect(mockFn).toHaveBeenCalledWith({ id: projectId });
    });
    test("TRPC is not called on cancel", async () => {
        const user = userEvent.setup();
        const mockFn = vi.fn(() => Promise.resolve({ name: "Test Project" }));
        const projectId = faker.string.uuid();
        const displayModal = useDeleteProjectModal(projectId);

        render(
            <MockTrpcProvider mockFn={mockFn}>
                <ModalProvider>
                    <Button onClick={displayModal}>Click Here</Button>
                </ModalProvider>
            </MockTrpcProvider>
        );
        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("alertdialog");
        const confirm = within(dialog).getByRole("button", {
            name: /cancel/i,
        });

        await user.click(confirm);
        expect(mockFn).not.toBeCalled();
    });
});
