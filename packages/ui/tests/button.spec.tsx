import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Button } from "../src/components/ui/button";

describe("Button", () => {
    test("renders Button", () => {
        render(<Button>Test</Button>);
        const button = screen.getByText(/test/i);

        expect(button).toBeDefined();
    });
});
