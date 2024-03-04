import { describe, expect, test } from "vitest";

import {
    Circuit,
    Line,
    LineGeometry,
    LineSpacing,
    Reactor,
    VSource,
    WireData,
} from "@/classes";
import { type OpenDSSOptions } from "@/schemas";

describe("Testing circuit class", () => {
    test("Create a circuit", () => {
        const circuit = new Circuit("testProject");
        expect(circuit.name).toBe("testProject");
        circuit.close();
    });
    test("options are being set in OpenDSS", () => {
        const options = {
            "%growth": 5,
            "%mean": 5,
            "%normal": 5,
            "%stddev": 5,
        } as const satisfies OpenDSSOptions;
        const circuit = new Circuit("testProject", options);
        Object.entries(options).forEach(([name, value]) => {
            const result = circuit.driver.getOption(
                name as keyof OpenDSSOptions
            );
            expect(result).toBe(value.toString());
        });
        circuit.close();
    });

    test("build a simple circuit", () => {
        const circuit = new Circuit("testcircuit", undefined, true);

        const source = new VSource({
            name: "source1",
            bus1: {
                name: "b_source",
                phases: [1, 2, 3],
            },
            basekv: 138,
            phases: 3,
            isc1: 100,
            isc3: 200,
            x0r0: 4,
            x1r1: 3,
        });
        circuit.add(source);

        const reactor = new Reactor({
            name: "source1_rt",
            bus1: {
                name: "b_source",
                phases: [4],
            },
            bus2: {
                name: "b_source",
                phases: [0],
            },
            x: 0,
            r: 2,
            phases: 1,
        });
        circuit.add(reactor);

        const cable = new WireData({
            name: "cable1",
            gmrac: 4,
            diam: 12,
            rUnits: "km",
            gmrUnits: "mm",
            radUnits: "mm",
            rac: 0.5,
        });
        circuit.add(cable);

        const spacing1 = new LineSpacing({
            name: "spacing1",
            nConds: 4,
            nPhases: 4,
            units: "m",
            h: [4, 5, 6, 10],
            x: [1, 2, 3, 10],
        });
        circuit.add(spacing1);

        const geometry1 = new LineGeometry({
            name: "geometry1",
            nconds: 4,
            nphases: 4,
            spacing: spacing1,
            wires: [cable, cable, cable, cable],
        });
        circuit.add(geometry1);

        const line = new Line({
            name: "line1",
            bus1: {
                name: "b_source",
                phases: [1, 2, 3, 4],
            },
            bus2: {
                name: "b_end",
                phases: [1, 2, 3, 4],
            },
            phases: 4,
            length: 100,
            units: "m",
            geometry: geometry1,
        });
        circuit.add(line);
        circuit.build();
        circuit.solve();
        expect(circuit.driver.getNumCircuits()).toBe(1);
        expect(circuit.driver.getNumElements()).toBe(4);
        const lineCurrents = circuit.getCurrents(line);
        const reactorCurrents = circuit.getCurrents(reactor);
        expect(lineCurrents).toHaveLength(8);
        expect(reactorCurrents).toHaveLength(2);
        circuit.close();
    });
});
