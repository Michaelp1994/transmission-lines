/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/ui/button";
import React from "react";

describe("Button", () => {
    test("renders Button", () => {
        // eslint-disable-next-line i18next/no-literal-string
        render(<Button>Test</Button>);
        const button = screen.getByText(/Test/i);
        expect(button).toBeVisible();
    });
});
