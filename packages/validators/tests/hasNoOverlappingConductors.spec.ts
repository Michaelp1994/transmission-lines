import hasNoOverlappingConductors from "../src/helpers/hasNoOverlappingConductors";

describe("has no overlapping conductors function", () => {
    it("correctly identifies overlapping conductors", () => {
        const result = hasNoOverlappingConductors([
            { x: 0, y: 0 },
            { x: 0, y: 0 },
        ]);
        expect(result).toBeFalsy();
    });
    it("correctly identifies no overlapping conductors", () => {
        const result = hasNoOverlappingConductors([
            { x: 0, y: 0 },
            { x: 12, y: 12 },
        ]);
        expect(result).toBeTruthy();
    });
});
