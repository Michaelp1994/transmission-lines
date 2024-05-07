import { Button } from "@repo/ui";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { useDeleteConductorLocationModal } from "~/utils/modals";
import { createRender, screen, within } from "~test-utils";
import { createConductorLocation, mockIds } from "~tests/helpers/mockData";

describe("Delete Conductor Location Modal", () => {
    const mockConductorLocation = createConductorLocation();
    const locationId = mockIds.locationId();
    const displayModal = useDeleteConductorLocationModal(locationId);
    const trpcFn = vi.fn().mockResolvedValue({
        locationId,
        ...mockConductorLocation,
    });
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(
            <Button onClick={displayModal}>Click Here</Button>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("alertdialog");

        return { user, dialog, ...utils };
    }

    test("correct data is sent to server on confirmation", async () => {
        const { dialog, user } = await setup();

        await user.click(
            within(dialog).getByRole("button", {
                name: /confirm/i,
            })
        );
        expect(trpcFn).toHaveBeenCalledWith(
            "mutation",
            "conductorLocations.delete",
            {
                locationId,
            }
        );
        expect(dialog).not.toBeInTheDocument();
    });

    test("no data is sent to server on cancellation", async () => {
        const { dialog, user } = await setup();

        await user.click(
            within(dialog).getByRole("button", {
                name: /cancel/i,
            })
        );
        expect(trpcFn).not.toHaveBeenCalledWith(
            "mutation",
            "conductorLocations.delete",
            expect.anything()
        );
        expect(dialog).not.toBeInTheDocument();
    });
});
