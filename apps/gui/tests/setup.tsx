import type { Server } from "http";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import createServer from "@repo/api";
import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";
import databaseInit, { type DBContext } from "@repo/db";

expect.extend(matchers);
let server: Server;
let db: DBContext;

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

vi.mock("@tanstack/react-router", () => {
    return {
        useNavigate() {
            return vi.fn();
        },
        Link({ children }: { children: React.ReactNode }) {
            return <a href="#test">{children}</a>;
        },
    };
});

beforeAll(() => {
    db = databaseInit(`${import.meta.dirname}/test.db`);

    const memoryDb = db.conn.serialize();

    db.conn.close();

    db = databaseInit(memoryDb);

    server = createServer(db);
    server.listen(import.meta.env.VITE_PORT);
    Element.prototype.scrollIntoView = vi.fn();
    global.ResizeObserver = class ResizeObserver {
        observe() {
            // do nothing
        }

        unobserve() {
            // do nothing
        }

        disconnect() {
            // do nothing
        }
    };
});

afterAll(() => {
    server.close();
    db.conn.close();
});
