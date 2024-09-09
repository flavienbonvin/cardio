// @ts-check
import { defineConfig } from "astro/config";

import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import vercel from "@astrojs/vercel/serverless";

import webVitals from "@astrojs/web-vitals";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), icon(), webVitals()],
  output: "server",
  adapter: vercel(),
});