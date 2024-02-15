import TowerGeometry from "@repo/db/models/TowerGeometry.model";
import {
    createTowerGeometrySchema,
    deleteTowerGeometrySchema,
    getAllTowerGeometriesSchema,
    getTowerGeometryByIdSchema,
    updateTowerGeometrySchema,
} from "@repo/validators";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllTowerGeometriesSchema)
        .query(async ({ ctx }) =>
            ctx.dataSource.getRepository(TowerGeometry).find()
        ),
    getById: publicProcedure
        .input(getTowerGeometryByIdSchema)
        .query(async ({ input, ctx }) =>
            ctx.dataSource.getRepository(TowerGeometry).findOneOrFail({
                where: {
                    id: input.id,
                },
                relations: ["conductors"],
            })
        ),
    create: publicProcedure
        .input(createTowerGeometrySchema)
        .mutation(async ({ input, ctx }) => {
            const repository = ctx.dataSource.getRepository(TowerGeometry);
            const towerGeometry = repository.create(input);
            return towerGeometry.save();
        }),
    update: publicProcedure
        .input(updateTowerGeometrySchema)
        .mutation(async ({ input, ctx }) => {
            const repository = ctx.dataSource.getRepository(TowerGeometry);
            return repository.save({ ...input });
        }),
    delete: publicProcedure
        .input(deleteTowerGeometrySchema)
        .mutation(async ({ input, ctx }) => {
            ctx.dataSource
                .getRepository(TowerGeometry)
                .delete({ id: input.id });
        }),
});
