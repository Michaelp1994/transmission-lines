import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

import SourceSelect from "./SourceSelect";

import { createRender, screen, within } from "~test-utils";
import { createArray, createSource } from "~tests/helpers/mockData";

describe("Source Select Data Wrapper", () => {
    const sources = createArray(10, createSource);
    const projectId = faker.string.uuid();
    const trpcFn = vi.fn().mockResolvedValue(sources);
    const render = createRender(trpcFn);
    const mockOnChange = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("all sources are displayed", async () => {
        const user = userEvent.setup();
        render(<SourceSelect projectId={projectId} />);
        expect(trpcFn).toBeCalledWith({ projectId });
        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        const options = within(dialog).getAllByRole("option");
        options.forEach((option, index) => {
            const currentSource = sources[index]!;
            expect(option.textContent).toEqual(currentSource.name);
        });
    });

    test("selecting a source", async () => {
        const user = userEvent.setup();

        const index = faker.number.int({ min: 0, max: 9 });
        const currentSource = sources[index]!;
        render(<SourceSelect projectId={projectId} onChange={mockOnChange} />);
        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        await user.click(within(dialog).getByText(currentSource.name));

        expect(mockOnChange).toHaveBeenCalledWith(currentSource.id);
    });

    test("unselecting a source triggers empty onChange", async () => {
        const user = userEvent.setup();
        const index = faker.number.int({ min: 0, max: 9 });
        const currentSource = sources[index]!;
        render(
            <SourceSelect
                projectId={projectId}
                onChange={mockOnChange}
                value={currentSource.id}
            />
        );
        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        await user.click(within(dialog).getByText(currentSource.name));
        expect(mockOnChange).toHaveBeenCalledWith("");
    });
});
