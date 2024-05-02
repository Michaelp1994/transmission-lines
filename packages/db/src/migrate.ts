import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import databaseInit from "./db";

const { db } = await databaseInit("./database.sqlite");

await migrate(db, { migrationsFolder: "./src/migrations" });
