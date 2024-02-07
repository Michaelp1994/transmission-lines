import { test, _electron as electron, expect } from "@playwright/test";

test("get isPackaged", async () => {
    const electronApp = await electron.launch({ args: ["."] });
    const isPackaged = await electronApp.evaluate(async ({ app }) => {
        // This runs in Electron's main process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.isPackaged;
    });
    console.log(isPackaged); // false (because we're in development mode)

    expect(isPackaged).toBeFalsy();
    // close app
    await electronApp.close();
});
