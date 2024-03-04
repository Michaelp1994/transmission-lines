import { describe, expect, test } from "vitest";

import { VSource } from "@/classes";

describe("Creating VSource components in OpenDSS", () => {
    test("Create a basic Vsource class", () => {
        const source = new VSource({
            name: "Esoura",
            bus1: {
                name: "T1",
                phases: [1, 2, 3],
            },
            phases: 3,
            isc1: 100,
            isc3: 200,
            x0r0: 4,
            x1r1: 3,
        });
        const script = source.create();
        expect(script).toStrictEqual([
            "New Vsource.Esoura bus1=T1.1.2.3 phases=3 x1r1=3 x0r0=4 isc3=200 isc1=100",
        ]);
    });
});
