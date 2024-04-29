import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import ModalProvider from "~/contexts/ModalProvider";
import { useUpdateConductorLocationModal } from "~/utils/modals";
import { render, screen, within } from "~test-utils";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

describe("Update Conductor Location Modal", () => {
    const oldConductorLocation = {
        id: faker.number.int(),
        x: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
        y: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
    };

    test("old data is displayed correctly", async () => {
        const user = userEvent.setup();

        const mockFn = vi.fn(() => Promise.resolve(oldConductorLocation));
        const displayModal = useUpdateConductorLocationModal(
            oldConductorLocation.id
        );

        render(
            <MockTrpcProvider mockFn={mockFn}>
                <ModalProvider>
                    <Button onClick={displayModal}>Click Here</Button>
                </ModalProvider>
            </MockTrpcProvider>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("dialog");
        const xInput = await within(dialog).findByLabelText(/x/i);
        const yInput = await within(dialog).findByLabelText(/y/i);

        expect(xInput).toHaveValue(oldConductorLocation.x);
        expect(yInput).toHaveValue(oldConductorLocation.y);
    });

    test("calls TRPC with correct data", async () => {
        const user = userEvent.setup();

        const newConductorLocation = {
            id: oldConductorLocation.id,
            x: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
            y: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
        };

        const mockFn = vi.fn(() => Promise.resolve(oldConductorLocation));
        const displayModal = useUpdateConductorLocationModal(
            newConductorLocation.id
        );

        render(
            <MockTrpcProvider mockFn={mockFn}>
                <ModalProvider>
                    <Button onClick={displayModal}>Click Here</Button>
                </ModalProvider>
            </MockTrpcProvider>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("dialog");
        const xInput = await within(dialog).findByLabelText(/x/i);
        const yInput = await within(dialog).findByLabelText(/y/i);

        await user.clear(xInput);
        await user.clear(yInput);

        await user.type(xInput, String(newConductorLocation.x));
        await user.type(yInput, String(newConductorLocation.y));

        const confirm = within(dialog).getByRole("button", {
            name: /submit/i,
        });
        await user.click(confirm);
        expect(mockFn).toHaveBeenLastCalledWith(newConductorLocation);
        expect(mockFn).toHaveBeenCalledTimes(2);
        expect(dialog).not.toBeInTheDocument();
    });

    test("doesn't calls TRPC with incorrect data", async () => {
        const user = userEvent.setup();

        const newConductorLocation = {
            conductorLocationId: faker.number.int(),
            x: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
            y: faker.number.float({ min: -10, max: -1, fractionDigits: 2 }),
        };

        const mockFn = vi.fn(() => Promise.resolve(oldConductorLocation));
        const displayModal = useUpdateConductorLocationModal(
            newConductorLocation.conductorLocationId
        );

        render(
            <MockTrpcProvider mockFn={mockFn}>
                <ModalProvider>
                    <Button onClick={displayModal}>Click Here</Button>
                </ModalProvider>
            </MockTrpcProvider>
        );

        await user.click(screen.getByRole("button", { name: /click here/i }));
        const dialog = await screen.findByRole("dialog");
        const xInput = await within(dialog).findByLabelText(/x/i);
        const yInput = await within(dialog).findByLabelText(/y/i);
        await user.clear(xInput);
        await user.clear(yInput);

        await user.type(xInput, String(newConductorLocation.x));
        await user.type(yInput, String(newConductorLocation.y));

        const confirm = within(dialog).getByRole("button", {
            name: /submit/i,
        });
        await user.click(confirm);
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(dialog).toBeInTheDocument();
    });
});
