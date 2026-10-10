import fs from "node:fs/promises";
import { render, routes, pageMeta } from "../.build/entry-server.js";
const template = await fs.readFile("dist/index.html", "utf8");
const origin = process.env.SITE_URL || "https://nexhome.pages.dev";
const escape = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
for (const path of routes) {
  const meta = pageMeta(path);
  let html = template
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escape(meta.title)} | NEXHOME</title>`,
    );
  html = html.replace(
    "</head>",
    `<meta name="description" content="${escape(meta.description)}"/><link rel="canonical" href="${origin}${path === "/" ? "/" : path}"/><meta property="og:title" content="${escape(meta.title)} | NEXHOME"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:type" content="website"/><meta property="og:url" content="${origin}${path}"/><meta property="og:image" content="${origin}/images/core-1280.webp"/><meta name="twitter:card" content="summary_large_image"/>${path === "/404" ? '<meta name="robots" content="noindex"/>' : ""}</head>`,
  );
  const file =
    path === "/"
      ? "dist/index.html"
      : path === "/404"
        ? "dist/404.html"
        : `dist${path}/index.html`;
  await fs.mkdir(file.slice(0, file.lastIndexOf("/")), { recursive: true });
  await fs.writeFile(file, html);
}
await fs.writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
    .filter((p) => p != "/404")
    .map((p) => `<url><loc>${origin}${p}</loc></url>`)
    .join("")}</urlset>`,
);
await fs.writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(`Pre-rendered ${routes.length} routes for ${origin}`);
