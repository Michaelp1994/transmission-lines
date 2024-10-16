import { getProject } from "@repo/db/controllers/project";
import { eq } from "@repo/db/drizzle";
import { transmissionLines } from "@repo/db/project/transmissionLines";
import { transmissionTowers } from "@repo/db/project/transmissionTowers";
import solveProject from "@repo/solution";
import { solveSolutionSchema } from "@repo/validators/schemas/Solution.schema";
import { getSourceByIdSchema } from "@repo/validators/schemas/Source.schema";
import { getTransmissionLineByIdSchema } from "@repo/validators/schemas/TransmissionLine.schema";
import { TRPCError } from "@trpc/server";

import { projectProcedure, router } from "../trpc";

export default router({
    hasSolution: projectProcedure.query(async ({ ctx }) => {
        const solution = ctx.project.solution;
        // const [solution] = await ctx.project.db.select().from(solutions);
        if (solution) {
            return true;
        } else {
            return false;
        }
    }),
    getSolution: projectProcedure.query(async ({ ctx }) => {
        return ctx.project.solution;
    }),
    solve: projectProcedure
        .input(solveSolutionSchema)
        .mutation(async ({ ctx, input }) => {
            // TODO
            const project = await getProject(ctx.project.db, ctx.db);
            const [tower] = await ctx.project.db
                .select()
                .from(transmissionTowers)
                .innerJoin(
                    transmissionLines,
                    eq(transmissionTowers.lineId, transmissionLines.id)
                )
                .where(eq(transmissionTowers.id, input.towerId));
            if (!tower) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Tower",
                });
            }
            const busName = `B_${tower.transmission_lines.name}_${tower.transmission_towers.name}`;
            const result = solveProject(project, busName);
            ctx.project.solution = result;
            return true;
        }),

    getSourceCurrents: projectProcedure
        .input(getSourceByIdSchema)
        .query(async ({ ctx, input }) => {
            const source = ctx.project.solution?.sources.find(
                (s) => s.id === input.id
            );
            return source;
        }),
    getScript: projectProcedure.query(async ({ ctx }) => {
        return ctx.project.solution?.script;
    }),
    getLineCurrents: projectProcedure
        .input(getTransmissionLineByIdSchema)
        .query(async ({ ctx, input }) => {
            const tline = ctx.project.solution?.transmissionLines.find(
                (tl) => tl.id === input.id
            );
            return tline;
        }),
});
