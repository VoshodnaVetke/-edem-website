import deployment from "./config/deployment.json" with { type: "json" };

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@edem/ui"],
  output: "export",
  basePath: deployment.basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { inlineCss: true },
};

export default nextConfig;
