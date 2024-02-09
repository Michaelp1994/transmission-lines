import { BrowserWindow, shell } from "electron";

import { is } from "@electron-toolkit/utils";

// import appIcon from "@resources/favicon.ico?asset";
import createMenu from "../menu";

export default async function create() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        // icon: appIcon,
        // webPreferences: {
        //     preload: fileURLToPath(
        //         new URL("../preload/index.cjs", import.meta.url)
        //     ),
        // },
    });

    mainWindow.on("ready-to-show", () => {
        mainWindow.maximize();
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev) {
        await mainWindow.loadURL("http://localhost:5173/");
        // await mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
    }
    // else {
    //     await mainWindow.loadFile(
    //         fileURLToPath(new URL("../renderer/index.html", import.meta.url))
    //     );
    // }
    createMenu();
    return mainWindow;
}
