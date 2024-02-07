import type { DBContext } from "@repo/db";

export const createContext = (dbContext: DBContext) => {
    // const session = await getSession({ req: opts.req });

    return {
        ...dbContext,
    };
};

export type Context = ReturnType<typeof createContext>;
