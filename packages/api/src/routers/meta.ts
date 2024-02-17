import { publicProcedure, router } from "../trpc";

export default router({
    hello: publicProcedure.query(() => {
        return "hello world!";
    }),
});
