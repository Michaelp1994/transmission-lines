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
    Link({ children }: { children: React.ReactNode }) {
        return <a href="#test">{children}</a>;
    },
}));

Element.prototype.scrollIntoView = vi.fn();

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
