import { is } from "@electron-toolkit/utils";
import { BrowserWindow, screen, shell } from "electron";

export default async function createWindow() {
    // Create the browser window.
    const displays = screen.getAllDisplays();
    const externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0;
    });

    const mainWindow = new BrowserWindow({
        x: externalDisplay ? externalDisplay.bounds.x : 0,
        y: externalDisplay ? externalDisplay.bounds.y : 0,
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
