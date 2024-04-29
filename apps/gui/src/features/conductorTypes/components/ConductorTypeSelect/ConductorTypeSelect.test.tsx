import { describe, expect, test } from "vitest";

import DataWrapper from "./DataWrapper";

import { render } from "~test-utils";

describe("ConductorTypeSelect", () => {
    test("renders", () => {
        render(<DataWrapper />);
        expect(true).toBe(true);
    });
});
