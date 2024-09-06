import { publicProcedure, router } from "../trpc";

export default router({
    hello: publicProcedure.query(() => "hello world!"),
    version: publicProcedure.query(() => process.env["npm_package_version"]),
});
