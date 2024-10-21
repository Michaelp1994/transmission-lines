import type { LibraryDatabase } from "@repo/db";
import type { BrowserWindow } from "electron";

import { createIPCHandler } from "electron-trpc/main";

import { type NoProjectContext, type ProjectContext, store } from "./global";
import { appRouter } from "./routers";

export interface Context {
    db: LibraryDatabase;
    project: ProjectContext | NoProjectContext;
    electron: BrowserWindow;
}

const createServer = (
    library: LibraryDatabase,
    browserWindow: BrowserWindow
) => {
    const server = createIPCHandler({
        router: appRouter,
        windows: [browserWindow],
        createContext() {
            return Promise.resolve({
                db: library,
                project: store,
                electron: browserWindow,
            });
        },
    });
    return server;
};

export default createServer;
