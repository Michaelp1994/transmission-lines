import fs from "fs/promises";

import { MigrationExecutor } from "@repo/db/migrations/index";

import { dataSource, databasePath } from "../config/db";

const migrationExecutor = new MigrationExecutor(dataSource);

export default {
    label: "Migrations",
    submenu: [
        {
            label: "Synchronize Database",
            click: async (_, browserWindow) => {
                await dataSource.destroy();
                console.log("database connection closed");
                await fs.unlink(databasePath);
                console.log(`database deleted at ${databasePath}`);
                await dataSource.initialize();
                console.log("database initialized");
                await migrationExecutor.executePendingMigrations();
                console.log("migrations performed");
                if (browserWindow)
                    browserWindow.webContents.send("invalidate-cache");
            },
        },

        {
            label: "Show Migrations",
            click: async (_, browserWindow) => {
                const pendingMigrations =
                    await migrationExecutor.getPendingMigrations();
                console.log("Pending Migrations:", pendingMigrations);
                if (browserWindow)
                    browserWindow.webContents.send("invalidate-cache");
            },
        },
        {
            label: "Revert Last Migration",
            click: async (_menuItem, browserWindow) => {
                console.log("Reverting Last Migration");
                try {
                    await migrationExecutor.undoLastMigration();
                    if (browserWindow)
                        browserWindow.webContents.send("invalidate-cache");
                } catch (error) {
                    console.log(error);
                }
            },
        },
        {
            label: "Execute Migration",
            click: async (_menuItem, browserWindow) => {
                const migrationsPerformed =
                    await migrationExecutor.executePendingMigrations();
                console.log("Migrations Performed: ", migrationsPerformed);
                // invalidate the cache
                if (browserWindow)
                    browserWindow.webContents.send("invalidate-cache");
            },
        },
    ],
} as Electron.MenuItemConstructorOptions;
