import type { DBContext } from "@repo/db";
import type { BrowserWindow, Dialog } from "electron";

export type Electron = {
    browserWindow: BrowserWindow;
    dialog: Dialog;
};
export const createContext = (dbContext: DBContext, electron: Electron) => {
    // const session = await getSession({ req: opts.req });

    return {
        ...dbContext,
        electron,
    };
};

export type Context = ReturnType<typeof createContext>;
