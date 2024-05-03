import { faker } from "@faker-js/faker";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import ConductorTypeSelect from "./ConductorTypeSelect";
import { createRender, screen, within } from "~test-utils";
import { createArray, createConductorType } from "~tests/helpers/mockData";

describe("Conductor Type Select", () => {
    const conductorTypes = createArray(10, createConductorType);

    Element.prototype.scrollIntoView = vi.fn();
    const trpcFn = vi.fn().mockResolvedValue(conductorTypes);
    const onChangeFn = vi.fn();
    const render = createRender(trpcFn);

    test("all sources are displayed", async () => {
        const user = userEvent.setup();

        render(<ConductorTypeSelect />);
        expect(trpcFn).toBeCalledTimes(1);
        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        const options = within(dialog).getAllByRole("option");

        options.forEach((option, index) => {
            expect(option.textContent).toMatch(conductorTypes[index]!.name);
        });
    });

    test("selecting a source calls onChange", async () => {
        const user = userEvent.setup();

        const index = faker.number.int({ min: 0, max: 9 });

        render(<ConductorTypeSelect onChange={onChangeFn} />);
        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        const options = within(dialog).getAllByRole("option");

        await user.click(options[index]!);
        expect(onChangeFn).toBeCalledTimes(1);
        expect(onChangeFn).toBeCalledWith(conductorTypes[index]!.id);
    });

    test("selecting a value twice cancels the selection", async () => {
        const user = userEvent.setup();
        const index = faker.number.int({ min: 0, max: 9 });

        render(
            <ConductorTypeSelect
                value={conductorTypes[index]!.id}
                onChange={onChangeFn}
            />
        );
        await user.click(await screen.findByRole("combobox"));
        const dialog = await screen.findByRole("dialog");
        const options = within(dialog).getAllByRole("option");

        await user.click(options[index]!);
        expect(onChangeFn).toBeCalledTimes(1);
        expect(onChangeFn).toBeCalledWith("");
    });
});
