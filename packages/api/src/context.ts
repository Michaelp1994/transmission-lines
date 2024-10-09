import type { DBContext } from "@repo/db";
import type { BrowserWindow, Dialog } from "electron";

import type { Store } from "./store";

export interface Electron {
    browserWindow: BrowserWindow;
    dialog: Dialog;
}
export const createContext = (
    dataSource: DBContext,
    electron: Electron,
    store: Store
) => {
    // const session = await getSession({ req: opts.req });

    return {
        db: dataSource.db,
        electron,
        store,
    };
};

export type Context = ReturnType<typeof createContext>;
