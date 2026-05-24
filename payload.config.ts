import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { ProjectTags } from "./collections/ProjectTags";
import { Projects } from "./collections/Projects";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ProjectTags, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: process.env.MONGO_URL ? mongooseAdapter({
    // Mongoose-specific arguments go here.
    // URL is required.
    url: process.env.MONGO_URL,
  }) : sqliteAdapter({
    // SQLite-specific arguments go here.
    // `client.url` is required.
    client: {
      url: 'file:./portfolio.db',
    },
  }),
  sharp,
  plugins: [],
});
