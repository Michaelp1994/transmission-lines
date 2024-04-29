import { faker } from "@faker-js/faker";
import { Button } from "@repo/ui";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import ModalProvider from "~/contexts/ModalProvider";
import { useCreateConductorLocationModal } from "~/utils/modals";
import { render, screen, within } from "~test-utils";
import MockTrpcProvider from "~tests/mocks/TrpcProvider";

describe("Create Conductor Location Modal", () => {
    test("calls correct TRPC call on confirmation", async () => {
        const user = userEvent.setup();
        const newConductorLocation = {
            geometryId: faker.string.uuid(),
            x: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
            y: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
        };
        const mockFn = vi.fn(() => Promise.resolve(newConductorLocation));
        const displayModal = useCreateConductorLocationModal(
            newConductorLocation.geometryId
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
        await user.type(
            within(dialog).getByLabelText(/x/i),
            String(newConductorLocation.x)
        );
        await user.type(
            within(dialog).getByLabelText(/y/i),
            String(newConductorLocation.y)
        );
        const confirm = within(dialog).getByRole("button", {
            name: /create/i,
        });
        await user.click(confirm);

        expect(mockFn).toHaveBeenCalledWith(newConductorLocation);
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(dialog).not.toBeInTheDocument();
    });
    test("doesn't call TRPC when there is incorrect data", async () => {
        const user = userEvent.setup();
        const newConductorLocation = {
            geometryId: faker.string.uuid(),
            x: faker.number.float({ min: -10, max: -1, fractionDigits: 2 }),
            y: faker.number.float({ min: -10, max: -1, fractionDigits: 2 }),
        };
        const mockFn = vi.fn(() => Promise.resolve(newConductorLocation));
        const displayModal = useCreateConductorLocationModal(
            newConductorLocation.geometryId
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

        await user.clear(within(dialog).getByLabelText(/x/i));
        await user.clear(within(dialog).getByLabelText(/y/i));
        await user.type(
            within(dialog).getByLabelText(/x/i),
            String(newConductorLocation.x)
        );
        await user.type(
            within(dialog).getByLabelText(/y/i),
            String(newConductorLocation.y)
        );
        const confirm = within(dialog).getByRole("button", {
            name: /create/i,
        });
        await user.click(confirm);

        expect(mockFn).not.toHaveBeenCalled();
        expect(dialog).toBeInTheDocument();
    });
    test("doesn't call TRPC with empty inputs", async () => {
        const user = userEvent.setup();
        const newConductorLocation = {
            geometryId: faker.string.uuid(),
            x: "",
            y: "",
        };
        const mockFn = vi.fn(() => Promise.resolve(newConductorLocation));
        const displayModal = useCreateConductorLocationModal(
            newConductorLocation.geometryId
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

        await user.clear(within(dialog).getByLabelText(/x/i));
        await user.clear(within(dialog).getByLabelText(/y/i));
        const confirm = within(dialog).getByRole("button", {
            name: /create/i,
        });
        await user.click(confirm);

        expect(mockFn).not.toHaveBeenCalled();
        expect(dialog).toBeInTheDocument();
    });
});
