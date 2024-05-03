import { faker } from "@faker-js/faker";
import { TRPCError } from "@trpc/server";
import { describe, expect, test, vi } from "vitest";
import SourceTable from "./SourceTable";
import { createRender, screen } from "~test-utils";
import { createArray, createSource } from "~tests/helpers/mockData";
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

    test("displays all rows of data correctly", async () => {
        const projectId = faker.string.uuid();

        render(<SourceTable projectId={projectId} />);
        expect(trpcFn).toHaveBeenCalledWith({ projectId });
        const table = await screen.findByRole("table");

        verifyTable(table, columns, sources);
    });

    test("shows error when data is not received.", async () => {
        const projectId = faker.string.uuid();
        const mockTrpcFn = vi.fn(() => {
            return new Promise((_resolve, reject) => {
                reject(new TRPCError({ code: "INTERNAL_SERVER_ERROR" }));
            });
        });

        render(<SourceTable projectId={projectId} />);
        expect(mockTrpcFn).toHaveBeenCalledWith({ projectId });
        expect(
            await screen.findByText("There is an error")
        ).toBeInTheDocument();
        screen.debug();
    });
});
