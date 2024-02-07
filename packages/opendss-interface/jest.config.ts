import type { JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";
import { pathsToModuleNameMapper } from "ts-jest";

const config: JestConfigWithTsJest = {
    extensionsToTreatAsEsm: [".ts"],
    verbose: true,
    preset: "ts-jest/presets/js-with-ts-esm",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    roots: ["<rootDir>"],
    modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/",
    }),
};

export default config;
