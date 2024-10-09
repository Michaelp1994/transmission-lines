import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

import type { Context } from "./context";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
    errorFormatter(opts) {
        const { shape, error } = opts;

        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

export const projectProcedure = t.procedure.use(async function isAuthed(opts) {
    const { ctx } = opts;
    // `ctx.user` is nullable
    if (!ctx.store.project) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "No Current Project",
        });
    }

    return opts.next({
        ctx: {
            // ✅ user value is known to be non-null now
            store: {
                project: ctx.store.project,
            },
        },
    });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router.
 */
export const {
    router,
    procedure: publicProcedure,
    mergeRouters,
    createCallerFactory,
} = t;
