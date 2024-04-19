import { initTRPC } from "@trpc/server";
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

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const {
    router,
    procedure: publicProcedure,
    mergeRouters,
    createCallerFactory,
} = t;
