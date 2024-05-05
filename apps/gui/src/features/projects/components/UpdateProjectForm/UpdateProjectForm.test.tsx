import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { faker } from "@faker-js/faker";
import UpdateProjectForm from "./UpdateProjectForm";
import { createRender, screen, within } from "~test-utils";
import { createMockProject, mockIds } from "~tests/helpers/mockData";
import completeForm from "~tests/helpers/completeForm";

const labels = {
    name: /name/i,
};

describe("Update Project Form", () => {
    const oldProject = createMockProject();
    const newProject = createMockProject();
    const projectId = mockIds.projectId();
    const trpcFn = vi.fn().mockResolvedValue(oldProject);
    const render = createRender(trpcFn);

    async function setup() {
        const user = userEvent.setup();
        const utils = render(<UpdateProjectForm projectId={projectId} />);
        const form = await screen.findByRole("form");

        return { user, utils, form };
    }

    test("correctly calls API", async () => {
        await setup();
        expect(trpcFn).toHaveBeenCalledTimes(1);
        expect(trpcFn).toHaveBeenCalledWith("query", "project.getById", {
            id: projectId,
        });
    });

    test("that form correctly displays old project information", async () => {
        const { form } = await setup();

        expect(form).toHaveFormValues(oldProject);
    });

    test("fill out form correctly and check that information is sent to server", async () => {
        const { user, form } = await setup();

        await completeForm(user, form, labels, newProject);
        const confirmBtn = screen.getByRole("button", { name: /submit/i });

        await user.click(confirmBtn);
        const toast = await screen.findByRole("status");

        expect(
            within(toast).getByText(/(.*) has been updated./)
        ).toBeInTheDocument();
        expect(trpcFn).toHaveBeenCalledTimes(2);
        expect(trpcFn).toHaveBeenLastCalledWith("mutation", "project.update", {
            ...newProject,
            id: projectId,
        });
    });
    test("fill out form incorrectly and check that information is not sent to server", async () => {
        const { user, form } = await setup();

        trpcFn.mockClear();
        await completeForm(user, form, labels, {
            ...newProject,
            name: faker.string.alpha(),
        });
        const confirmBtn = screen.getByRole("button", { name: /submit/i });

        await user.click(confirmBtn);
        expect(
            screen.getByText(/name must be at least 3 character\(s\)/i)
        ).toBeInTheDocument();
        expect(trpcFn).not.toHaveBeenCalled();
    });
});
