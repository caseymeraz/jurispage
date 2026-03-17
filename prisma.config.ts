import path from "node:path";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({ path: path.join(__dirname, ".env.local") });

// Use direct connection (port 5432) instead of pooler (port 6543)
// for schema operations like db push and migrate
const databaseUrl = (
  process.env.DIRECT_DATABASE_URL ||
  process.env.DATABASE_URL ||
  ""
).replace(":6543/", ":5432/");

export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: {
    url: databaseUrl,
  },
});
