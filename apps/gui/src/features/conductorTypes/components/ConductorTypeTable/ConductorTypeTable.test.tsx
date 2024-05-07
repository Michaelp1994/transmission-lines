import { TRPCError } from "@trpc/server";
import { describe, expect, test, vi } from "vitest";
import ConductorTypeTable from "./ConductorTypeTable";
import { createRender, screen } from "~test-utils";
import { createArray, createConductorType } from "~tests/helpers/mockData";
import verifyTable from "~tests/helpers/verifyTable";

const columns = ["name", "outerDiameter", "acResistance75", "gmr"];

describe("Conductor Type Table", () => {
    const conductorTypes = createArray(10, createConductorType);
    const trpcFn = vi.fn().mockResolvedValue(conductorTypes);
    const render = createRender(trpcFn);

    test("correct data is sent to the server", () => {
        render(<ConductorTypeTable />);
        expect(trpcFn).toBeCalledWith(
            "query",
            "conductorType.getAll",
            expect.anything()
        );
    });

    test("displays all rows of data correctly", async () => {
        render(<ConductorTypeTable />);
        const table = await screen.findByRole("table");

        verifyTable(table, columns, conductorTypes);
    });

    test("shows error when data is not received.", async () => {
        trpcFn.mockRejectedValueOnce(
            new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        );
        render(<ConductorTypeTable />);
        expect(
            await screen.findByText("There is an error")
        ).toBeInTheDocument();
    });
});
