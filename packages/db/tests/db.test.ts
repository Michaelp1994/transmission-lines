import "reflect-metadata";
import databaseInit from "../src/dataSource";
import { describe, it } from "vitest";

describe("Database", () => {
    it("initializes correctly ", async () => {
        await databaseInit(":memory:");
    });
});
