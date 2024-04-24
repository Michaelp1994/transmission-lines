import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import DeleteSourceModal from "./DeleteSourceModal";
import useDeleteSourceModal from "./useDeleteSourceModal";

import ModalRenderer from "~/components/modals/modal-renderer";
import { render, screen, within } from "~test-utils";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

function ModalButton({ id }: { id: string }) {
    const displayDeleteModal = useDeleteSourceModal(id);

    return <Button onClick={displayDeleteModal}>Delete</Button>;
}

describe("Delete Source Modal", () => {
    test("confirm delete", async () => {
        const user = userEvent.setup();

        const mockCloseFn = vi.fn();
        const mockConfirmFn = vi.fn();

        render(
            <DeleteSourceModal
                onClose={mockCloseFn}
                onConfirm={mockConfirmFn}
            />
        );

        await user.click(screen.getByRole("button", { name: "Confirm" }));
        expect(mockConfirmFn).toBeCalled();
        expect(mockCloseFn).toBeCalled();
    });

    test("cancel delete", async () => {
        const user = userEvent.setup();

        const mockCloseFn = vi.fn();
        const mockConfirmFn = vi.fn();

        render(
            <DeleteSourceModal
                onClose={mockCloseFn}
                onConfirm={mockConfirmFn}
            />
        );

        await user.click(screen.getByRole("button", { name: "Cancel" }));
        expect(mockConfirmFn).not.toBeCalled();
        expect(mockCloseFn).toBeCalled();
    });

    test("trpc call", async () => {
        const user = userEvent.setup();

        const trpcMockFn = vi.fn(async () => ({ name: "test" }));
        const sourceId = faker.string.uuid();

        render(
            <MockTrpcProvider mockFn={trpcMockFn}>
                <ModalRenderer />
                <ModalButton id={sourceId} />
            </MockTrpcProvider>
        );
        await user.click(screen.getByRole("button", { name: "Delete" }));
        const modal = await screen.findByRole("alertdialog");
        await user.click(
            within(modal).getByRole("button", { name: "Confirm" })
        );
        expect(trpcMockFn).toBeCalled();
        expect(trpcMockFn).toBeCalledWith({
            id: sourceId,
        });
    });
});
