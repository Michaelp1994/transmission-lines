import { electronApp, optimizer } from "@electron-toolkit/utils";
import createServer from "@repo/api";
import { initLibrary } from "@repo/db";
import { app, BrowserWindow, dialog } from "electron";
import path from "path";
import { fileURLToPath } from "url";

import createWindow from "./createWindow";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.whenReady().then(async () => {
    // Set app user model id for windows
    electronApp.setAppUserModelId("com.electron");
    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on("browser-window-created", async (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });
    const window = await createWindow();

    try {
        const dbPath = path.join(__dirname, `../database.sqlite`);
        const library = initLibrary(dbPath);
        const server = createServer(library, {
            browserWindow: window,
            dialog,
            app,
        });

        server.listen(5001);
        console.log("listening on port 5001");
    } catch (e) {
        console.log("Problem starting server....");
        console.log(e);
    }

    app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
