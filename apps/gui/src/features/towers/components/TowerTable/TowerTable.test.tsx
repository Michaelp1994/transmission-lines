import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { TRPCError } from "@trpc/server";
import TowerTable from "./TowerTable";
import { createArray, getTower, mockIds } from "~tests/helpers/mockData";
import { createRender } from "~tests/utils/test-utils";
import verifyTable from "~tests/helpers/verifyTable";

const columns = ["name", "resistance", "distance", "geometry.name"];

describe("Tower Table", () => {
    const lineId = mockIds.lineId();
    const towers = createArray(10, getTower);
    const trpcFn = vi.fn().mockResolvedValue(towers);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(<TowerTable lineId={lineId} />);
        const table = await utils.findByRole("table");

        return { user, table, ...utils };
    }
    test("corect API call to server", async () => {
        await setup();

        expect(trpcFn).toHaveBeenCalledWith("query", "tower.getAllByLineId", {
            lineId,
        });
    });

    test("displays all rows of data correctly", async () => {
        const { table } = await setup();

        verifyTable(table, columns, towers);
    });

    test("shows error when data is not received.", async () => {
        trpcFn.mockRejectedValueOnce(
            new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        );
        const utils = render(<TowerTable lineId={lineId} />);

        expect(await utils.findByText("There is an error")).toBeInTheDocument();
    });
});
