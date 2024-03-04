import databaseInit from "@repo/db";
import migrate, { migrationsFolder } from "@repo/db/migrate";
import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";

import { createContext } from "../src/context";

import { type AppRouter, appRouter } from "@/routers";
import { createCallerFactory } from "@/trpc";

// beforeAll(async () => {});
describe("Projects", () => {
    test("create a project", async () => {
        // const migrationsFolder = import.meta.resolve("@repo/db");
        const dataSource = databaseInit(":memory:");
        migrate(dataSource.db, {
            migrationsFolder,
        });
        const createCaller = createCallerFactory(appRouter);
        const ctx = createContext(dataSource);
        const caller = createCaller(ctx);
        type Input = inferProcedureInput<AppRouter["project"]["create"]>;
        const input: Input = {
            name: "TestProject",
        };

        await caller.project.create(input);
        const allProjects = await caller.project.getAll();
        expect(allProjects.length).toBe(1);
        expect(allProjects[0]?.name).toBe("TestProject");
    });
});
