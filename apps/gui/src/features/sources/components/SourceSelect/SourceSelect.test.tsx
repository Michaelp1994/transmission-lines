import { faker } from "@faker-js/faker";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import SourceSelect from "./SourceSelect";
import { createRender, within } from "~test-utils";
import { createArray, getSource } from "~tests/helpers/mockData";

describe("Source Select", () => {
    const sources = createArray(10, getSource);
    const projectId = faker.string.uuid();
    const trpcFn = vi.fn().mockResolvedValue(sources);
    const render = createRender(trpcFn);
    const mockOnChange = vi.fn();

    async function setup(value: string) {
        const user = userEvent.setup();
        const utils = render(
            <SourceSelect
                projectId={projectId}
                value={value}
                onChange={mockOnChange}
            />
        );
        const combobox = await utils.findByRole("combobox");

        await user.click(combobox);
        const dialog = await utils.findByRole("dialog");

        return { user, dialog, combobox, ...utils };
    }
    test("correct data is sent to the server", async () => {
        await setup("");

        expect(trpcFn).toBeCalledWith("query", "source.getAllByProjectId", {
            projectId,
        });
    });
    test("all sources are displayed", async () => {
        const { dialog } = await setup("");

        const options = within(dialog).getAllByRole("option");

        expect(options).toHaveLength(sources.length);

        options.forEach((option, index) => {
            const currentSource = sources[index];

            if (!currentSource) {
                throw new Error("Unreachable code path");
            }

            expect(option.textContent).toEqual(currentSource.name);
        });
    });

    test("selecting a source", async () => {
        const { dialog, user } = await setup("");

        const index = faker.number.int({ min: 0, max: 9 });
        const selectedSource = sources[index];

        if (!selectedSource) {
            throw new Error("Unreachable code path");
        }

        await user.click(within(dialog).getByText(selectedSource.name));

        expect(mockOnChange).toHaveBeenCalledWith(selectedSource.id);
    });

    test("unselecting a source triggers empty onChange", async () => {
        const index = faker.number.int({ min: 0, max: 9 });
        const selectedSource = sources[index];

        if (!selectedSource) {
            throw new Error("Unreachable code path");
        }

        const { dialog, user } = await setup(selectedSource.id);

        await user.click(within(dialog).getByText(selectedSource.name));
        expect(mockOnChange).toHaveBeenCalledWith("");
    });
});
