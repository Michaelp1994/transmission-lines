import type { DBContext } from "@repo/db";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

import { Electron } from "./context";
import { appRouter } from "./routers/index";

const createServer = (dataSource: DBContext, electron: Electron) => {
    const server = createHTTPServer({
        middleware: cors(),
        createContext() {
            return { dataSource, electron };
        },
        router: appRouter,
    });
    server.listen(5001);
    console.log("server listening on port 5001");
    return server;
};

export default createServer;
