import { defineConfig } from "vite";
import { spawn, type ChildProcess } from "child_process";
import electronPath from "electron";

const ElectronPlugin = () => {
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
        },
        watchChange: async () => {
            pr.kill();
        },
    };
};

export default defineConfig({
    plugins: [ElectronPlugin()],
    build: {
        ssr: true,
        target: "esnext",

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
            external: [
                "electron",
                "better-sqlite3",
                "@repo/api",
                "@repo/db",
                "@repo/validators",
            ],
        },
    },
});
