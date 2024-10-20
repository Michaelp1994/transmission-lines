import type { LibraryDatabase, ProjectDatabase } from "@repo/db";
import type { Solution } from "@repo/solution";
import type { BrowserWindow } from "electron";

import { createIPCHandler } from "electron-trpc/main";

import { store } from "./global";
import { appRouter } from "./routers";

export interface ProjectContext {
    db: ProjectDatabase;
    fileName: string;
    solution: Solution | null;
}

export interface NoProjectContext {
    db: null;
    fileName: null;
    solution: null;
}

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
            return { db: library, project: store, electron: browserWindow };
        },
    });
    return server;
};

export default createServer;
