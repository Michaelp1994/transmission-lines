import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { describe, expect, it } from "vitest";

import databaseInit from "../src/db";
import { NewProject, type Project, projects } from "../src/schemas/projects";

describe("Database", () => {
    it("initializes correctly ", async () => {
        const { db, conn } = await databaseInit(":memory:");
        await migrate(db, { migrationsFolder: "./src/migrations" });
        const project: Project[] = await db.select().from(projects);
        expect(project.length).toBe(0);
        const newProject: NewProject = { name: "test project" };
        const result = await db.insert(projects).values(newProject).returning();
        conn.close();
        expect(result.length).toBe(1);
    });
});
