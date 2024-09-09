// @ts-check
import { defineConfig } from "astro/config";

import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), icon()],
  output: "server",
  adapter: vercel(),
});
