import { TRPCError } from "@trpc/server";
import { describe, expect, test, vi } from "vitest";
import ConductorLocationTable from "./ConductorLocationTable";
import { createRender, screen } from "~test-utils";
import {
    createArray,
    createConductorLocation,
    mockIds,
} from "~tests/helpers/mockData";
import verifyTable from "~tests/helpers/verifyTable";

const columns = ["x", "y"];

describe("Conductor Location Table", () => {
    const geometryId = mockIds.geometryId();
    const conductorLocations = createArray(10, createConductorLocation);
    const trpcFn = vi.fn().mockResolvedValue(conductorLocations);
    const render = createRender(trpcFn);

    test("correct data is sent to the server", () => {
        render(<ConductorLocationTable geometryId={geometryId} />);
        expect(trpcFn).toBeCalledTimes(1);
        expect(trpcFn).toBeCalledWith(
            "query",
            "conductorLocations.getAllByGeometryId",
            { geometryId }
        );
    });

    test("displays all rows of data correctly", async () => {
        render(<ConductorLocationTable geometryId={geometryId} />);
        const table = await screen.findByRole("table");

        verifyTable(table, columns, conductorLocations);
    });

    test("shows error when data is not received.", async () => {
        trpcFn.mockRejectedValueOnce(
            new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        );
        render(<ConductorLocationTable geometryId={geometryId} />);
        expect(
            await screen.findByText("There is an error")
        ).toBeInTheDocument();
    });
});
