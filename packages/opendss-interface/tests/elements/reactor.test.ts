import { describe, expect, test } from "vitest";

import { Reactor } from "@/classes";

describe("Creating Reactor components in OpenDSS", () => {
    test("Create a basic Reactor Class and convert to OpenDSS", () => {
        const reactor = new Reactor({
            name: "T1_RT",
            bus2: {
                name: "T1",
                phases: [0],
            },
            bus1: {
                name: "T1",
                phases: [4],
            },
            x: 0,
            r: 2,
            phases: 1,
        });

        const script = reactor.create();
        expect(script).toStrictEqual([
            "New Reactor.T1_RT bus1=T1.4 bus2=T1.0 phases=1 r=2 x=0",
        ]);
    });
});
