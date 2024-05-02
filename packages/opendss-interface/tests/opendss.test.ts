import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    test,
} from "vitest";
import { OpenDssDriver } from "@/classes";

describe("openDSS Driver", () => {
    let driver: OpenDssDriver;

    beforeAll(() => {
        driver = new OpenDssDriver();
    });
    beforeEach(() => {
        driver.clear();
    });
    afterAll(() => {
        driver.close();
    });

    test("can get version", () => {
        const version = driver.dss.Version;

        // "Version 9.7.1.1 (64-bit build); License Status: Open "
        expect(version).toMatch(/Version .*/);
    });
    test("create a circuit", () => {
        driver.createCircuit("testcircuit1");
        const activeCircuit = driver.getActiveCircuit();
        const numCircuits = driver.dss.NumCircuits;

        expect(activeCircuit).toBe("testcircuit1");
        expect(numCircuits).toBe(1);
    });
    test("add components to circuit", () => {
        expect(driver.getActiveCircuit()).toBeNull();

        driver.createCircuit("testcircuit1");
        driver.sendString("new vsource.source1 bus1=bus1");
        driver.sendString("new vsource.source2 bus1=bus2");
        driver.sendString("new vsource.source3 bus1=bus3");

        expect(driver.getActiveCircuit()).toBe("testcircuit1");

        expect(driver.getNumCircuits()).toBe(1);

        expect(driver.getNumElements()).toBe(4);

        expect(driver.getElementNames()).toEqual([
            "Vsource.source",
            "Vsource.source1",
            "Vsource.source2",
            "Vsource.source3",
        ]);

        driver.solve();

        expect(driver.getNodeNames()).toEqual([
            "sourcebus.1",
            "sourcebus.2",
            "sourcebus.3",
            "bus1.1",
            "bus1.2",
            "bus1.3",
            "bus2.1",
            "bus2.2",
            "bus2.3",
            "bus3.1",
            "bus3.2",
            "bus3.3",
        ]);

        expect(driver.getBusNames()).toEqual([
            "sourcebus",
            "bus1",
            "bus2",
            "bus3",
        ]);
    });
});
