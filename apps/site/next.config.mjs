/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@edem/ui"],
  output: "export",
  basePath: "/-edem-website",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
