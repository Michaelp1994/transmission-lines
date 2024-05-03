// @ts-check
import nodeConfig from "@repo/eslint-config/node.js";

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
    ...nodeConfig,
    {
        languageOptions: {
            parserOptions: {
                EXPERIMENTAL_useProjectService: {
                    /*** @link https://github.com/typescript-eslint/typescript-eslint/issues/9032 */
                    maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING:
                        Infinity,
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ["tests/**/*", "**/*.test.ts", "**/*.spec.ts"],
        rules: {
            "@typescript-eslint/no-non-null-assertion": "off",
        },
    },
];

export default config;
