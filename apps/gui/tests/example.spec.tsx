import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import App from "~/App";

describe("GUI", () => {
    test("renders", () => {
        render(<App />);

        expect(screen.getByText("Add Project")).toBeDefined();
    });
});
