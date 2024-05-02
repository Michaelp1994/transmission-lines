// @ts-check
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
    appId: "com.electron.app",
    productName: "example-app",
    electronVersion: "28.2.1",
    electronLanguages: ["en-GB", "en-US", "pt-BR", "pt-PT"],
    directories: {
         
        output: "releases/${version}/${os}",
    },
    files: [
        "!src/**/*",
        "!.turbo/**/*",
        "!releases/**/*",
        "!turbo.json",
        "!tsconfig.json",
        "!tsup.config.ts",
        "!test.s3db",
        "!.eslintrc.js",
        "!builder.config.js",
        { from: ".", to: "." },
        {
            from: "../gui/dist",
            to: "./renderer/",
        },
    ],
};
