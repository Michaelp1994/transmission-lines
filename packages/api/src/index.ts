import type { LibraryDatabase, ProjectDatabase } from "@repo/db";
import type { Solution } from "@repo/solution";
import type { App, BrowserWindow, Dialog } from "electron";

import { createIPCHandler } from "electron-trpc/main";

import { store } from "./global";
import { appRouter } from "./routers";

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

const createServer = (library: LibraryDatabase, browserWindow) => {
    const server = createIPCHandler({
        router: appRouter,
        windows: [browserWindow],
        createContext: () => ({ db: library, project: store }),
    });
    console.log("Server listening...");
    return server;
};

export default createServer;
