import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import BaseDeleteModal from "./BaseDeleteModal";
import { render, screen } from "~test-utils";

describe("Delete Project Modal", () => {
    test("confirm delete", async () => {
        const user = userEvent.setup();

        const mockCloseFn = vi.fn();
        const mockConfirmFn = vi.fn();

        render(
            <BaseDeleteModal onClose={mockCloseFn} onConfirm={mockConfirmFn} />
        );

        await user.click(screen.getByRole("button", { name: "Confirm" }));
        expect(mockConfirmFn).toBeCalled();
        expect(mockCloseFn).toBeCalled();
    });

    test("cancel doesn't trigger the delete", async () => {
        const user = userEvent.setup();

        const mockCloseFn = vi.fn();
        const mockConfirmFn = vi.fn();

        render(
            <BaseDeleteModal onClose={mockCloseFn} onConfirm={mockConfirmFn} />
        );

        await user.click(screen.getByRole("button", { name: "Cancel" }));
        expect(mockConfirmFn).not.toBeCalled();
        expect(mockCloseFn).toBeCalled();
    });
});
