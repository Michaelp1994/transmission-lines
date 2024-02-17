import { defineConfig } from "vite";
import { spawn, type ChildProcess } from "child_process";
import electronPath from "electron";
import tsconfigPaths from "vite-tsconfig-paths";
import swc from "@rollup/plugin-swc";

const electronPlugin = () => {
    var pr: ChildProcess;
    return {
        name: "prebuild-commands",
        // handleHotUpdate: async () => {
        //     runElectron();
        // },
        writeBundle: async () => {
            let cwd = (process && process.cwd()) || __dirname;
            console.log("spawning electron...");
            pr = spawn(electronPath as unknown as string, ["dist/index.js"], {
                cwd,
            });
            pr.stdout?.on("data", (data) => {
                console.log(`${data}`);
            });
        },
        watchChange: async () => {
            if (pr) {
                pr.kill();
            }
        },
    };
};

export default defineConfig({
    plugins: [electronPlugin(), tsconfigPaths()],
    optimizeDeps: {
        force: true,
    },
    build: {
        ssr: true,
        target: "esnext",
        sourcemap: true,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: "src/index.ts",
            name: "MyLib",
            // the proper extensions will be added
            fileName: "main",
            formats: ["es"],
        },
        rollupOptions: {
            output: {
                format: "esm",
            },
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ["electron", "better-sqlite3"],
        },
    },
});
