import { TRPCError } from "@trpc/server";
import { describe, expect, test, vi } from "vitest";
import SourceTable from "./SourceTable";
import { createRender } from "~test-utils";
import { createArray, createSource, mockIds } from "~tests/helpers/mockData";
import verifyTable from "~tests/helpers/verifyTable";

const columns = [
    "name",
    "x1r1",
    "x0r0",
    "resistance",
    "frequency",
    "isc1",
    "isc3",
];

describe("Source Table", () => {
    const sources = createArray(10, createSource);
    const trpcFn = vi.fn().mockResolvedValue(sources);
    const render = createRender(trpcFn);
    const projectId = mockIds.projectId();

    async function setup() {
        const utils = render(<SourceTable projectId={projectId} />);
        const table = await utils.findByRole("table");

        return { ...utils, table };
    }
    test("correctly calls API", async () => {
        await setup();

        expect(trpcFn).toHaveBeenCalledWith(
            "query",
            "source.getAllByProjectId",
            { projectId }
        );
    });
    test("displays all rows of data correctly", async () => {
        const { table } = await setup();

        verifyTable(table, columns, sources);
    });

    test("shows error when data is not received.", async () => {
        trpcFn.mockRejectedValueOnce(
            new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        );
        const utils = render(<SourceTable projectId={projectId} />);

        expect(await utils.findByText("There is an error")).toBeInTheDocument();
    });
});
