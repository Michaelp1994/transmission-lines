import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import ModalProvider from "~/contexts/ModalProvider";
import { useGenerateConductorsModal } from "~/utils/modals";
import { render, screen, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

const labels = {
    phases: /phases/i,
    circuits: /circuits/i,
    neutrals: /neutrals/i,
    phaseTypeId: /phase type/i,
    neutralTypeId: /neutral type/i,
};

// TODO: Doesn't work because of phase type id and neutral type id
describe("Generate Conductors Modal", () => {
    test("correct data is sent to server", async () => {
        const user = userEvent.setup();

        const generateConductors = {
            lineId: faker.string.uuid(),
            phases: faker.number.int(),
            circuits: faker.number.int(),
            neutrals: faker.number.int(),
            phaseTypeId: faker.string.uuid(),
            neutralTypeId: faker.string.uuid(),
        };

        const mockFn = vi.fn(() => Promise.resolve(generateConductors));

        const displayModal = useGenerateConductorsModal(
            generateConductors.lineId
        );

        render(
            <MockTrpcProvider mockFn={mockFn}>
                <ModalProvider>
                    <Button onClick={displayModal}>Click Here</Button>
                </ModalProvider>
            </MockTrpcProvider>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("dialog");

        await completeForm(user, labels, generateConductors);

        await user.click(
            within(dialog).getByRole("button", {
                name: /confirm/i,
            })
        );
        expect(mockFn).toHaveBeenCalledWith(generateConductors);
        expect(dialog).not.toBeInTheDocument();
    });
    test.todo("incorrect data is not sent to server");
});
