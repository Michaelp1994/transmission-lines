import { describe, expect, test } from "vitest";

import { Fault } from "@/classes";

describe("Fault components in OpenDSS", () => {
    test("Create a basic Fault class", () => {
        const fault = new Fault({
            name: "Short_Circuit",
            bus1: {
                name: "T1",
                phases: [1, 2, 3],
            },
            phases: 3,
            r: 2,
        });
        const script = fault.create();
        expect(script).toStrictEqual([
            "New Fault.Short_Circuit bus1=T1.1.2.3 phases=3 r=2",
        ]);
    });
});
