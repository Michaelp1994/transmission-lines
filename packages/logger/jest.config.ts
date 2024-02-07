import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    extensionsToTreatAsEsm: [".ts"],
    verbose: true,
    preset: "ts-jest/presets/js-with-ts-esm",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;
