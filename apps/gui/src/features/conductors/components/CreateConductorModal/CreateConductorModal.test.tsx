import { Button } from "@repo/ui";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import ModalProvider from "~/contexts/ModalProvider";
import { useCreateConductorModal } from "~/utils/modals";
import { render, screen, within } from "~test-utils";
import {
    completeConductorForm,
    createConductor,
} from "~tests/helpers/conductors";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

// TODO: mockFn is being called for the conductor type select which is erroring.
describe("Create Conductor Modal", () => {
    test("calls correct TRPC call on confirmation", async () => {
        const user = userEvent.setup();
        const newConductor = createConductor();
        const mockFn = vi.fn(() => Promise.resolve(newConductor));
        const displayModal = useCreateConductorModal(newConductor.lineId);
        render(
            <MockTrpcProvider mockFn={mockFn}>
                <ModalProvider>
                    <Button onClick={displayModal}>Click Here</Button>
                </ModalProvider>
            </MockTrpcProvider>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("dialog");

        await completeConductorForm(user, newConductor);

        const confirm = within(dialog).getByRole("button", {
            name: /create/i,
        });

        await user.click(confirm);

        expect(mockFn).toHaveBeenCalledWith(newConductor);
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(dialog).not.toBeInTheDocument();
    });
});
