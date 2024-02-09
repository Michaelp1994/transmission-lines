import cors from "cors";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import type { DBContext } from "@repo/db";

import { appRouter } from "./routers/index";
import { Electron } from "./context";

const createServer = (dbcontexts: DBContext, electron: Electron) => {
    const server = createHTTPServer({
        middleware: cors(),
        createContext() {
            return { ...dbcontexts, electron };
        },
        router: appRouter,
    });
    server.listen(5001);
    console.log("server listening on port 5001");
    return server;
};

export default createServer;
