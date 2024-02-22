/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ["@repo/eslint-config/react.js"],
    rules: {
        "import/prefer-default-export": 0,
    },
};
