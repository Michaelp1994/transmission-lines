import { solutions } from "@repo/db/project/solutions";

import buildCircuit from "../helpers/buildCircuit";
import faultCurrents from "../helpers/faultCurrents";
import { projectProcedure, router } from "../trpc";

export default router({
    hasSolution: projectProcedure.query(async ({ ctx }) => {
        const [solution] = await ctx.project.db.select().from(solutions);
        if (solution) {
            return true;
        } else {
            return false;
        }
    }),
    solve: projectProcedure.mutation(async ({ ctx }) => {
        // TODO
        const circuit = await buildCircuit(ctx.project.db, ctx.db);
        faultCurrents(circuit);
        // const [solution] = await ctx.project.db
        //     .insert(solutions)
        //     .values({
        //         date: new Date(),
        //     })
        //     .returning();
        return true;
    }),
});
