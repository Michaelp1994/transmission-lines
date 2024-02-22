import { _electron as electron, expect, test } from "@playwright/test";

test("get isPackaged", async () => {
    const electronApp = await electron.launch({ args: ["."] });
    const isPackaged = await electronApp.evaluate(
        async ({ app }) =>
            // This runs in Electron's main process, parameter here is always
            // the result of the require('electron') in the main app script.
            app.isPackaged
    );

    expect(isPackaged).toBeFalsy();
    // close app FIXME: should be awaited but currently bugging.
    electronApp.close();
});
