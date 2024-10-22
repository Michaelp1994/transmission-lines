// @ts-check
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
export default {
    appId: "com.electron.app",
    productName: "Igrounding",
    // Use asar and compression when debugging build process.
    asar: false,
    compression: "store",
    // asarUnpack: ["database.sqlite"],
    electronLanguages: ["en-GB", "en-US", "pt-BR", "pt-PT"],
    directories: {
        output: "releases/${version}/${os}",
    },
    files: [
        "!builder.config.js",
        "!.turbo",
        "!.vscode",
        "!apps",
        "!packages",
        "!releases",
        "!tooling",
        { from: "./apps/desktop/dist", to: "." },
        {
            from: "./apps/gui/dist",
            to: "./renderer/",
        },
    ],
};
