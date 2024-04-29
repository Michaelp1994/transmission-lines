import { faker } from "@faker-js/faker";
import { TRPCError } from "@trpc/server";
import { describe, expect, test, vi } from "vitest";

import ConductorTable from "./ConductorTable";

import { render, screen, within } from "~test-utils";
import { createConductors } from "~tests/helpers/conductors";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

// TODO: missing type and isNeutral columns
const tableRows = [
    "name",
    "fromPhase",
    "toPhase",
    "bundleNumber",
    "bundleSpacing",
] as const;

function verifyTable(table: HTMLElement, data: any[]) {
    const rowgroups = within(table).getAllByRole("rowgroup");
    expect(rowgroups).toHaveLength(2);
    if (!rowgroups[1]) throw Error("Table doesn't have a body");
    const rows = within(rowgroups[1]).getAllByRole("row");
    expect(rows).toHaveLength(data.length);
    rows.forEach((row, rowIndex) => {
        const current = data[rowIndex];
        const cells = within(row).getAllByRole("cell");
        tableRows.forEach((property, colIndex) => {
            expect(cells[colIndex]).toHaveTextContent(
                String(current[property])
            );
        });
    });
}

describe("Conductor Table", () => {
    const conductors = createConductors(10);
    test("displays all rows of data correctly", async () => {
        const lineId = faker.string.uuid();

        const mockTrpcFn = vi.fn(() => Promise.resolve(conductors));
        render(
            <MockTrpcProvider mockFn={mockTrpcFn}>
                <ConductorTable lineId={lineId} />
            </MockTrpcProvider>
        );
        expect(mockTrpcFn).toHaveBeenCalledWith({ lineId });
        const table = await screen.findByRole("table");
        verifyTable(table, conductors);
    });
    test(
        "shows error when data is not received.",
        { timeout: 10000 },
        async () => {
            const lineId = faker.string.uuid();
            const mockTrpcFn = vi.fn(
                () =>
                    new Promise((_resolve, reject) => {
                        reject(
                            new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
                        );
                    })
            );
            render(
                <MockTrpcProvider mockFn={mockTrpcFn}>
                    <ConductorTable lineId={lineId} />
                </MockTrpcProvider>
            );
            expect(mockTrpcFn).toHaveBeenCalledWith({ lineId });
            expect(
                await screen.findByText("There is an error")
            ).toBeInTheDocument();
        }
    );
});
