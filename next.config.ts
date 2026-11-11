import { existsSync } from "node:fs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  env: {
    // The import section plays the teaser only once the file has been added
    NEXT_PUBLIC_TEASER_IMPORT: existsSync("public/videos/teaser-import.mp4")
      ? "1"
      : "",
  },
};

export default withNextIntl(nextConfig);
