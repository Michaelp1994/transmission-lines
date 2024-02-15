import Source from "@repo/db/models/Source.model";
import TransmissionLine from "@repo/db/models/TransmissionLine.model";
import { towerFaultSchema } from "@repo/validators/schemas/TowerFault.schema";

// import buildCircuit from "@/helpers/buildCircuit";
// import saveScript from "@/helpers/saveScript";
// import solveTransmissionTowerFault from "@/helpers/solveTransmissionTower";
// import buildTransmissionLineMatrix from "@/helpers/transmissionLineParameters";
// import worseCaseScenario from "@/helpers/worstCaseScenario";

import { publicProcedure, router } from "../trpc";

export default router({
    test: publicProcedure.query(() => {
        console.log("TEST");
        return "TEST";
    }),
    saveScript: publicProcedure.mutation(async ({ ctx }) => {
        const currentBrowser = ctx.electron.browserWindow;
        if (!currentBrowser) {
            throw new Error("No browser window found");
        }
        const saveDialogReturn = await ctx.electron.dialog.showSaveDialog(
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
    // worstCaseScenario: publicProcedure.mutation(async ({ ctx }) => {
    //     const { study, updatedProject } = await buildCircuit(ctx);
    //     const results = await worseCaseScenario(study, updatedProject);
    //     return results;
    // }),
    worstCaseScenario: publicProcedure.mutation(async ({ ctx }) => {
        const sourceRepository = await ctx.dataSource.getRepository(Source);
        const transmissionLineRepository =
            await ctx.dataSource.getRepository(TransmissionLine);
        const sources = await sourceRepository.find();
        const transmissionLines = await transmissionLineRepository.find({
            relations: ["towers", "conductors", "fromSource", "toSource"],
        });
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
