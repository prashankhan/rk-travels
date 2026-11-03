import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = ["", "/about", "/services", "/airport-transfers", "/vehicle-rentals", "/tours", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return routes.map((r) => ({
    url: `${base}${r || "/"}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : ["/privacy", "/terms"].includes(r) ? 0.2 : 0.8,
  }));
}
