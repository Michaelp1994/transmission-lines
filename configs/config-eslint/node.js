const { resolve } = require("node:path");
const importRules = require("./rules/imports");
const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
    parserOptions: {
        project,
        EXPERIMENTAL_useProjectService: true,
    },
    plugins: ["only-warn"],
    env: {
        node: true,
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
        "no-console": "off",
        ...importRules,
    },
    ignorePatterns: ["node_modules/", "dist/"],
};
