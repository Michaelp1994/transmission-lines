const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  parserOptions: {
    project,
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
    "arrow-body-style": 0,
  },
  ignorePatterns: ["node_modules/", "dist/"],
};
