import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { Button } from "@repo/ui";
import { mockIds } from "~tests/helpers/mockData";
import { createRender } from "~tests/utils/test-utils";
import { useTowerParametersModal } from "~/utils/modals";

const fakeResult = {
    rMatrix: [
        [1, 2],
        [3, 4],
    ],
    xMatrix: [
        [1, 2],
        [3, 4],
    ],
    cMatrix: [
        [1, 2],
        [3, 4],
    ],
};

describe("Tower Parameters Modal", () => {
    const towerId = mockIds.towerId();

    const trpcFn = vi.fn().mockResolvedValue(fakeResult);
    const render = createRender(trpcFn);
    const displayModal = useTowerParametersModal(towerId);

    async function setup() {
        const user = userEvent.setup();

        const utils = render(
            <Button onClick={displayModal}>Click Here</Button>
        );

        await user.click(utils.getByRole("button", { name: /click here/i }));
        const dialog = await utils.findByRole("dialog");

        return { user, dialog, ...utils };
    }
    test("correct API is called", async () => {
        await setup();
        expect(trpcFn).toHaveBeenCalledWith("query", "tower.getParameters", {
            towerId,
        });
    });
});
