import { _electron as electron, expect, test } from "@playwright/test";

test.describe("example tests", () => {
    test("get isPackaged", async () => {
        const electronApp = await electron.launch({ args: ["."] });
        const isPackaged = await electronApp.evaluate(({ app }) => {
            // This runs in Electron's main process, parameter here is always
            // the result of the require('electron') in the main app script.
            return app.isPackaged;
        });

        expect(isPackaged).toBeFalsy();
        // close app FIXME: should be awaited but currently bugging.
        await electronApp.close();
    });
});
