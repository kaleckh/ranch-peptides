import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import { resolve, relative, extname, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

const root = await realpath(fileURLToPath(new URL("../out", import.meta.url)));
const types = { ".html": "text/html; charset=utf-8", ".txt": "text/x-component; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".pdf": "application/pdf" };
const inside = (path) => { const part = relative(root, path); return part !== ".." && !part.startsWith("..\\") && !part.startsWith("../") && !isAbsolute(part); };

export const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  try {
    const path = decodeURIComponent((request.url ?? "/").split("?")[0]);
    if (path.includes("\0") || path.includes("\\")) { response.writeHead(400).end(); return; }
    const base = resolve(root, `.${path}`);
    if (!inside(base)) { response.writeHead(404).end(); return; }
    let target;
    for (const candidate of [base, `${base}.html`, resolve(base, "index.html")]) {
      try {
        const actual = await realpath(candidate);
        if (inside(actual) && (await stat(actual)).isFile()) { target = actual; break; }
      } catch (error) { if (!["ENOENT", "ENOTDIR"].includes(error.code)) throw error; }
    }
    const status = target ? 200 : 404;
    target ??= resolve(root, "404.html");
    const body = await readFile(target);
    response.writeHead(status, {
      "Content-Type": types[extname(target)] ?? "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": relative(root, target).startsWith("_next") ? "public, max-age=31536000, immutable" : "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 500).end();
  }
});

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  server.listen(3016, "127.0.0.1", () => console.log("Built UX preview: http://127.0.0.1:3016 (rebuild after edits; checkout demo uses port 3015)"));
}
