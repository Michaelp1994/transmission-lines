import Connection, { Database } from "better-sqlite3";
import {
    type BetterSQLite3Database,
    drizzle,
} from "drizzle-orm/better-sqlite3";

import * as schema from "./schemas";

export interface DBContext {
    conn: Database;
    db: BetterSQLite3Database<typeof schema>;
}

function databaseInit(path: string): DBContext {
    const conn = new Connection(path, {
        nativeBinding: "../../prebuilds/win32-x64/better-sqlite3.node",
    });
    const db = drizzle(conn, { schema });

    console.log("dataSource initialized");
    return { conn, db };
}

export default databaseInit;
