import { faker } from "@faker-js/faker";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import BaseForm from "./BaseForm";
import { render, screen } from "~test-utils";

describe("Update Source Form", () => {
    test("renders form fields and buttons", () => {
        const validHandler = vi.fn();
        const invalidHandler = vi.fn();
        const source = {
            name: "Test Source",
            enabled: true,
        };

        render(
            <BaseForm
                data={source}
                onValid={validHandler}
                onInvalid={invalidHandler}
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
        const validHandler = vi.fn();
        const invalidHandler = vi.fn();
        const source = {
            name: "Test Source",
            enabled: true,
        };

        render(
            <BaseForm
                data={source}
                onValid={validHandler}
                onInvalid={invalidHandler}
            />
        );

        const newName = faker.word.noun(10);
        const nameInput = screen.getByLabelText("Name");

        // Fill in the form fields
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, newName);

        // Submit the form
        await userEvent.click(screen.getByRole("button", { name: "Submit" }));
        expect(invalidHandler).not.toHaveBeenCalled();
        expect(validHandler).toHaveBeenCalledWith({
            enabled: true,
            name: newName,
        });
    });

    test("submits form with invalid input", async () => {
        const validHandler = vi.fn();
        const invalidHandler = vi.fn();
        const source = {
            name: "Test Source",
            enabled: true,
        };

        render(
            <BaseForm
                data={source}
                onValid={validHandler}
                onInvalid={invalidHandler}
            />
        );

        const nameInput = screen.getByLabelText("Name");

        // Fill in the form fields
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, "t");

        // Submit the form
        await userEvent.click(screen.getByRole("button", { name: "Submit" }));
        expect(invalidHandler).toHaveBeenCalled();
        expect(validHandler).not.toHaveBeenCalled();
    });
});
