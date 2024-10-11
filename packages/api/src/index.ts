import type { LibraryDatabase, ProjectDatabase } from "@repo/db";
import type { BrowserWindow, Dialog } from "electron";

export interface Electron {
    browserWindow: BrowserWindow;
    dialog: Dialog;
}

export interface Context {
    db: LibraryDatabase;
    project: { db: ProjectDatabase | null };
    electron: Electron;
}
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

import { appRouter } from "./routers";

const createServer = (
    library: LibraryDatabase,
    electron: Electron,
    project: { db: ProjectDatabase | null }
) => {
    const server = createHTTPServer({
        middleware: cors(),
        router: appRouter,
        createContext: () => {
            return {
                db: library,
                project,
                electron,
            };
        },
    });
    return server;
};

export default createServer;
