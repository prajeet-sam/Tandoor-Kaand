import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://the-tandoor-case.vercel.app/sitemap.xml",
    host: "https://the-tandoor-case.vercel.app",
  };
}