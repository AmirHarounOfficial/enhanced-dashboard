/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export — no server/serverless functions.
  // Serve the generated `out/` directory (e.g. on Netlify) with no timeouts.
  output: "export",
  trailingSlash: true,
  images: {
    // next/image optimization requires a server; disable for static export.
    unoptimized: true,
  },
  eslint: {
    // Don't fail the production build on lint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
