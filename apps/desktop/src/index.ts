import { BrowserWindow, app, dialog } from "electron";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import createServer from "@repo/api";
import { dataSource } from "./config/db";
import setupDevTools from "./config/devTools";
import setupLogging from "./config/logging";
import createWindow from "./config/window";

app.whenReady().then(async () => {
    await setupDevTools();
    await setupLogging();

    // Set app user model id for windows
    electronApp.setAppUserModelId("com.electron");
    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on("browser-window-created", async (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });
    const window = await createWindow();

    const server = createServer(dataSource, { browserWindow: window, dialog });

    server.listen(5001);
    app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {createWindow();}
    });

    if (
        (app.isPackaged && process.argv.length > 1) ||
        (!app.isPackaged && process.argv.length > 2)
    ) {
        console.log("process.argv:");
        console.log(process.argv);

        // const fileName = process.argv[app.isPackaged ? 1 : 2];
        // console.log(`sending contents of file ${fileName}`);

        // const file = await fs.readFile(fileName);
        // const contents = JSON.parse(file.toString());
        // FIXME: send to client
        // win.webContents.send("file-open", contents);
    }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
