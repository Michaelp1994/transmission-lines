import type { DBContext } from "@repo/db";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import type { Electron } from "./context";
import { appRouter } from "./routers";

const createServer = (dataSource: DBContext, electron?: Electron) => {
    const server = createHTTPServer({
        middleware: cors(),
        createContext() {
            return { db: dataSource.db, electron };
        },
        router: appRouter,
    });

    // server.listen(5001);
    // console.log("server listening on port 5001");
    return server;
};

export default createServer;
