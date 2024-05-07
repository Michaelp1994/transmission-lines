import { TRPCError } from "@trpc/server";
import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import ProjectTable from "./ProjectTable";
import { createRender, screen } from "~test-utils";
import { createArray, createProject } from "~tests/helpers/mockData";
import verifyTable from "~tests/helpers/verifyTable";

const columns = ["name"];

describe("Project Table", () => {
    const user = userEvent.setup();
    const projects = createArray(10, createProject);
    const trpcFn = vi.fn().mockResolvedValue(projects);
    const render = createRender(trpcFn);

    function setup() {
        const utils = render(<ProjectTable />);

        return { user, ...utils };
    }
    test("correct data is sent to the server", () => {
        setup();
        expect(trpcFn).toBeCalledTimes(1);
        expect(trpcFn).toHaveBeenCalledWith(
            "query",
            "project.getAll",
            undefined
        );
    });

    test("displays all rows of data correctly", async () => {
        setup();
        const table = await screen.findByRole("table");

        verifyTable(table, columns, projects);
    });

    test("shows error when data is not received.", async () => {
        trpcFn.mockRejectedValueOnce(
            new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        );
        setup();
        expect(
            await screen.findByText("There is an error")
        ).toBeInTheDocument();
    });
});
