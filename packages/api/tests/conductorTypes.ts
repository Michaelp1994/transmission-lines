import databaseInit from "@repo/db";
import migrate, { migrationsFolder } from "@repo/db/migrate";
import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";

import { createContext } from "../src/context";

import { type AppRouter, appRouter } from "@/routers";
import { createCallerFactory } from "@/trpc";

// beforeAll(async () => {});
describe("Conductor Types", () => {
    test("create a conductor", async () => {
        // const migrationsFolder = import.meta.resolve("@repo/db");
        const dataSource = databaseInit(":memory:");
        migrate(dataSource.db, {
            migrationsFolder,
        });
        const createCaller = createCallerFactory(appRouter);
        const ctx = createContext(dataSource);
        const caller = createCaller(ctx);
        type Input = inferProcedureInput<AppRouter["conductorType"]["create"]>;
        const input = {
            name: "TestConductor",
            acResistance25: 1.9,
            coreDiameter: 2,
            currentCapacity: 100,
            dcResistance25: 2,
            layers: 4,
            acResistance50: 2,
            acResistance75: 2,
            gmr: 5,
            surfaceArea: 100,
            stranding: "4/5",
            outerDiameter: 4,
        };

        const newConductorType = await caller.conductorType.create(input);

        const allConductorTypes = await caller.conductorType.getAll();
        expect(allConductorTypes.length).toBe(1);

        const retrievedConductorType = await caller.conductorType.getById({
            id: newConductorType.id,
        });
        expect(retrievedConductorType).toBeDefined();
        expect(retrievedConductorType.id).toEqual(newConductorType.id);
        expect(retrievedConductorType.name).toEqual("TestConductor");

        const updatedConductorType = await caller.conductorType.update({
            id: newConductorType.id,
            name: "UpdatedTestConductor",
        });

        expect(updatedConductorType.id).toBeDefined();
        expect(updatedConductorType.name).toBe("UpdatedTestConductor");
    });
});
