import { Menu } from "electron";
import migrationMenu from "./migrationMenu";
import developerMenu from "./developerMenu";

export default function createMenu() {
    const template: Electron.MenuItemConstructorOptions[] = [
        migrationMenu,
        developerMenu,
    ];

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
}
