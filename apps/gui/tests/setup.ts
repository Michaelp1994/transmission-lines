import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, expect, vi } from "vitest";

expect.extend(matchers);

afterEach(() => {
    cleanup();
});

vi.mock("@tanstack/react-router", () => ({
    useNavigate() {
        return vi.fn();
    },
}));

beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe() {
            // do nothing
        }

        unobserve() {
            // do nothing
        }

        disconnect() {
            // do nothing
        }
    };
});
