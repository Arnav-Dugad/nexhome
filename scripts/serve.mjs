import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { gzip as gzipCallback } from "node:zlib";
import { promisify } from "node:util";
const gzip = promisify(gzipCallback);
const root = path.resolve("dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
};
http
  .createServer(async (req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
    } catch {
      res.writeHead(400).end();
      return;
    }
    if (pathname === "/api/status") {
      res.setHeader("Content-Type", "application/json");
      res.end('{"signups":false}');
      return;
    }
    const resolved = path.resolve(root, "." + pathname);
    if (!resolved.startsWith(root + path.sep) && resolved !== root) {
      res.writeHead(403).end();
      return;
    }
    let file = resolved;
    let status = 200;
    try {
      if ((await fs.stat(file)).isDirectory())
        file = path.join(file, "index.html");
      await fs.access(file);
    } catch {
      file = path.join(root, "404.html");
      status = 404;
    }
    try {
      const data = await fs.readFile(file);
      const compressed =
        /\.(html|js|css|svg|xml|txt)$/.test(file) &&
        req.headers["accept-encoding"]?.includes("gzip");
      res.writeHead(status, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        ...(compressed
          ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" }
          : {}),
        "Cache-Control": /\/(assets|images|fonts)\//.test(pathname)
          ? "public, max-age=604800"
          : "no-cache",
      });
      res.end(compressed ? await gzip(data) : data);
    } catch {
      res.writeHead(500).end();
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`NEXHOME production preview http://127.0.0.1:${port}`),
  );
