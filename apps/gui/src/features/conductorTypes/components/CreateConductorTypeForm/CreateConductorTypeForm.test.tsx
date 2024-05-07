import { describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import CreateConductorTypeForm from "./CreateConductorTypeForm";
import { createRender, within } from "~test-utils";
import { createConductorType } from "~tests/helpers/mockData";
import completeForm from "~tests/helpers/completeForm";

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

describe("Create Conductor Type Form", () => {
    const fakeConductorType = createConductorType();
    const trpcFn = vi.fn().mockResolvedValue(fakeConductorType);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(<CreateConductorTypeForm />);
        const form = await utils.findByRole("form");

        return { user, form, ...utils };
    }
    test("submits the form with correct inputs", async () => {
        const { form, user } = await setup();

        await completeForm(user, form, labels, fakeConductorType);

        expect(form).toHaveFormValues(fakeConductorType);

        await user.click(within(form).getByRole("button", { name: /submit/i }));
    });
});
