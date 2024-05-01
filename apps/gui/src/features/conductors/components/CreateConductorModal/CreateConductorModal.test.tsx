import { Button } from "@repo/ui";
import { defaultConductor } from "@repo/validators/forms/Conductor.schema";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import { useCreateConductorModal } from "~/utils/modals";
import { createRender, screen, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import {
    createArray,
    createConductor,
    createConductorType,
} from "~tests/helpers/mockData";

const labels = {
    name: /name/i,
    fromPhase: /from phase/i,
    toPhase: /to phase/i,
    bundleNumber: /bundle number/i,
    bundleSpacing: /bundle spacing/i,
    isNeutral: /is neutral/i,
    // typeId: /conductor type/i,
};

// TODO: mockFn is being called for the conductor type select which is erroring.
describe("Create Conductor Modal", () => {
    const newConductor = createConductor();
    const conductorTypes = createArray(10, createConductorType);
    const trpcFn = vi.fn().mockResolvedValue(newConductor);
    const render = createRender(trpcFn);
    const displayModal = useCreateConductorModal(newConductor.lineId);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <Button onClick={displayModal}>Click Here</Button>
        );
        trpcFn.mockResolvedValueOnce(conductorTypes);
        await userEvent.click(
            screen.getByRole("button", { name: /click here/i })
        );
        const dialog = await screen.findByRole("dialog");
        const form = await within(dialog).findByRole("form");
        trpcFn.mockClear();
        return {
            ...utils,
            dialog,
            form,
            user,
        };
    }

    test("fill the form out correctly and test that the information is sent to server", async () => {
        const { user, dialog, form, debug } = await setup();

        expect(form).toHaveFormValues(defaultConductor);

        await completeForm(user, form, labels, newConductor);

        const conductorTypeButton =
            within(form).getByLabelText(/conductor type/i);

        await user.click(conductorTypeButton);

        // TODO: I don't know how but it's only capturing one of the two dialogs.
        const popup = await screen.findByRole("dialog");

        await user.click(
            await within(popup).findByText(conductorTypes[0]!.name)
        );

        const confirm = within(dialog).getByRole("button", {
            name: /create/i,
        });

        expect(form).toHaveFormValues(newConductor);

        await user.click(confirm);

        expect(trpcFn).toHaveBeenLastCalledWith({
            ...newConductor,
            typeId: conductorTypes[0]!.id,
        });
        // expect(trpcFn).toHaveBeenCalledTimes(1);
        expect(dialog).not.toBeInTheDocument();
    });

    test.todo("incorrect data is not sent to server");
});
