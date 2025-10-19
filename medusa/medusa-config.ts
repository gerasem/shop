import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },

    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable",
    },
  },
  plugins: [
    {
      resolve: "@devx-commerce/strapi",
      options: {
        base_url: "http://localhost:1337/api",
        api_key:
          "317b231842fb3e60d477955f1485e7f697c7c62276563a098aa765205223ae5fb6d54faaa29cc445231c029d10b658681954e7cd71399f1e9dcac48310058bb2f251222c257dae1eb046eafe0a9a9388b692a0c6fdf332aa26435574f201b5d917d195552d87ac1e4df64225f8d9d47ef6e5bbbfef4cb0dd02cc7906c0802257",
      },
    },
  ],
});
