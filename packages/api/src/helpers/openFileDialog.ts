import type { Context } from "..";

export default async function openFileDialog(ctx: Context) {
    if (!ctx.electron) {
        throw new Error("Not in electron context");
    }
    const currentBrowser = ctx.electron.browserWindow;

    if (!currentBrowser) {
        throw new Error("No browser window found");
    }
    const openDialogReturn = await ctx.electron.dialog.showOpenDialog(
        currentBrowser,
        {
            properties: ["openFile"],
            filters: [
                { name: "Project", extensions: ["study"] },
                { name: "All Files", extensions: ["*"] },
            ],
        }
    );

    if (openDialogReturn.canceled) {
        throw new Error("User closed dialog");
    }

    const fileName = openDialogReturn.filePaths[0];
    if (!fileName) {
        throw new Error("Can't get file name");
    }
    return fileName;
}
