export default {
    label: "Developer",
    submenu: [
        {
            label: "Open Dev Tools",
            click: async (_menuItem, browserWindow) => {
                if (browserWindow) browserWindow.webContents.openDevTools();
            },
        },
    ],
} as Electron.MenuItemConstructorOptions;
