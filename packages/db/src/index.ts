import Connection, { type Database } from "better-sqlite3";
import {
    type BetterSQLite3Database,
    drizzle,
} from "drizzle-orm/better-sqlite3";
// import isElectron from "is-electron";
import * as schema from "./schemas";

export interface DBContext {
    conn: Database;
    db: BetterSQLite3Database<typeof schema>;
}

export function databaseInit(path: string | Buffer): DBContext {
    // const nativeBinding = isElectron()
    //     ? "../../prebuilds/win32-x64/better-sqlite3.node"
    //     : undefined;
    const conn = new Connection(path);
    const db = drizzle(conn, { schema });

    return { conn, db };
}
