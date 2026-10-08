/** @type {import('next').NextConfig} */
// Statische export (out/) die Cloudflare uitserveert; de /api/flight-status live-check
// draait in worker.js (AeroDataBox-key = Worker-secret). Geen server nodig voor de pagina's.
const nextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};
export default nextConfig;
