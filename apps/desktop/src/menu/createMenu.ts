import { Menu } from "electron";
import developerMenu from "./developerMenu";

export default function createMenu() {
    const template: Electron.MenuItemConstructorOptions[] = [developerMenu];

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
}
