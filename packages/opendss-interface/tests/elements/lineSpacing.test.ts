import { describe, expect, test } from "vitest";

import { LineSpacing } from "@/classes";

describe("LineSpacing components in OpenDSS", () => {
    test("Create a basic LineSpacing class", () => {
        const lineSpacing = new LineSpacing({
            name: "k1",
            x: [-3.15, -3.15, -3.15, 3.15, 3.15, 3.15, -1.225, 1.225],
            h: [14.08, 17.74, 21.4, 14.08, 17.74, 21.4, 23.23, 23.23],
        });
        const script = lineSpacing.create();
        expect(script).toStrictEqual([
            "New LineSpacing.k1 x=[-3.15 -3.15 -3.15 3.15 3.15 3.15 -1.225 1.225] h=[14.08 17.74 21.4 14.08 17.74 21.4 23.23 23.23]",
        ]);
    });
});
