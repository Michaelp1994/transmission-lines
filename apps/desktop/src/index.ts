import { BrowserWindow, app, dialog } from "electron";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import createServer from "@repo/api";
import createWindow from "./createWindow";
import { databaseInit } from "@repo/db";

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
    const dataSource = await databaseInit("./database.sqlite");
    const server = createServer(dataSource, { browserWindow: window, dialog });

    server.listen(5001);
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
