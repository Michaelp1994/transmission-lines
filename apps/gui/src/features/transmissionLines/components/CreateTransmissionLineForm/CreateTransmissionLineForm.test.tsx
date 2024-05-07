import { faker } from "@faker-js/faker";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import CreateTransmissionLineForm from "./CreateTransmissionLineForm";
import { createRender, screen, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import {
    createArray,
    createTransmissionLine,
    getSource,
    mockIds,
} from "~tests/helpers/mockData";
import selectAction from "~tests/helpers/selectAction";
import UnreachableError from "~tests/UnreachableError";

const labels = {
    name: /name/i,
} as const;

describe("Create Transmission Line Form", () => {
    const mockSources = createArray(10, getSource);
    const fakeTransmissionLine = createTransmissionLine(
        mockSources.map((source) => source.id)
    );
    const fromSource = mockSources.find(
        (source) => source.id === fakeTransmissionLine.fromSourceId
    );
    const toSource = mockSources.find(
        (source) => source.id === fakeTransmissionLine.toSourceId
    );

    if (!fromSource || !toSource) {
        throw new UnreachableError();
    }
    const projectId = mockIds.projectId();
    const trpcFn = vi.fn().mockResolvedValue(fakeTransmissionLine);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();

        trpcFn.mockResolvedValueOnce(mockSources);
        const utils = render(
            <CreateTransmissionLineForm projectId={projectId} />
        );
        const form = await utils.findByRole("form");

        return { user, form, ...utils };
    }

    test("submits form with valid input", async () => {
        const { form, user } = await setup();
        // Fill in form fields with valid input

        await completeForm(user, form, labels, fakeTransmissionLine);

        // From Source
        await selectAction(user, form, /from source/i, fromSource.name);

        // To Source
        await selectAction(user, form, /to source/i, toSource.name);

        // Submit the form
        await user.click(within(form).getByRole("button", { name: /submit/i }));
        // Assert that the form is submitted successfully
        expect(trpcFn).toBeCalledWith("mutation", "transmissionLine.create", {
            ...fakeTransmissionLine,
            fromSourceId: fromSource.id,
            toSourceId: toSource.id,
            projectId,
        });
    });

    test("displays error message for invalid input", async () => {
        const { form, user } = await setup();
        // Fill in form fields with valid input

        await completeForm(user, form, labels, {
            ...fakeTransmissionLine,
            name: faker.string.alpha(),
        });

        // From Source
        await selectAction(user, form, /from source/i, fromSource.name);

        // To Source
        await selectAction(user, form, /to source/i, toSource.name);

        // Submit the form
        await user.click(screen.getByRole("button", { name: /submit/i }));
        // Assert that the form is submitted successfully
        expect(
            within(form).getByText(/name must be at least 3 character\(s\)/i)
        ).toBeInTheDocument();
        expect(trpcFn).not.toBeCalledWith(
            "mutation",
            "transmissionLine.create",
            expect.anything()
        );
    });
});
