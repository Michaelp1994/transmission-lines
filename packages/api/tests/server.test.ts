import supertest from "supertest";
import { expect, beforeAll, afterAll, it, describe, vi } from "vitest";
import createServer from "../src";
import databaseInit from "@repo/db";

let server: ReturnType<typeof createServer>;

beforeAll(async () => {
    const dataSources = await databaseInit(":memory:");
    server = createServer(dataSources);
});
describe("API Server", () => {
    it("says hello world", () => {
        supertest(server.server)
            .get("/meta.hello")
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({ result: { data: "hello world!" } });
            });
    });

    it("returns 404", async () => {
        await supertest(server.server).get("/random/123123").expect(404);
    });
});

afterAll(async () => {
    server.server.close();
});
