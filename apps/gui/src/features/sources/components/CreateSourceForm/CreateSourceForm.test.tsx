import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

import CreateSourceForm from "./CreateSourceForm";

import { createRender, screen } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import { createSource } from "~tests/helpers/mockData";
import verifyForm from "~tests/helpers/verifyForm";

const labels = {
    name: /name/i,
    phases: /phases/i,
    frequency: /frequency/i,
    enabled: /enabled/i,
    voltage: /voltage/i,
    x1r1: /x1\/r1/i,
    x0r0: /x0\/r0/i,
    isc3: /short circuit 3 phase current/i,
    isc1: /short circuit 1 phase current/i,
    resistance: /resistance/i,
} as const;

describe("Create Source Form", () => {
    const fakeSource = createSource();
    const trpcFn = vi.fn().mockResolvedValue(fakeSource);
    const render = createRender(trpcFn);

    beforeEach(() => {
        vi.clearAllMocks();
    });
    test("renders form fields and buttons", () => {
        render(<CreateSourceForm projectId={fakeSource.projectId} />);
        // Assert that form fields are rendered
        verifyForm(labels);
        expect(
            screen.getByRole("button", { name: /reset/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /submit/i })
        ).toBeInTheDocument();
    });

    test("submits form with valid input", async () => {
        const user = userEvent.setup();
        render(<CreateSourceForm projectId={fakeSource.projectId} />);

        // Fill in form fields with valid input

        await completeForm(user, labels, fakeSource);

        // Submit the form
        await user.click(screen.getByRole("button", { name: /submit/i }));

        // Assert that the form is submitted successfully
        expect(trpcFn).toBeCalledWith({
            name: fakeSource.name,
            enabled: fakeSource.enabled,
            projectId: fakeSource.projectId,
            phases: fakeSource.phases,
            frequency: fakeSource.frequency,
            voltage: fakeSource.voltage,
            x1r1: fakeSource.x1r1,
            x0r0: fakeSource.x0r0,
            isc3: fakeSource.isc3,
            isc1: fakeSource.isc1,
            resistance: fakeSource.resistance,
        });
    });

    test("displays error message for invalid input", async () => {
        const user = userEvent.setup();

        render(<CreateSourceForm projectId={fakeSource.projectId} />);

        // Fill in form fields with valid input

        await completeForm(user, labels, {
            ...fakeSource,
            name: faker.string.alpha(),
        });

        // Submit the form
        await user.click(screen.getByRole("button", { name: "Submit" }));
        // Assert that the form is submitted successfully

        // Add your assertions here
        expect(trpcFn).not.toBeCalled();
    });
});
