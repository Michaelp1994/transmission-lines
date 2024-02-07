import { test, expect, describe } from "@jest/globals";
import GeneralStudy from "../classes/GeneralStudy";
import {
    Circuit,
    Fault,
    Line,
    Reactor,
    Vsource,
} from "../classes/elements/index";

describe("An example test for OpenDSS", () => {
    test("Create a Circuit", async () => {
        const study: GeneralStudy | null = new GeneralStudy();

        const toyota = new Circuit({
            name: "Toyota",
            bus1: "b_toyota",
            Isc1: 3000,
            Isc3: 4000,
            x0r0: 3,
            x1r1: 4,
            phases: 3,
        });
        const esoura = new Vsource({
            name: "Esoura",
            bus1: "b_esoura",
            Isc1: 3000,
            Isc3: 4000,
            x0r0: 3,
            x1r1: 4,
            phases: 3,
        });
        const line = new Line({
            name: "Line",
            bus1: "b_toyota",
            bus2: "T1",
            length: 1,
            units: "km",
            phases: 4,
        });
        const reactor = new Reactor({
            name: "T1_RT",
            bus1: "T1.4",
            bus2: "T1.0",
            X: 0,
            R: 2,
            phases: 1,
        });
        const line2 = new Line({
            name: "Line2",
            bus1: "T1",
            bus2: "b_esoura",
            length: 1,
            units: "km",
            phases: 4,
        });

        const fault = new Fault({
            name: "SHORT_CIRCUIT",
            bus1: "T1.1",
            bus2: "T1.4",
        });
        study.add(toyota);
        study.add(esoura);
        study.add(line);
        study.add(line2);
        study.add(reactor);
        study.add(fault);
        study.build();
        study.setOptions({ earthModel: "Carson", basefrequency: 60 });
        const earthModel = study.getOption("earthModel");
        const basefreq = study.getOption("basefrequency");
        expect(earthModel).toBe("Carson");
        expect(basefreq).toBe("60");
        study.solve();
        const current = study.readCurrent(fault, 1);
        expect(current).toBeGreaterThan(0);
    });
    test("should build a basic circuit and test the correct buses.", () => {
        const study = new GeneralStudy();

        const circuit = new Circuit({ name: "Toyota", bus1: "b_toyota" });
        const line = new Line({
            name: "Line1",
            bus1: "b_toyota",
            bus2: "b_esoura",
            length: 1000,
            units: "km",
            phases: 3,
            Xg: 0,
            Rg: 0,
            rho: 100,
            C0: 0,
            C1: 1,
            B0: 10,
            B1: 500,
            normAmps: 1000,
            r0: 500,
            r1: 500,
            EarthModel: "Carson",
            x0: 10,
            x1: 10,
        });
        study.add(circuit);
        study.add(line);
        study.build();
        study.solve();
        const buses = study.getBuses();
        expect(buses).toStrictEqual(["b_toyota", "b_esoura"]);
    });
});
