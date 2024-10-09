import { projectProcedure, router } from "../trpc";

export default router({
    hasSolution: projectProcedure.query(({ ctx }) => {
        // TODO
        return ctx.store.project.solution.solvedAt !== null;
    }),
    solve: projectProcedure.mutation(({ ctx }) => {
        // TODO
        ctx.store.project.solution.solvedAt = new Date();

        return process.env["npm_package_version"];
    }),
});
