export default {
    label: "Developer",
    submenu: [
        {
            label: "Open Dev Tools",
            click(_, browserWindow) {
                if (!browserWindow) {
                    throw Error("No Browser Window");
                }
                browserWindow.webContents.openDevTools();
            },
        },
    ],
} as Electron.MenuItemConstructorOptions;
