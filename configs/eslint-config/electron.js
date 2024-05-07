// @ts-check

import sheriff from "eslint-config-sheriff";
import baseConfig from "./base.js";

const sheriffOptions = {
    react: false,
    next: false,
    lodash: false,
    playwright: true,
    jest: false,
    vitest: false,
};

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [...sheriff(sheriffOptions), ...baseConfig];
