import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useUpdateConductorLocationModal } from "~/utils/modals";
import { createRender, screen, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import { createConductorLocation, mockIds } from "~tests/helpers/mockData";
import verifyForm from "~tests/helpers/verifyForm";

const labels = {
    x: /x/i,
    y: /y/i,
};

describe("Update Conductor Location Modal", () => {
    const locationId = mockIds.locationId();
    const oldConductorLocation = createConductorLocation();
    const newConductorLocation = createConductorLocation();
    const trpcFn = vi
        .fn()
        .mockResolvedValue({ ...oldConductorLocation, id: locationId });
    const render = createRender(trpcFn);
    const displayModal = useUpdateConductorLocationModal(locationId);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <Button onClick={displayModal}>Click Here</Button>
        );

        await userEvent.click(
            screen.getByRole("button", { name: /click here/i })
        );
        const dialog = await screen.findByRole("dialog");
        const form = await within(dialog).findByRole("form");

        return {
            ...utils,
            dialog,
            form,
            user,
        };
    }

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("fill out form correctly and check that the correct information is sent to server", async () => {
        const { dialog, form, user } = await setup();

        expect(trpcFn).toHaveBeenCalledTimes(1);
        expect(trpcFn).toHaveBeenCalledWith({
            locationId,
        });
        await verifyForm(form, labels);
        expect(form).toHaveFormValues(oldConductorLocation);
        await completeForm(user, form, labels, newConductorLocation);
        const confirm = within(dialog).getByRole("button", {
            name: /submit/i,
        });

        await user.click(confirm);
        expect(trpcFn).toHaveBeenLastCalledWith({
            id: locationId,
            ...newConductorLocation,
        });
        expect(trpcFn).toHaveBeenCalledTimes(2);
        expect(dialog).not.toBeInTheDocument();
    });

    test("fill out form incorrectly and check that information is not sent to server", async () => {
        const { dialog, form, user } = await setup();

        await completeForm(user, form, labels, {
            ...newConductorLocation,
            y: -5,
        });
        const confirm = within(dialog).getByRole("button", {
            name: /submit/i,
        });

        await user.click(confirm);

        expect(trpcFn).toHaveBeenCalledTimes(1);
        expect(dialog).toBeInTheDocument();
    });
});
