import { router, publicProcedure } from "../trpc";

export default router({
    hello: publicProcedure.query(() => {
        return "hello world!";
    }),
});
