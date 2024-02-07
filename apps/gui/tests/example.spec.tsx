import { it, describe, expect, beforeAll, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import App from "../src/App";

beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // Deprecated
            removeListener: vi.fn(), // Deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe("GUI", () => {
    it("renders", () => {
        render(<App />);
        expect(screen.getByText("Open Project")).toBeDefined();
    });
});
