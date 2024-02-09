/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ["@repo/eslint-config/react.js"],
    rules: {
        "import/no-extraneous-dependencies": 0,
        "@typescript-eslint/no-shadow": 0,
        "@typescript-eslint/no-use-before-define": 0,
    },
};
