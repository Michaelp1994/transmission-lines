const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        "airbnb",
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:react/jsx-runtime",
        "plugin:i18next/recommended",
        "prettier",
    ],
    parserOptions: {
        project,
    },
    plugins: ["i18next", "only-warn"],
    env: {
        browser: true,
        es2023: true,
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    rules: {
        "i18next/no-literal-string": 0,
        "arrow-body-style": 0,
        "react/jsx-props-no-spreading": 0,
        "@typescript-eslint/no-use-before-define": 0,
        "react/function-component-definition": [
            2,
            { namedComponents: "arrow-function" },
        ],
    },
    ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
};
