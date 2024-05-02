// @ts-check

import sheriff from "eslint-config-sheriff";
import baseConfig from "./base.js";

const sheriffOptions = {
    react: true,
    next: false,
    lodash: false,
    playwright: false,
    jest: false,
    vitest: true,
};
/** @type {import("eslint").Linter.FlatConfig[]} */

export default [
    ...sheriff(sheriffOptions),
    ...baseConfig,
    {
        rules: {
            "react/jsx-props-no-spreading": "off",
            "react/function-component-definition": [
                "error",
                {
                    namedComponents: "function-declaration",
                    unnamedComponents: "arrow-function",
                },
            ],
        },
    },
];
