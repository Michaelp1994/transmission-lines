import { migrate } from "drizzle-orm/better-sqlite3/migrator";

export default migrate;

const migrationsFolder = import.meta.dirname;
export { migrationsFolder };
