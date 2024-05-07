import { describe, expect, test, vi } from "vitest";
import { TRPCError } from "@trpc/server";
import TowerGeometriesTable from "./TowerGeometriesTable";
import { createRender } from "~test-utils";
import { createArray, createTowerGeometry } from "~tests/helpers/mockData";
import verifyTable from "~tests/helpers/verifyTable";

const columns = ["name"];

describe("Tower Geometries Table", () => {
    const towerGeometries = createArray(10, createTowerGeometry);
    const trpcFn = vi.fn().mockResolvedValue(towerGeometries);
    const render = createRender(trpcFn);

    async function setup() {
        const utils = render(<TowerGeometriesTable />);
        const table = await utils.findByRole("table");

        return { ...utils, table };
    }
    test("correctly calls API", async () => {
        await setup();
        expect(trpcFn).toHaveBeenCalledWith(
            "query",
            "towerGeometry.getAll",
            undefined
        );
    });
    test("displays all rows of data correctly", async () => {
        const { table } = await setup();

        verifyTable(table, columns, towerGeometries);
    });

    test("shows error when data is not received.", async () => {
        trpcFn.mockRejectedValueOnce(
            new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        );
        const utils = render(<TowerGeometriesTable />);

        expect(await utils.findByText("There is an error")).toBeInTheDocument();
    });
});
