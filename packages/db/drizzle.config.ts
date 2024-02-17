import type { Config } from "drizzle-kit";

export default {
    schema: ["./src/db.ts", "./src/schemas/*.ts"],
    out: "./src/migrations",
    driver: "better-sqlite",
    dbCredentials: {
        url: "../../apps/desktop/database.sqlite",
    },
} satisfies Config;
