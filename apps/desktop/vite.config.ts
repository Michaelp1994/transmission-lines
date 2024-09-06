import { builtinModules } from "module";

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
    mode: process.env.MODE,
    // root: PACKAGE_ROOT,
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
