// @ts-check
import reactConfig from "@repo/eslint-config/react.js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    ...reactConfig,
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
];
