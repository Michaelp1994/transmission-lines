/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    roots: ["<rootDir>"],
    // transform: {
    //     "\\.[jt]s?$": [
    //         "ts-jest",
    //         {
    //             useESM: true,
    //         },
    //     ],
    // },
    // extensionsToTreatAsEsm: [".ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    modulePathIgnorePatterns: [
        // "<rootDir>/src",
        "<rootDir>/test/__fixtures__",
        "<rootDir>/node_modules",
        // "<rootDir>/dist",
        "<rootDir>/tsc-dist",
    ],
    // preset: "ts-jest",
};
