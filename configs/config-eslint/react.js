const { resolve } = require("node:path");

const importRules = require("./rules/imports");
const vitestRules = require("./rules/vitest");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        "airbnb",
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:testing-library/react",
        "plugin:react/jsx-runtime",
        "plugin:i18next/recommended",
        "prettier",
    ],
    plugins: ["i18next", "only-warn", "vitest", "testing-library"],
    parserOptions: {
        project,
        EXPERIMENTAL_useProjectService: true,
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
        ...vitestRules,
        ...importRules,
        "testing-library/render-result-naming-convention": 0,
        "no-console": 0,
        "i18next/no-literal-string": 0,
        "react/require-default-props": 0,
        "react/prop-types": 0,
        "react/jsx-props-no-spreading": 0,
        "@typescript-eslint/no-use-before-define": 0,
        "react/jsx-no-bind": 0,
        "no-restricted-syntax": 0,
        "arrow-body-style": 0,
        // "react/function-component-definition": [
        //     2,
        //     { namedComponents: "arrow-declaration" },
        // ],
    },
    ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
};
