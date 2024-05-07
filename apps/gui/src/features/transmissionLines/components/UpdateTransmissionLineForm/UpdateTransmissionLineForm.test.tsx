import { faker } from "@faker-js/faker";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import UpdateTransmissionLineForm from "./UpdateTransmissionLineForm";
import { createRender, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import {
    createArray,
    createTransmissionLine,
    getSource,
    getTransmissionLine,
    mockIds,
} from "~tests/helpers/mockData";
import UnreachableError from "~tests/UnreachableError";
import selectAction from "~tests/helpers/selectAction";

const labels = {
    name: /name/i,
};

describe("Update Transmission Line Form", () => {
    const lineId = mockIds.lineId();
    const mockSources = createArray(10, getSource);
    const oldTransmissionLine = getTransmissionLine(
        mockSources.map((source) => source.id)
    );
    const newTransmissionLine = createTransmissionLine(
        mockSources.map((source) => source.id)
    );
    const trpcFn = vi.fn();
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();

        trpcFn.mockResolvedValueOnce(oldTransmissionLine);
        trpcFn.mockResolvedValueOnce(mockSources);
        const utils = render(<UpdateTransmissionLineForm lineId={lineId} />);
        const form = await utils.findByRole("form");

        return { form, user, ...utils };
    }

    test("correctly calls API", async () => {
        await setup();
        expect(trpcFn).toHaveBeenCalledWith(
            "query",
            "transmissionLine.getById",
            {
                id: lineId,
            }
        );
    });
    test("submits form with valid input", async () => {
        const { form, user } = await setup();
        const fromSource = mockSources.find(
            (source) => source.id === newTransmissionLine.fromSourceId
        );
        const toSource = mockSources.find(
            (source) => source.id === newTransmissionLine.toSourceId
        );

        // Fill in the form
        await completeForm(user, form, labels, newTransmissionLine);

        if (!fromSource || !toSource) {
            throw new UnreachableError();
        }

        await selectAction(user, form, /from source/i, fromSource.name);

        // To Source
        await selectAction(user, form, /to source/i, toSource.name);

        // Submit the form
        const submitBtn = within(form).getByRole("button", { name: /submit/i });

        await user.click(submitBtn);

        // Assert that the form is submitted successfully
        expect(trpcFn).toHaveBeenLastCalledWith(
            "mutation",
            "transmissionLine.update",
            {
                ...newTransmissionLine,
                id: lineId,
            }
        );
    });

    test("displays error message for invalid input", async () => {
        const { form, user } = await setup();

        const badSource = {
            ...newTransmissionLine,
            name: faker.string.alpha(),
        };

        // Fill in the form
        await completeForm(user, form, labels, badSource);
        // Submit the form
        const submitBtn = within(form).getByRole("button", { name: /submit/i });

        await user.click(submitBtn);

        // Assert that the form is not submitted.
        expect(trpcFn).not.toHaveBeenCalledWith(
            "mutation",
            "transmissionLine.update",
            expect.anything()
        );
    });
});
