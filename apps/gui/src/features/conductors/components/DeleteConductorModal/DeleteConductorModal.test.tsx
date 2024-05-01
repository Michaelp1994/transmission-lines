import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import ModalProvider from "~/contexts/ModalProvider";
import { useDeleteConductorModal } from "~/utils/modals";
import { render, screen, within } from "~test-utils";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

describe("Delete Conductor Modal", () => {
    test("correct data is sent to server on confirmation", async () => {
        const user = userEvent.setup();
        const conductorId = faker.string.uuid();
        const mockFn = vi.fn(() => Promise.resolve({ id: conductorId }));
        const displayModal = useDeleteConductorModal(conductorId);
        render(
            <MockTrpcProvider mockFn={mockFn}>
                <ModalProvider>
                    <Button onClick={displayModal}>Click Here</Button>
                </ModalProvider>
            </MockTrpcProvider>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("alertdialog");

        await user.click(
            within(dialog).getByRole("button", {
                name: /confirm/i,
            })
        );
        expect(mockFn).toHaveBeenCalledWith({
            id: conductorId,
        });
        expect(dialog).not.toBeInTheDocument();
    });
    test("no data is sent to server on cancellation", async () => {
        const user = userEvent.setup();
        const conductorId = faker.string.uuid();
        const mockFn = vi.fn(() => Promise.resolve({ id: conductorId }));
        const displayModal = useDeleteConductorModal(conductorId);
        render(
            <MockTrpcProvider mockFn={mockFn}>
                <ModalProvider>
                    <Button onClick={displayModal}>Click Here</Button>
                </ModalProvider>
            </MockTrpcProvider>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("alertdialog");

        await user.click(
            within(dialog).getByRole("button", {
                name: /cancel/i,
            })
        );
        expect(mockFn).not.toHaveBeenCalled();
        expect(dialog).not.toBeInTheDocument();
    });
});
