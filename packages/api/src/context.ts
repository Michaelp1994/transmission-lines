import type { DBContext } from "@repo/db";
import type { BrowserWindow, Dialog } from "electron";

export interface Electron {
    browserWindow: BrowserWindow;
    dialog: Dialog;
}
export const createContext = (dataSource: DBContext, electron?: Electron) => {
    // const session = await getSession({ req: opts.req });

    return {
        db: dataSource.db,
        electron,
    }
};

export type Context = ReturnType<typeof createContext>;
