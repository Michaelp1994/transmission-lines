// @ts-check
import reactConfig from "@repo/eslint-config/react.js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    ...reactConfig,
    {
        files: ["src/**/*.{ts,tsx}"],
    },
];
