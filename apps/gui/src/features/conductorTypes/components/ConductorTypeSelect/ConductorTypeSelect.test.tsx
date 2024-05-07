import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import ConductorTypeSelect from "./ConductorTypeSelect";
import { createRender, screen, within } from "~test-utils";
import {
    createArray,
    getConductorType,
    pickRandomArrayElement,
} from "~tests/helpers/mockData";

describe("Conductor Type Select", () => {
    const conductorTypes = createArray(10, getConductorType);

    const trpcFn = vi.fn().mockResolvedValue(conductorTypes);
    const onChangeFn = vi.fn();
    const render = createRender(trpcFn);

    function setup(value?: string) {
        const user = userEvent.setup();
        const utils = render(
            <ConductorTypeSelect value={value} onChange={onChangeFn} />
        );

        return { user, ...utils };
    }
    test("all sources are displayed", async () => {
        const { user } = setup();

        expect(trpcFn).toBeCalledTimes(1);
        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        const options = within(dialog).getAllByRole("option");

        expect(options).toHaveLength(conductorTypes.length);
        options.forEach((option, index) => {
            const expectedConductorType = conductorTypes[index];

            if (!expectedConductorType) {
                throw new Error("Unreachable code.");
            }
            expect(option.textContent).toMatch(expectedConductorType.name);
        });
    });

    test("selecting a source calls onChange", async () => {
        const { user } = setup();
        const conductorType = pickRandomArrayElement(conductorTypes);

        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");

        const selectedOption = within(dialog).getByText(conductorType.name);

        await user.click(selectedOption);
        expect(onChangeFn).toBeCalledTimes(1);
        expect(onChangeFn).toBeCalledWith(conductorType.id);
    });

    test("selecting a value twice cancels the selection", async () => {
        const conductorType = pickRandomArrayElement(conductorTypes);
        const { user } = setup(conductorType.id);

        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        const selectedOption = within(dialog).getByText(conductorType.name);

        await user.click(selectedOption);
        expect(onChangeFn).toBeCalledTimes(1);
        expect(onChangeFn).toBeCalledWith("");
    });
});
