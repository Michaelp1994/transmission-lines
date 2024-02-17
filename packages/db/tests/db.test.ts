import databaseInit from "../src/db";
import { projects, type Project, NewProject } from "../src/schemas/projects";
import { describe, it, expect } from "vitest";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

describe("Database", () => {
    it("initializes correctly ", async () => {
        const { db, conn } = await databaseInit(":memory:");
        await migrate(db, { migrationsFolder: "./drizzle" });
        const project: Project[] = await db.select().from(projects);
        expect(project.length).toBe(0);
        const newProject: NewProject = { name: "test project" };
        const result = await db.insert(projects).values(newProject).returning();
        console.log(result);
        conn.close();
        expect(result.length).toBe(1);
    });
});
