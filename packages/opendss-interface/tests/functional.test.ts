import { describe, expect, test } from "vitest";

import Reactor from "@/new/reactor";
import Study from "@/new/study";
import Vsource from "@/new/vsource";

describe("An example test for OpenDSS", () => {
    test("Vsource class", () => {
        const source = new Vsource({
            circuit: true,
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
            "New Circuit.Esoura bus1=T1.1.2.3 phases=3 x1r1=3 x0r0=4 isc3=200 isc1=100",
        ]);
    });
    test("Reactor class", () => {
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
    test("Full study", () => {
        const source = new Vsource({
            circuit: true,
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
        const reactor = new Reactor({
            name: "T1_RT",
            bus1: {
                name: "T1",
                phases: [4],
            },
            bus2: {
                name: "T1",
                phases: [0],
            },
            x: 0,
            r: 2,
            phases: 1,
        });
        const study = new Study();
        study.add(source);
        study.add(reactor);
        study.build();
    });
});
