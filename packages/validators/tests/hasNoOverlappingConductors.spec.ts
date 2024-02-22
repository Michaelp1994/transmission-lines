import { describe, expect, test } from "vitest";

import hasNoOverlappingConductors from "../src/helpers/hasNoOverlappingConductors";

describe("has no overlapping conductors function", () => {
    test("correctly identifies overlapping conductors", () => {
        const result = hasNoOverlappingConductors([
            { x: 0, y: 0 },
            { x: 0, y: 0 },
        ]);
        expect(result).toBeFalsy();
    });
    test("correctly identifies no overlapping conductors", () => {
        const result = hasNoOverlappingConductors([
            { x: 0, y: 0 },
            { x: 12, y: 12 },
        ]);
        expect(result).toBeTruthy();
    });
});
