import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import swc from "@rollup/plugin-swc";
import { builtinModules } from "module";
import { defineConfig } from "rollup";

import runElectron from "./rollup-plugin-run-electron.js";
export default defineConfig([
    {
        external: [
            "electron",
            "better-sqlite3",
            "winax",
            "electron-devtools-installer",
            ...builtinModules.flatMap((p) => [p, `node:${p}`]),
        ],
        input: "./src/index.ts",
        output: {
            file: "dist/index.js",
            format: "es",
        },
        plugins: [
            swc(),
            commonjs({
                include: /node_modules/,
                extensions: [".js", ".ts"],
            }),
            nodeResolve(),
            runElectron(),
        ],
    },
    {
        external: [
            "electron",
            "better-sqlite3",
            "winax",
            "electron-devtools-installer",
            ...builtinModules.flatMap((p) => [p, `node:${p}`]),
        ],
        input: "./src/preload.ts",
        output: {
            file: "dist/preload.cjs",
            format: "cjs",
        },
        plugins: [swc(), commonjs(), nodeResolve(), runElectron()],
    },
]);
