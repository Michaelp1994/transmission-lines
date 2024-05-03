import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import ModalProvider from "~/contexts/ModalProvider";
import { useUpdateConductorModal } from "~/utils/modals";
import { render, screen, within } from "~test-utils";
import { createConductor, mockIds } from "~tests/helpers/mockData";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

const labels = {
    name: /name/i,
    fromPhase: /from phase/i,
    toPhase: /to phase/i,
    lineId: /line id/i,
    bundleNumber: /bundle number/i,
    bundleSpacing: /bundle spacing/i,
    isNeutral: /is neutral/i,
    typeId: /type id/i,
};

// TODO: doesnt work because of the type id
describe("Update Conductor Modal", () => {
    const conductorId = mockIds.conductorId();
    const oldConductor = createConductor();

    test("previous data is correctly displayed", async () => {
        const user = userEvent.setup();

        const mockFn = vi.fn(() => Promise.resolve());
        const displayModal = useUpdateConductorModal(oldConductor.id);

        render(
            <MockTrpcProvider mockFn={mockFn}>
                <ModalProvider>
                    <Button onClick={displayModal}>Click Here</Button>
                </ModalProvider>
            </MockTrpcProvider>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("dialog");

        const nameInput = await within(dialog).findByLabelText(labels.name);
        const fromPhaseInput = within(dialog).getByLabelText(labels.fromPhase);
        const toPhaseInput = within(dialog).getByLabelText(labels.toPhase);
        const lineIdInput = within(dialog).getByLabelText(labels.lineId);
        const bundleNumberInput = within(dialog).getByLabelText(
            labels.bundleNumber
        );
        const bundleSpacingInput = within(dialog).getByLabelText(
            labels.bundleSpacing
        );
        const typeIdInput = within(dialog).getByLabelText(labels.typeId);

        expect(nameInput).toHaveValue(oldConductor.name);
        expect(fromPhaseInput).toHaveValue(oldConductor.fromPhase);
        expect(toPhaseInput).toHaveValue(oldConductor.toPhase);
        expect(lineIdInput).toHaveValue(oldConductor.lineId);
        expect(bundleNumberInput).toHaveValue(oldConductor.bundleNumber);
        expect(bundleSpacingInput).toHaveValue(oldConductor.bundleSpacing);
        // expect(isNeutralInput).toHaveValue(oldConductor.isNeutral.valueOf); TODO: check input of checkbox
        expect(typeIdInput).toHaveValue(oldConductor.typeId);
    });
});
