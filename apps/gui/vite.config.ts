/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        wyw({
            include: ["**/*.{ts,tsx}"],
            babelOptions: {
                presets: ["@babel/preset-typescript", "@babel/preset-react"],
            },
        }),
        react(),
        tsconfigPaths(),
    ],
    base: "./",
    test: {
        environment: "jsdom",
    },
});
