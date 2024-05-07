import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { useCreateConductorModal } from "~/utils/modals";
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

describe("Create Conductor Modal", () => {
    const lineId = mockIds.lineId();
    const conductorTypes = createArray(10, getConductorType);
    const [newConductor, conductorType] = createConductor(conductorTypes);
    const trpcFn = vi.fn().mockResolvedValue(newConductor);
    const render = createRender(trpcFn);
    const displayModal = useCreateConductorModal(lineId);

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
        const confirmBtn = within(dialog).getByRole("button", {
            name: /create/i,
        });

        return {
            ...utils,
            dialog,
            form,
            confirmBtn,
            user,
        };
    }

    test("fill the form out correctly and test that the information is sent to server", async () => {
        const { user, dialog, form, confirmBtn } = await setup();

        await completeForm(user, form, labels, newConductor);
        // conductor type select
        await selectAction(user, form, /conductor type/i, conductorType.name);

        await user.click(confirmBtn);

        expect(trpcFn).toHaveBeenLastCalledWith(
            "mutation",
            "conductor.create",
            {
                ...newConductor,
                lineId,
            }
        );
        expect(dialog).not.toBeInTheDocument();
    });

    test("incorrect data is not sent to server", async () => {
        const { user, dialog, form, confirmBtn } = await setup();
        const badConductor = {
            ...newConductor,
            name: faker.string.alpha(),
        };

        await completeForm(user, form, labels, badConductor);
        // await completeForm(user, form, formData, badConductor);

        // // conductor type select
        await selectAction(user, form, /conductor type/i, conductorType.name);

        // expect(form).toHaveFormValues(newConductor);

        await user.click(confirmBtn);

        expect(trpcFn).not.toHaveBeenCalledWith(
            "mutation",
            "conductor.create",
            expect.anything()
        );
        expect(dialog).toBeInTheDocument();
    });
});
