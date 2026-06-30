import { defineConfig, env } from "prisma";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    db: {
      provider: "postgresql",
      url: env("DATABASE_URL"),
      // shadowDatabaseUrl: env("SHADOW_DATABASE_URL"),
    },
  },
});
