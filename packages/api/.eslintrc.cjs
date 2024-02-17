// @ts-check

/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ["@repo/eslint-config/node.js"],
    parserOptions: {
        EXPERIMENTAL_useProjectService: true,
    },
};
