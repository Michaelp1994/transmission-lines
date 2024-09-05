import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    eslint.configs.recommended,
    ...tseslint.config(
        ...tseslint.configs.strict,
        ...tseslint.configs.stylistic
    ),
    {
        ignores: [
            "dist/",
            "eslint.config.js",
            ".next/",
            "node_modules/",
            ".turbo/",
        ],
    },
];
