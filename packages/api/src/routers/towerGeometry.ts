import { z } from "zod";
import TowerGeometry from "@repo/db/models/TowerGeometry.model";
import {
    towerGeometryInputSchema,
    updateTowerGeometrySchema,
} from "@repo/validators/schemas/TowerGeometry.schema";
import { router, publicProcedure } from "../trpc";

export default router({
    getAll: publicProcedure.query(async ({ ctx }) =>
        ctx.mainDb.getRepository(TowerGeometry).find()
    ),
    getById: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
        return ctx.mainDb.getRepository(TowerGeometry).findOneByOrFail({
            id: input,
        });
    }),
    create: publicProcedure
        .input(towerGeometryInputSchema)
        .mutation(async ({ input, ctx }) => {
            const repository = ctx.mainDb.getRepository(TowerGeometry);
            const towerGeometry = repository.create(input);
            return towerGeometry.save();
        }),
    update: publicProcedure
        .input(updateTowerGeometrySchema)
        .mutation(async ({ input: { id, towerGeometry }, ctx }) =>
            ctx.mainDb
                .getRepository(TowerGeometry)
                .update({ id }, towerGeometry)
        ),
});
