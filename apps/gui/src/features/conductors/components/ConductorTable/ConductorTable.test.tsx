import { faker } from "@faker-js/faker";
import { TRPCError } from "@trpc/server";
import { describe, expect, test, vi } from "vitest";
import ConductorTable from "./ConductorTable";
import { createRender, screen } from "~test-utils";
import { createArray, createConductorTable } from "~tests/helpers/mockData";
import verifyTable from "~tests/helpers/verifyTable";

const columns = [
    "name",
    "fromPhase",
    "toPhase",
    "bundleNumber",
    "bundleSpacing",
    "isNeutral",
    "type.name",
];

describe("Conductor Table", () => {
    const conductors = createArray(10, createConductorTable);
    const lineId = faker.string.uuid();
    const trpcFn = vi.fn().mockResolvedValue(conductors);
    const render = createRender(trpcFn);

    test("calls server with correct data and displays all rows of data correctly", async () => {
        render(<ConductorTable lineId={lineId} />);
        const table = await screen.findByRole("table");

        expect(trpcFn).toHaveBeenCalledWith({ lineId });
        verifyTable(table, columns, conductors);
    });

    test("shows error when data is not received.", async () => {
        trpcFn.mockRejectedValueOnce(
            new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        );
        render(<ConductorTable lineId={lineId} />);
        expect(
            await screen.findByText("There is an error")
        ).toBeInTheDocument();
    });
});
