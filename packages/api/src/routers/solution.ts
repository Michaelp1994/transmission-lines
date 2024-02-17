import { towerFaultSchema } from "@repo/validators/schemas/TowerFault.schema";

// import buildCircuit from "@/helpers/buildCircuit";
// import saveScript from "@/helpers/saveScript";
// import solveTransmissionTowerFault from "@/helpers/solveTransmissionTower";
// import buildTransmissionLineMatrix from "@/helpers/transmissionLineParameters";
// import worseCaseScenario from "@/helpers/worstCaseScenario";

import { publicProcedure, router } from "../trpc";

export default router({
    saveScript: publicProcedure.mutation(async ({ ctx: { electron, db } }) => {
        if (!electron) {
            throw new Error("Not in electron context");
        }
        const currentBrowser = electron.browserWindow;
        if (!currentBrowser) {
            throw new Error("No browser window found");
        }
        const saveDialogReturn = await electron.dialog.showSaveDialog(
            currentBrowser,
            {
                filters: [
                    { name: "DSS File", extensions: ["dss"] },
                    { name: "All Files", extensions: ["*"] },
                ],
            }
        );
        if (!saveDialogReturn.canceled) {
            // const { study } = await buildCircuit(ctx);
            // await saveScript(study, saveDialogReturn.filePath!);
            return true;
        }
        return false;
    }),
    circuitDiagram: publicProcedure.input(towerFaultSchema).query(async () => {
        // const { study, updatedProject } = await buildCircuit(ctx);
        // const results = await solveTransmissionTowerFault(
        //     study,
        //     updatedProject,
        //     location
        // );
        // return results;
    }),
    towerFault: publicProcedure.input(towerFaultSchema).query(async () => {
        // const { study, updatedProject } = await buildCircuit(ctx);
        // const results = await solveTransmissionTowerFault(
        //     study,
        //     updatedProject,
        //     location
        // );
        // return results;
    }),
});
