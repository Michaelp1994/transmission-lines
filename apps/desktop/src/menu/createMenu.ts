import { Menu } from "electron";

import developerMenu from "./developerMenu";
import migrationMenu from "./migrationMenu";

export default function createMenu() {
    const template: Electron.MenuItemConstructorOptions[] = [
        migrationMenu,
        developerMenu,
    ];

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
}
