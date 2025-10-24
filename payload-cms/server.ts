import express from "express";
import payload from "payload";
import { buildConfig } from "payload/config";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

const config = buildConfig({
  editor: lexicalEditor(),
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [],
    },
    {
      slug: "products",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "medusa_id", type: "text", required: true },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET!,
  db: postgresAdapter({
    pool: { connectionString: process.env.PAYLOAD_DATABASE_URL! },
  }),
  sharp,
});

const app = express();

async function start() {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    config,
  });

  app.listen(3000, () => {
    console.log("Payload Admin: http://localhost:3000/admin");
  });
}

start().catch(console.error);
