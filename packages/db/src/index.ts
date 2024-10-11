import Connection, { type Database } from "better-sqlite3";
import {
    type BetterSQLite3Database,
    drizzle,
} from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "path";
import { fileURLToPath } from "url";

import * as librarySchema from "./library";
import * as projectSchema from "./project";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type LibraryDatabase = BetterSQLite3Database<typeof librarySchema> & {
    $client: Connection.Database;
};
export type ProjectDatabase = BetterSQLite3Database<typeof projectSchema> & {
    $client: Connection.Database;
};
export type DatabaseConnection = Database;

export function initLibrary(path: string | Buffer): LibraryDatabase {
    const conn = new Connection(path);
    const db = drizzle(conn, { schema: librarySchema });
    // check for migrations and ask user if they want to run them.
    return db;
}

function getMigrationFolder() {
    return path.join(__dirname, "..", "migrations");
}

export async function createProject(path: string): Promise<ProjectDatabase> {
    const conn = new Connection(path);
    const db = drizzle(conn, { schema: projectSchema });
    migrate(db, { migrationsFolder: getMigrationFolder() });
    return db;
}

export function openProject(path: string): ProjectDatabase {
    const conn = new Connection(path, {
        fileMustExist: true,
    });
    const db = drizzle(conn, { schema: projectSchema });
    return db;
}
