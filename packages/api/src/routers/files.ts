import { dialog, BrowserWindow } from "electron";
import fs from "fs/promises";

import {
    projectSchema,
    ProjectInput,
} from "@repo/validators/schemas/Project.schema";

// import { Source, TransmissionLine } from "@/db/models";
import { router, publicProcedure } from "../trpc";

export default router({
    openProject: publicProcedure.mutation(async () => {
        const currentBrowser = BrowserWindow.getFocusedWindow();
        if (!currentBrowser) {
            throw new Error("No browser window found");
        }
        const openDialogReturn = await dialog.showOpenDialog(currentBrowser, {
            properties: ["openFile"],
            filters: [
                { name: "Project", extensions: ["study"] },
                { name: "All Files", extensions: ["*"] },
            ],
        });
        // if (!openDialogReturn.canceled) {
        //     const fileName = openDialogReturn.filePaths[0];
        //     if (!fileName) throw Error("can't get file name");
        //     const file = await fs.readFile(fileName);
        //     const contents = JSON.parse(file.toString());
        //     const project = projectSchema.parse(contents);
        //     await Source.create(project.sources);
        //     await TransmissionLine.create(project.transmissionLines);
        //     return contents as ProjectInput;
        // }

        return null;
    }),
    saveProject: publicProcedure.mutation(async () => {
        const currentBrowser = BrowserWindow.getFocusedWindow();
        if (!currentBrowser) {
            throw new Error("No browser window found");
        }
        const saveDialogReturn = await dialog.showSaveDialog(currentBrowser, {
            filters: [
                { name: "Project", extensions: ["study"] },
                { name: "All Files", extensions: ["*"] },
            ],
        });
        // if (!saveDialogReturn.canceled) {
        //     const fileName = saveDialogReturn.filePath!;
        //     await fs.writeFile(
        //         fileName,
        //         JSON.stringify(
        //             {
        //                 sources: global.sources,
        //                 transmissionLines: global.transmissionLines,
        //             },
        //             undefined,
        //             2
        //         )
        //     );
        //     return true;
        // }
        return null;
    }),
});
