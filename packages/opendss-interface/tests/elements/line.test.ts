import { describe, expect, test } from "vitest";
import { Line } from "@/classes";

describe("line components in OpenDSS", () => {
    test("create a basic Line class", () => {
        const line = new Line({
            name: "Line1",
            bus1: {
                name: "T1",
                phases: [1, 2, 3],
            },
            phases: 3,
        });
        const script = line.create();

        expect(script).toStrictEqual(["New Line.Line1 bus1=T1.1.2.3 phases=3"]);
    });
});
