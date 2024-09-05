import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        ...reactPlugin.configs.flat.recommended,
    },
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        ...reactPlugin.configs.flat["jsx-runtime"],
    },
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        rules: {
            "react/prop-types": "off",
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
];
