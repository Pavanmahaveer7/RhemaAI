import type { NextConfig } from "next";

const apiBase = process.env.API_BASE_URL ?? "http://localhost:8000";
const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "no-referrer" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/((?!design/).*)", headers: [...security, { key: "X-Frame-Options", value: "DENY" }] },
      // The design boards and the demo preview the screens in same-origin frames.
      { source: "/design/:path*", headers: [...security, { key: "X-Frame-Options", value: "SAMEORIGIN" }] },
    ];
  },
  async rewrites() {
    return [{ source: "/api/v1/:path*", destination: `${apiBase}/api/v1/:path*` }];
  },
  async redirects() {
    return [
      { source: "/", destination: "/design/ui_kits/landing/index.html", permanent: false },
      { source: "/app", destination: "/design/ui_kits/public/index.html", permanent: false },
      { source: "/pastor", destination: "/design/ui_kits/pipeline/index.html", permanent: false },
      { source: "/tour", destination: "/design/ui_kits/tour/index.html", permanent: false },
      { source: "/beta-survey", destination: "/design/ui_kits/beta-survey.html", permanent: false },
      { source: "/screens", destination: "/design/All%20Screens.html", permanent: false },
    ];
  },
};

export default nextConfig;
