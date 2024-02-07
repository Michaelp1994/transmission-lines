import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import wyw from "@wyw-in-js/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), wyw(), tsconfigPaths()],
    base: "./",
    build: {
        target: "es2015",
    },
});
