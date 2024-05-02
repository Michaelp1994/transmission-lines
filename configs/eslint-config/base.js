//@ts-check

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    {
        settings: {
            "import/resolver": {
                typescript: {
                    project: [
                        "tsconfig.json",
                        "tsconfig.app.json",
                        "tsconfig.test.json",
                    ],
                },
            },
        },
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
        rules: {
            "func-style": [
                "error",
                "declaration",
                { allowArrowFunctions: true },
            ],
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-use-before-define": "off",
            "@typescript-eslint/naming-convention": "off",
            "fsecond/prefer-destructured-optionals": "off",
            "@typescript-eslint/no-misused-promises": [
                "error",
                {
                    checksVoidReturn: false,
                },
            ],
            "no-console": "off",
        },
    },
];
