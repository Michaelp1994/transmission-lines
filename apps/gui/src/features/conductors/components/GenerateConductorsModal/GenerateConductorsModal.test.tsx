import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { useGenerateConductorsModal } from "~/utils/modals";
import { createRender, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import {
    createArray,
    createGenerateConductor,
    getConductorType,
    mockIds,
} from "~tests/helpers/mockData";
import selectAction from "~tests/helpers/selectAction";

const labels = {
    phases: /phases/i,
    circuits: /circuits/i,
    neutrals: /number of neutral conductors/i,
    // phaseTypeId: /phase type/i,
    // neutralTypeId: /neutral type/i,
};

describe("Generate Conductors Modal", () => {
    const lineId = mockIds.lineId();
    const conductorTypes = createArray(10, getConductorType);
    const [generateConductors, phaseType, neutralType] =
        createGenerateConductor(conductorTypes);

    const trpcFn = vi.fn().mockResolvedValue(generateConductors);
    const render = createRender(trpcFn);
    const displayModal = useGenerateConductorsModal(lineId);

    async function setup() {
        const user = userEvent.setup();

        trpcFn.mockResolvedValueOnce(conductorTypes);
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
        await selectAction(user, form, /phase conductor type/i, phaseType.name);
        await selectAction(
            user,
            form,
            /neutral conductor type/i,
            neutralType.name
        );
        await user.click(
            within(dialog).getByRole("button", {
                name: /generate/i,
            })
        );
        expect(trpcFn).toHaveBeenCalledWith("mutation", "conductor.generate", {
            ...generateConductors,
            lineId,
        });
        expect(dialog).not.toBeInTheDocument();
    });
    test("incorrect data is not sent to server", async () => {
        const { user, dialog, form } = await setup();
        const badData = {
            ...generateConductors,
            phases: -1,
        };

        await completeForm(user, form, labels, badData);
        await selectAction(user, form, /phase conductor type/i, phaseType.name);
        await selectAction(
            user,
            form,
            /neutral conductor type/i,
            neutralType.name
        );
        await user.click(
            within(dialog).getByRole("button", {
                name: /generate/i,
            })
        );
        expect(trpcFn).not.toHaveBeenCalledWith(
            "mutation",
            "conductor.generate",
            expect.anything()
        );
        expect(dialog).toBeInTheDocument();
    });
});
