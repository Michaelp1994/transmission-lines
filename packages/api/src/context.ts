import type { DBContext } from "@repo/db";
import type { BrowserWindow, Dialog } from "electron";

export type Electron = {
    browserWindow: BrowserWindow;
    dialog: Dialog;
};
export const createContext = (dataSource: DBContext, electron: Electron) =>
    // const session = await getSession({ req: opts.req });

    ({
        dataSource,
        electron,
    });

export type Context = ReturnType<typeof createContext>;
