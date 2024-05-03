import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { describe, expect, test } from "vitest";
import { type NewProject, type Project, projects } from "@/schemas/projects";
import databaseInit from "@/index";

describe("database", () => {
    test("initializes correctly ", async () => {
        const { db, conn } = databaseInit(":memory:");

        migrate(db, { migrationsFolder: "./src/migrations" });
        const project: Project[] = await db.select().from(projects);

        expect(project).toHaveLength(0);
        const newProject: NewProject = { name: "test project" };
        const result = await db.insert(projects).values(newProject).returning();

        conn.close();
        expect(result).toHaveLength(1);
    });
});
