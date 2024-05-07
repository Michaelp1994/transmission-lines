import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { TRPCError } from "@trpc/server";
import TransmissionLineTable from "./TransmissionLineTable";
import { createRender } from "~test-utils";
import {
    createArray,
    getTransmissionLine,
    mockIds,
} from "~tests/helpers/mockData";
import verifyTable from "~tests/helpers/verifyTable";

const columns = ["name", "fromSource.name", "toSource.name"];

describe("Transmission Line Table", () => {
    const projectId = mockIds.projectId();
    const towers = createArray(10, getTransmissionLine);
    const trpcFn = vi.fn().mockResolvedValue(towers);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(<TransmissionLineTable projectId={projectId} />);
        const table = await utils.findByRole("table");

        return { user, table, ...utils };
    }
    test("corect API call to server", async () => {
        await setup();

        expect(trpcFn).toHaveBeenCalledWith(
            "query",
            "transmissionLine.getAllByProjectId",
            {
                projectId,
            }
        );
    });

    test("displays all rows of data correctly", async () => {
        const { table } = await setup();

        verifyTable(table, columns, towers);
    });

    test("shows error when data is not received.", async () => {
        trpcFn.mockRejectedValueOnce(
            new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        );
        const utils = render(<TransmissionLineTable projectId={projectId} />);

        expect(await utils.findByText("There is an error")).toBeInTheDocument();
    });
});
