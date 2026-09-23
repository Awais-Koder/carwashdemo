import type { NextConfig } from "next";

/**
 * Static export config.
 *
 * - Vercel: works with zero extra configuration (leave NEXT_PUBLIC_BASE_PATH unset).
 * - GitHub Pages project site (https://user.github.io/repo/): build with
 *     NEXT_PUBLIC_BASE_PATH=/repo npm run build
 *   which prefixes every asset and route. See README for the one-line action.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // Static export cannot use the default optimizer.
    unoptimized: true,
    // No remote image hosts are configured on purpose: the site ships a single
    // local, graded brand set (see design.md § Imagery). Adding a remote
    // pattern here is how the mixed-stock look crept back in before.
  },
};

export default nextConfig;
