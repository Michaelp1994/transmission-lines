import { faker } from "@faker-js/faker";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import type { SourceFormInput } from "@repo/validators/forms/Source.schema";
import CreateSourceForm from "./CreateSourceForm";
import { createRender, screen, within } from "~test-utils";
import completeForm from "~tests/helpers/completeForm";
import { createSource, mockIds } from "~tests/helpers/mockData";

const labels: Record<keyof SourceFormInput, RegExp> = {
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
    const projectId = mockIds.projectId();
    const trpcFn = vi.fn().mockResolvedValue(fakeSource);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(<CreateSourceForm projectId={projectId} />);
        const form = await utils.findByRole("form");

        return { user, form, ...utils };
    }

    test("submits form with valid input", async () => {
        const { form, user } = await setup();
        // Fill in form fields with valid input

        await completeForm(user, form, labels, fakeSource);
        // Submit the form
        await user.click(screen.getByRole("button", { name: /submit/i }));
        // Assert that the form is submitted successfully
        expect(trpcFn).toBeCalledTimes(1);
        expect(trpcFn).toBeCalledWith("mutation", "source.create", {
            ...fakeSource,
            projectId,
        });
    });

    test("displays error message for invalid input", async () => {
        const { form, user } = await setup();
        // Fill in form fields with valid input

        await completeForm(user, form, labels, {
            ...fakeSource,
            name: faker.string.alpha(),
        });

        // Submit the form
        await user.click(screen.getByRole("button", { name: /submit/i }));
        // Assert that the form is submitted successfully

        // Add your assertions here
        expect(
            within(form).getByText(/name must be at least 3 character\(s\)/i)
        ).toBeInTheDocument();
        expect(trpcFn).not.toBeCalled();
    });
});
