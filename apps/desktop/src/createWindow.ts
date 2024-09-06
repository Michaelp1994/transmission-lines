import { BrowserWindow, shell } from "electron";
import { is } from "@electron-toolkit/utils";

export default async function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
    });

    mainWindow.on("ready-to-show", () => {
        mainWindow.maximize();
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });
    if (is.dev) {
        await mainWindow.loadURL("http://localhost:5174/");
    }

    return mainWindow;
}
