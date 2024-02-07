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
    plugins: ["i18next", "only-warn"],
    parserOptions: {
        project,
    },
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
        "react/require-default-props": 0,
        "import/prefer-default-export": 0,
        "react/jsx-props-no-spreading": 0,
        "react/prop-types": 0,
        "react/function-component-definition": [
            2,
            { namedComponents: "arrow-function" },
        ],
    },
    ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
};
