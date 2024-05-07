import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import TowerGeometrySelect from "./TowerGeometrySelect";
import { createRender, within } from "~test-utils";
import { createArray, getTowerGeometry } from "~tests/helpers/mockData";
import UnreachableError from "~tests/UnreachableError";

describe("TowerGeometrySelect", () => {
    const towerGeometries = createArray(10, getTowerGeometry);
    const trpcFn = vi.fn().mockResolvedValue(towerGeometries);
    const render = createRender(trpcFn);
    const mockOnChange = vi.fn();

    async function setup(value: string) {
        const user = userEvent.setup();
        const utils = render(
            <TowerGeometrySelect value={value} onChange={mockOnChange} />
        );
        const combobox = await utils.findByRole("combobox");

        await user.click(combobox);
        const dialog = await utils.findByRole("dialog");

        return { user, dialog, combobox, ...utils };
    }
    test("correct data is requested from the server", async () => {
        await setup("");
        expect(trpcFn).toBeCalledWith(
            "query",
            "towerGeometry.getAll",
            undefined
        );
    });
    test("all tower geometries are displayed", async () => {
        const { dialog } = await setup("");

        const options = within(dialog).getAllByRole("option");

        expect(options).toHaveLength(towerGeometries.length);

        options.forEach((option, index) => {
            const currentTowerGeometry = towerGeometries[index];

            if (!currentTowerGeometry) {
                throw new UnreachableError();
            }

            expect(option.textContent).toEqual(currentTowerGeometry.name);
        });
    });

    test("selecting a tower geometry", async () => {
        const { dialog, user } = await setup("");

        const index = faker.number.int({ min: 0, max: 9 });
        const selectedTowerGemetry = towerGeometries[index];

        if (!selectedTowerGemetry) {
            throw new UnreachableError();
        }

        await user.click(within(dialog).getByText(selectedTowerGemetry.name));

        expect(mockOnChange).toHaveBeenCalledWith(selectedTowerGemetry.id);
    });

    test("unselecting a tower geometry clears input", async () => {
        const index = faker.number.int({ min: 0, max: 9 });
        const selectedTowerGemetry = towerGeometries[index];

        if (!selectedTowerGemetry) {
            throw new Error("Unreachable code path");
        }

        const { dialog, user } = await setup(selectedTowerGemetry.id);

        await user.click(within(dialog).getByText(selectedTowerGemetry.name));
        expect(mockOnChange).toHaveBeenCalledWith("");
    });
});
