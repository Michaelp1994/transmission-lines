import { builtinModules } from "module";
import { defineConfig } from "vite";

const config = defineConfig({
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
            input: { index: "./src/index.ts" },
            output: [
                {
                    entryFileNames: "[name].js",
                    format: "es",
                },
                // {
                //     entryFileNames: "[name].cjs",
                //     format: "cjs",
                // },
            ],
        },
        emptyOutDir: true,
        brotliSize: false,
    },
});

export default config;
