import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { Button } from "@repo/ui";
import { createRender, within } from "~test-utils";
import {
    createArray,
    getGeometry,
    mockIds,
    createGenerateTowers,
} from "~tests/helpers/mockData";
import { useGenerateTowersModal } from "~/utils/modals";
import completeForm from "~tests/helpers/completeForm";
import selectAction from "~tests/helpers/selectAction";

const labels = {
    namePrefix: /name prefix/i,
    distance: /total distance/i,
    numTowers: /number of towers/i,
    resistance: /resistance/i,
};

describe("GenerateTowersModal", () => {
    const lineId = mockIds.lineId();
    const towerGeometries = createArray(10, getGeometry);
    const [generateConductors, towerGeometry] =
        createGenerateTowers(towerGeometries);

    const trpcFn = vi.fn().mockResolvedValue(generateConductors);
    const render = createRender(trpcFn);
    const displayModal = useGenerateTowersModal(lineId);

    async function setup() {
        const user = userEvent.setup();

        trpcFn.mockResolvedValueOnce(towerGeometries);
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
        await selectAction(user, form, /tower geometry/i, towerGeometry.name);
        await user.click(
            within(dialog).getByRole("button", {
                name: /generate/i,
            })
        );

        expect(trpcFn).toHaveBeenCalledWith("mutation", "tower.generate", {
            ...generateConductors,
            lineId,
        });
        expect(dialog).not.toBeInTheDocument();
    });
    test("incorrect data is not sent to server", async () => {
        const { user, dialog, form } = await setup();
        const badData = {
            ...generateConductors,
            numTowers: -1,
        };

        await completeForm(user, form, labels, badData);
        await selectAction(user, form, /tower geometry/i, towerGeometry.name);
        await user.click(
            within(dialog).getByRole("button", {
                name: /generate/i,
            })
        );

        expect(trpcFn).not.toHaveBeenCalledWith(
            "mutation",
            "tower.generate",
            expect.anything()
        );
        expect(dialog).toBeInTheDocument();
    });
});
