import type { NextConfig } from "next";

// /api/v1 is proxied at runtime in app/api/v1/[...path]/route.ts (Render sets API_BASE_URL).
const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "no-referrer" },
];

const apiOrigin = (process.env.API_BASE_URL ?? "http://localhost:8000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiOrigin}/api/v1/:path*`,
      },
    ];
  },
  async headers() {
    return [
      // SAMEORIGIN so /demo present mode can iframe app screens on the same host.
      { source: "/((?!design/).*)", headers: [...security, { key: "X-Frame-Options", value: "SAMEORIGIN" }] },
      { source: "/design/:path*", headers: [...security, { key: "X-Frame-Options", value: "SAMEORIGIN" }] },
    ];
  },
  async redirects() {
    return [
      // One share URL: rhema-ai-web.vercel.app (legacy church-ai-web host → canonical)
      {
        source: "/:path*",
        has: [{ type: "host", value: "church-ai-web.vercel.app" }],
        destination: "https://rhema-ai-web.vercel.app/:path*",
        permanent: true,
      },
      // Public entry points (use these in links and when sharing)
      { source: "/", destination: "/design/ui_kits/landing/index.html", permanent: false },
      { source: "/tour", destination: "/design/ui_kits/tour/index.html", permanent: false },
      { source: "/dictionary", destination: "/dictionary.html", permanent: false },
      { source: "/help", destination: "/help.html", permanent: false },
      { source: "/manual", destination: "/help.html", permanent: false },
      { source: "/beta-survey", destination: "/design/ui_kits/beta-survey.html", permanent: false },
      { source: "/survey", destination: "/design/ui_kits/beta-survey.html", permanent: false },
      { source: "/waitlist", destination: "/waitlist/index.html", permanent: false },
      { source: "/feedback", destination: "/feedback/index.html", permanent: false },
      { source: "/analytics", destination: "/analytics/index.html", permanent: false },
      { source: "/demo", destination: "/local/index.html", permanent: false },
      { source: "/local", destination: "/local/index.html", permanent: false },
      { source: "/localhost", destination: "/local/index.html", permanent: false },
      { source: "/map-app", destination: "/local/index.html", permanent: false },
      { source: "/screens", destination: "/design/All%20Screens.html", permanent: false },
      { source: "/all", destination: "/design/All%20Screens.html", permanent: false },
    ];
  },
};

export default nextConfig;
