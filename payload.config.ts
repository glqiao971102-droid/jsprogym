import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Areas } from "./collections/Areas";
import { Homepage } from "./globals/Homepage";
import { ChampionPage } from "./globals/ChampionPage";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " — JSPROGYM" },
  },
  // 4 editable languages, with a locale switcher in the admin UI.
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "简体中文", code: "zh-Hans" },
      { label: "繁體中文", code: "zh-Hant" },
      { label: "Bahasa Melayu", code: "ms" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  collections: [Users, Media, Areas],
  globals: [Homepage, ChampionPage, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      ssl: process.env.DATABASE_URI?.includes("amazonaws.com")
        ? { rejectUnauthorized: false }
        : undefined,
    },
  }),
  plugins: [
    s3Storage({
      collections: {
        media: { prefix: "jsprogym" },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_KEY || "",
          secretAccessKey: process.env.S3_SECRET || "",
        },
      },
    }),
  ],
});
