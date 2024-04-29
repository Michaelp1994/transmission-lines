import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import CreateProjectForm from "./CreateProjectForm";

import { render, screen } from "~test-utils";

// import MockApp from "./MockApp";

describe("CreateProjectForm", () => {
    test("renders form fields and buttons", () => {
        const validFnHandler = vi.fn();
        const invalidFnHandler = vi.fn();
        render(
            <CreateProjectForm
                onValid={validFnHandler}
                onInvalid={invalidFnHandler}
            />
        );

        // Assert that form fields are rendered
        expect(screen.getByLabelText("Name")).toBeInTheDocument();

        // Assert that buttons are rendered
        expect(
            screen.getByRole("button", { name: "Reset" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Submit" })
        ).toBeInTheDocument();
    });

    test("submits form with valid input", async () => {
        const validFnHandler = vi.fn();
        const invalidFnHandler = vi.fn();
        const user = userEvent.setup();

        render(
            <CreateProjectForm
                onValid={validFnHandler}
                onInvalid={invalidFnHandler}
            />
        );

        // Fill in form fields with valid input
        await user.type(screen.getByLabelText("Name"), "TestProject123");
        // Submit the form
        await user.click(screen.getByRole("button", { name: "Submit" }));

        // Assert that the form is submitted successfully
        // Add your assertions here
        expect(validFnHandler).toHaveBeenCalledTimes(1);
        expect(validFnHandler).toHaveBeenCalledWith({
            name: "TestProject123",
        });
    });

    test("displays error message for invalid input", async () => {
        const validFnHandler = vi.fn();
        const invalidFnHandler = vi.fn();
        const user = userEvent.setup();

        render(
            <CreateProjectForm
                onValid={validFnHandler}
                onInvalid={invalidFnHandler}
            />
        );
        await user.type(screen.getByLabelText("Name"), " ");
        // Fill in form fields with invalid input

        // Submit the form
        await user.click(screen.getByRole("button", { name: "Submit" }));
        // Assert that error message is displayed
        expect(
            screen.getByText("String must contain at least 3 character(s)")
        ).toBeInTheDocument();
        expect(validFnHandler).toHaveBeenCalledTimes(0);
        expect(invalidFnHandler).toHaveBeenCalledTimes(1);
    });
});
