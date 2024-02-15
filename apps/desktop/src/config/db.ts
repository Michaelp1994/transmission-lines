import { app } from "electron";
import path from "node:path";

import databaseInit from "@repo/db";

export const databasePath = app.isPackaged
    ? path.join(app.getPath("userData"), "database.sqlite")
    : "./database.sqlite";

export const dataSource = await databaseInit(databasePath);
