import { describe, expect, test } from "vitest";
import { LineGeometry, LineSpacing } from "@/classes";

describe("line Geometry components in OpenDSS", () => {
    test("create a basic Line Geometry class", () => {
        const spacing = new LineSpacing({
            name: "test_spacing",
            nConds: 2,
            nPhases: 2,
            h: [10, 12],
            x: [10, 12],
            units: "km",
        });
        const source = new LineGeometry({
            name: "geometry1",
            nphases: 2,
            nconds: 2,
            spacing,
            units: "km",
        });
        const script = source.create();

        expect(script).toStrictEqual([
            "New LineGeometry.geometry1 nconds=2 nphases=2 units=km spacing=test_spacing",
        ]);
    });
});
