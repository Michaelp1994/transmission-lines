import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { faker } from "@faker-js/faker";
import UpdateConductorTypeForm from "./UpdateConductorTypeForm";
import { createRender, screen, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import { createConductorType, getConductorType } from "~tests/helpers/mockData";

const labels = {
    name: /name/i,
    surfaceArea: /surface area/i,
    outerDiameter: /outer diameter/i,
    coreDiameter: /core diameter/i,
    stranding: /stranding/i,
    layers: /layers/i,
    currentCapacity: /current capacity/i,
    dcResistance25: /25° dc/i,
    acResistance25: /25° ac/i,
    acResistance50: /50° ac/i,
    acResistance75: /75° ac/i,
    gmr: /geometric mean radius/i,
};

describe("Update Conductor Type Form", () => {
    const oldConductorType = getConductorType();
    const newConductorType = createConductorType();
    const trpcFn = vi.fn().mockResolvedValue(oldConductorType);

    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();

        const utils = render(
            <UpdateConductorTypeForm conductorTypeId={oldConductorType.id} />
        );

        const form = await screen.findByRole("form");
        const submitBtn = within(form).getByRole("button", { name: /submit/i });

        return { user, form, submitBtn, ...utils };
    }
    test("correctly calls API", async () => {
        await setup();
        expect(trpcFn).toHaveBeenCalledWith("query", "conductorType.getById", {
            id: oldConductorType.id,
        });
    });
    test("submits form with valid input", async () => {
        const { form, submitBtn, user } = await setup();

        await completeForm(user, form, labels, newConductorType);

        await user.click(submitBtn);

        expect(trpcFn).toHaveBeenLastCalledWith(
            "mutation",
            "conductorType.update",
            {
                ...newConductorType,
                id: oldConductorType.id,
            }
        );
    });
    test("submits form with invalid input", async () => {
        const { form, submitBtn, user } = await setup();
        const badConductor = {
            ...newConductorType,
            name: faker.string.alpha(),
        };

        await completeForm(user, form, labels, badConductor);

        // select Conductor Type
        await user.click(submitBtn);

        expect(trpcFn).not.toHaveBeenCalledWith(
            "mutation",
            "conductorType.update",
            expect.anything()
        );
    });
});
