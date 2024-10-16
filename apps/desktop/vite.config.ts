import { builtinModules } from "module";
import { UserConfig } from "vite";

const config: UserConfig = {
    mode: process.env.MODE,
    envDir: process.cwd(),
    build: {
        sourcemap: "inline",
        target: `node20`,
        outDir: "dist",
        assetsDir: ".",
        minify: process.env.MODE !== "development",
        lib: {
            entry: "src/index.ts",
            formats: ["es"],
        },
        rollupOptions: {
            external: [
                "electron",
                "better-sqlite3",
                "winax",
                "electron-devtools-installer",
                ...builtinModules.flatMap((p) => [p, `node:${p}`]),
            ],
            output: {
                entryFileNames: "[name].js",
            },
        },
        emptyOutDir: true,
        brotliSize: false,
    },
};

export default config;
