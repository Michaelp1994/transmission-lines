import {
    type BetterSQLite3Database,
    drizzle,
} from "drizzle-orm/better-sqlite3";
import nodeGyp from "node-gyp-build";

import * as schema from "./schemas";

// const Connection = require("@repo/better-sqlite3");

const Connection = nodeGyp("../../node_modules/better-sqlite3");

export interface DBContext {
    conn: any;
    db: BetterSQLite3Database<typeof schema>;
}

function databaseInit(path: string): DBContext {
    // console.log(Connection);
    const conn = new Connection.Database(path, "", true);
    console.log(conn);
    const db = drizzle(conn, { schema });

    console.log("dataSource initialized");
    return { conn, db };
}

export default databaseInit;
