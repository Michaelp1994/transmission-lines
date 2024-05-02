export default {
    label: "Developer",
    submenu: [
        {
            label: "Open Dev Tools",
            click(_, browserWindow) {
                if (browserWindow) {
                    browserWindow.webContents.openDevTools();
                }
            },
        },
    ],
} as Electron.MenuItemConstructorOptions;
