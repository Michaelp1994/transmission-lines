import { publicProcedure, router } from "../trpc";

export default router({
    hello: publicProcedure.query(() => "hello world!"),
});
