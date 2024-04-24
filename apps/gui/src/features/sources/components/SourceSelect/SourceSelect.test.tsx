import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

import SourceSelect from "./SourceSelect";

import { render, screen, within } from "~test-utils";
import { createSources } from "~tests/helpers/createSource";

Element.prototype.scrollIntoView = vi.fn();

describe("SourceSelect", () => {
    const data = createSources(10);
    test("selecting a source triggers onChange", async () => {
        const user = userEvent.setup();
        const mockOnChange = vi.fn();
        render(
            <SourceSelect
                data={data}
                onChange={mockOnChange}
                value={data[0]!.id}
            />
        );
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        await user.click(screen.getByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        await user.click(within(dialog).getByText(data[1]!.name));
        expect(mockOnChange).toHaveBeenCalledWith(data[1]!.id);
    });
    test("unselecting a source triggers empty onChange", async () => {
        const user = userEvent.setup();

        const mockOnChange = vi.fn();
        render(
            <SourceSelect
                data={data}
                onChange={mockOnChange}
                value={data[0]!.id}
            />
        );
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        await user.click(screen.getByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        await user.click(within(dialog).getByText(data[0]!.name));
        expect(mockOnChange).toHaveBeenCalledWith("");
    });
    test.todo("");
});
