import type { LibraryDatabase, ProjectDatabase } from "@repo/db";
import type { App, BrowserWindow, Dialog } from "electron";

export interface Electron {
    browserWindow: BrowserWindow;
    dialog: Dialog;
    app: App;
}

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
    electron: Electron;
}
import type { Solution } from "@repo/solution";

import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

import { store } from "./global";
import { appRouter } from "./routers";

const createServer = (library: LibraryDatabase, electron: Electron) => {
    const server = createHTTPServer({
        middleware: cors(),
        router: appRouter,
        createContext: () => {
            return {
                db: library,
                project: store,
                electron,
            };
        },
    });
    return server;
};

export default createServer;
