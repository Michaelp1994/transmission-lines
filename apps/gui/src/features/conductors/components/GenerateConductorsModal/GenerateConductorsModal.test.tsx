import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { useGenerateConductorsModal } from "~/utils/modals";
import { createRender, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import { createGenerateConductor } from "~tests/helpers/mockData";

const labels = {
    phases: /phases/i,
    circuits: /circuits/i,
    neutrals: /neutrals/i,
    // phaseTypeId: /phase type/i,
    // neutralTypeId: /neutral type/i,
};

// TODO: Doesn't work because of phase type id and neutral type id
describe("Generate Conductors Modal", () => {
    const generateConductors = createGenerateConductor();
    const trpcFn = vi.fn().mockResolvedValue(generateConductors);
    const render = createRender(trpcFn);
    const displayModal = useGenerateConductorsModal(generateConductors.lineId);

    async function setup() {
        const user = userEvent.setup();

        const utils = render(
            <Button onClick={displayModal}>Click Here</Button>
        );

        await user.click(utils.getByRole("button", { name: /click here/i }));
        const dialog = await utils.findByRole("dialog");
        const form = await utils.findByRole("form");

        return { user, dialog, form, ...utils };
    }

    test("correct data is sent to server", async () => {
        const { user, dialog, form } = await setup();

        await completeForm(user, form, labels, generateConductors);

        await user.click(
            within(dialog).getByRole("button", {
                name: /confirm/i,
            })
        );
        expect(trpcFn).toHaveBeenCalledWith(generateConductors);
        expect(dialog).not.toBeInTheDocument();
    });
    test.todo("incorrect data is not sent to server");
});
