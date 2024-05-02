import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import ModalProvider from "~/contexts/ModalProvider";
import { useDeleteSourceModal } from "~/utils/modals";
import { render, screen, within } from "~test-utils";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

describe("Delete Source Modal", () => {
    test("correct API call on confirmation", async () => {
        const user = userEvent.setup();
        const sourceId = faker.string.uuid();
        const trpcMockFn = vi.fn(async () => ({ id: sourceId }));

        const displayDeleteModal = useDeleteSourceModal(sourceId);

        render(
            <MockTrpcProvider mockFn={trpcMockFn}>
                <ModalProvider>
                    <Button onClick={displayDeleteModal}>Delete</Button>;
                </ModalProvider>
            </MockTrpcProvider>
        );
        await user.click(screen.getByRole("button", { name: "Delete" }));
        const dialog = await screen.findByRole("alertdialog");

        await user.click(
            within(dialog).getByRole("button", { name: /confirm/i })
        );
        expect(trpcMockFn).toBeCalledWith({
            id: sourceId,
        });
        expect(dialog).not.toBeInTheDocument();
    });
    test("doesn't call API on cancel", async () => {
        const user = userEvent.setup();

        const trpcMockFn = vi.fn(async () => ({ name: "test" }));
        const sourceId = faker.string.uuid();
        const displayDeleteModal = useDeleteSourceModal(sourceId);

        render(
            <MockTrpcProvider mockFn={trpcMockFn}>
                <ModalProvider>
                    <Button onClick={displayDeleteModal}>Delete</Button>;
                </ModalProvider>
            </MockTrpcProvider>
        );
        await user.click(screen.getByRole("button", { name: "Delete" }));
        const dialog = await screen.findByRole("alertdialog");

        await user.click(
            within(dialog).getByRole("button", { name: /cancel/i })
        );

        expect(trpcMockFn).not.toBeCalled();
        expect(dialog).not.toBeInTheDocument();
    });
});
