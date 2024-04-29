import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import DataWrapper from "./DataWrapper";

import { render, screen, within } from "~test-utils";
import { createSources } from "~tests/helpers/createSource";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

describe("Source Select Data Wrapper", () => {
    const sources = createSources(10);
    const projectId = faker.string.uuid();

    Element.prototype.scrollIntoView = vi.fn();

    test("all sources are displayed", async () => {
        const user = userEvent.setup();
        const mockFn = vi.fn(() => Promise.resolve(sources));
        render(
            <MockTrpcProvider mockFn={mockFn}>
                <DataWrapper projectId={projectId} />
            </MockTrpcProvider>
        );
        expect(mockFn).toBeCalledWith({ projectId });
        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        const options = within(dialog).getAllByRole("option");
        options.forEach((option, index) => {
            expect(option.textContent === sources[index]!.name);
        });
    });

    test("selecting a source", async () => {
        const user = userEvent.setup();
        const mockFn = vi.fn(() => Promise.resolve(sources));
        const mockOnChange = vi.fn();
        const index = faker.number.int({ min: 0, max: 9 });
        render(
            <MockTrpcProvider mockFn={mockFn}>
                <DataWrapper projectId={projectId} onChange={mockOnChange} />
            </MockTrpcProvider>
        );
        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        await user.click(within(dialog).getByText(sources[index]!.name));

        expect(mockOnChange).toHaveBeenCalledWith(sources[index]!.id);
    });

    test("unselecting a source triggers empty onChange", async () => {
        const user = userEvent.setup();
        const mockFn = vi.fn(() => Promise.resolve(sources));
        const mockOnChange = vi.fn();
        const index = faker.number.int({ min: 0, max: 9 });
        render(
            <MockTrpcProvider mockFn={mockFn}>
                <DataWrapper
                    projectId={projectId}
                    onChange={mockOnChange}
                    value={sources[index]!.id}
                />
            </MockTrpcProvider>
        );
        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        await user.click(within(dialog).getByText(sources[index]!.name));
        expect(mockOnChange).toHaveBeenCalledWith("");
    });
});
