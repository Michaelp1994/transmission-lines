import databaseInit from "@repo/db";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import createServer from "../src";

let server: ReturnType<typeof createServer>;

beforeAll(async () => {
    const db = databaseInit(":memory:");

    server = createServer(db);
});
describe("aPI Server", () => {
    test("says hello world", () => {
        supertest(server.server)
            .get("/meta.hello")
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({ result: { data: "hello world!" } });
            });
    });

    test("gets conductor types", () => {
        supertest(server.server)
            .get("/conductortype.getall?")
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({ result: { data: "hello world!" } });
            });
    });

    test("returns 404", async () => {
        await supertest(server.server).get("/random/123123").expect(404);
    });
});

afterAll(async () => {
    server.server.close();
});
