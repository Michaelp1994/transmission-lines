import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { useUpdateConductorModal } from "~/utils/modals";
import { createRender, screen, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import {
    createArray,
    createConductor,
    getConductorType,
    mockIds,
} from "~tests/helpers/mockData";
import selectAction from "~tests/helpers/selectAction";

const labels = {
    name: /name/i,
    fromPhase: /from phase/i,
    toPhase: /to phase/i,
    bundleNumber: /bundle number/i,
    bundleSpacing: /bundle spacing/i,
    isNeutral: /is neutral/i,
};

describe("Update Conductor Modal", () => {
    const conductorId = mockIds.conductorId();
    const conductorTypes = createArray(10, getConductorType);
    const [oldConductor] = createConductor(conductorTypes);
    const [newConductor, conductorType] = createConductor(conductorTypes);
    const trpcFn = vi.fn().mockResolvedValue(newConductor);

    const render = createRender(trpcFn);
    const displayModal = useUpdateConductorModal(conductorId);

    async function setup() {
        const user = userEvent.setup();

        trpcFn.mockResolvedValueOnce(oldConductor);
        trpcFn.mockResolvedValueOnce(conductorTypes);

        const utils = render(
            <Button onClick={displayModal}>Click Here</Button>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("dialog");
        const form = await within(dialog).findByRole("form");

        return { user, form, dialog, ...utils };
    }
    test("correctly calls API", async () => {
        await setup();
        expect(trpcFn).toHaveBeenCalledWith("query", "conductor.getById", {
            id: conductorId,
        });
    });
    test("submits form with valid input", async () => {
        const { form, user } = await setup();

        await completeForm(user, form, labels, newConductor);

        // select Conductor Type
        await selectAction(user, form, /conductor type/i, conductorType.name);
        const submitBtn = within(form).getByRole("button", { name: /submit/i });

        await user.click(submitBtn);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

        expect(trpcFn).toHaveBeenLastCalledWith(
            "mutation",
            "conductor.update",
            {
                ...newConductor,
                id: conductorId,
            }
        );
    });
    test("submits form with invalid input", async () => {
        const { form, user, dialog } = await setup();
        const badConductor = {
            ...newConductor,
            bundleSpacing: -1,
        };

        await completeForm(user, form, labels, badConductor);

        // select Conductor Type
        await selectAction(user, form, /conductor type/i, conductorType.name);
        const submitBtn = within(form).getByRole("button", { name: /submit/i });

        await user.click(submitBtn);
        expect(dialog).toBeInTheDocument();
        expect(trpcFn).not.toHaveBeenCalledWith(
            "mutation",
            "conductor.update",
            expect.anything()
        );
    });
});
