import { faker } from "@faker-js/faker";
import { TRPCError } from "@trpc/server";
import { describe, expect, test, vi } from "vitest";

import SourceTable from "./SourceTable";

import { render, screen, within } from "~test-utils";
import { createSources } from "~tests/helpers/createSource";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

const tableRows = [
    "name",
    "x1r1",
    "x0r0",
    "resistance",
    "frequency",
    "isc1",
    "isc3",
] as const;

function verifyTable(table: HTMLElement, data: any[]) {
    const rowgroups = within(table).getAllByRole("rowgroup");
    expect(rowgroups).toHaveLength(2);
    if (!rowgroups[1]) throw Error("Table doesn't have a body");
    const rows = within(rowgroups[1]).getAllByRole("row");
    expect(rows).toHaveLength(data.length);
    rows.forEach((row, rowIndex) => {
        const currentSource = data[rowIndex];
        const cells = within(row).getAllByRole("cell");
        tableRows.forEach((property, colIndex) => {
            expect(cells[colIndex]).toHaveTextContent(
                String(currentSource[property])
            );
        });
    });
}

describe("SourceTable", () => {
    const sources = createSources(10);
    test("displays all rows of data correctly", async () => {
        const projectId = faker.string.uuid();
        const mockTrpcFn = vi.fn(
            () =>
                new Promise((resolve, reject) => {
                    resolve(sources);
                })
        );
        render(
            <MockTrpcProvider mockFn={mockTrpcFn}>
                <SourceTable projectId={projectId} />
            </MockTrpcProvider>
        );
        expect(mockTrpcFn).toHaveBeenCalledWith({ projectId });
        const table = await screen.findByRole("table");
        verifyTable(table, sources);
    });
    test(
        "shows error when data is not received.",
        { timeout: 10000 },
        async () => {
            const projectId = faker.string.uuid();
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
                    <SourceTable projectId={projectId} />
                </MockTrpcProvider>
            );
            expect(mockTrpcFn).toHaveBeenCalledWith({ projectId });
            expect(
                await screen.findByText("There is an error")
            ).toBeInTheDocument();
            screen.debug();
        }
    );
});
