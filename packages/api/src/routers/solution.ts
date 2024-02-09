// import { dialog, BrowserWindow } from "electron";
import { z } from "zod";
import { towerFaultSchema } from "@repo/validators/schemas/TowerFault.schema";
// import buildTransmissionLineMatrix from "@/helpers/transmissionLineParameters";
// import buildCircuit from "@/helpers/buildCircuit";
// import solveTransmissionTowerFault from "@/helpers/solveTransmissionTower";
// import worseCaseScenario from "@/helpers/worstCaseScenario";
// import saveScript from "@/helpers/saveScript";
import { router, publicProcedure } from "../trpc";

export default router({
    test: publicProcedure.query(() => {
        console.log("TEST");
        return "TEST";
    }),
    // buildTransmissionLine: publicProcedure
    //     .input(z.string().uuid())
    //     .mutation(async ({ input, ctx }) => {
    //         return buildTransmissionLineMatrix(input, ctx);
    //     }),

    // saveScript: publicProcedure.mutation(async ({ ctx }) => {
    //     const currentBrowser = ctx.electron.browserWindow;
    //     if (!currentBrowser) {
    //         throw new Error("No browser window found");
    //     }
    //     const saveDialogReturn = await ctx.electron.dialog.showSaveDialog(
    //         currentBrowser,
    //         {
    //             filters: [
    //                 { name: "DSS File", extensions: ["dss"] },
    //                 { name: "All Files", extensions: ["*"] },
    //             ],
    //         }
    //     );
    //     if (!saveDialogReturn.canceled) {
    //         const { study } = await buildCircuit(ctx);
    //         await saveScript(study, saveDialogReturn.filePath!);
    //         return true;
    //     }
    //     return false;
    // }),
    // worstCaseScenario: publicProcedure.mutation(async ({ ctx }) => {
    //     const { study, updatedProject } = await buildCircuit(ctx);
    //     const results = await worseCaseScenario(study, updatedProject);
    //     return results;
    // }),
    // circuitDiagram: publicProcedure
    //     .input(towerFaultSchema)
    //     .query(async ({ input: { location }, ctx }) => {
    //         const { study, updatedProject } = await buildCircuit(ctx);
    //         const results = await solveTransmissionTowerFault(
    //             study,
    //             updatedProject,
    //             location
    //         );
    //         return results;
    //     }),
    // towerFault: publicProcedure
    //     .input(towerFaultSchema)
    //     .query(async ({ input: { location }, ctx }) => {
    //         const { study, updatedProject } = await buildCircuit(ctx);
    //         const results = await solveTransmissionTowerFault(
    //             study,
    //             updatedProject,
    //             location
    //         );
    //         return results;
    //     }),
});
