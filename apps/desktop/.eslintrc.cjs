/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ["@repo/eslint-config/electron.js"],
    parserOptions: {
        EXPERIMENTAL_useProjectService: true,
    },
};
