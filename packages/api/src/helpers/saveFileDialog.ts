import type { Context } from "..";

export default async function saveFileDialog(ctx: Context) {
    if (!ctx.electron) {
        throw new Error("Not in electron context");
    }
    const currentBrowser = ctx.electron.browserWindow;

    if (!currentBrowser) {
        throw new Error("No browser window found");
    }

    const saveDialogReturn = await ctx.electron.dialog.showSaveDialog(
        currentBrowser,
        {
            filters: [
                { name: "Project", extensions: ["study"] },
                { name: "All Files", extensions: ["*"] },
            ],
        }
    );

    if (saveDialogReturn.canceled) {
        throw new Error("User closed dialog");
    }

    const fileName = saveDialogReturn.filePath;

    return fileName;
}
