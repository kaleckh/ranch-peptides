import assert from "node:assert/strict";
import { request } from "node:http";
import { once } from "node:events";
import test from "node:test";
import { server } from "./preview-static.mjs";

test("built preview serves exported routes and rejects unsafe requests", async () => {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const port = server.address().port;
  const get = (path, method = "GET") => new Promise((resolve, reject) => {
    const req = request({ hostname: "127.0.0.1", port, path, method }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on("error", reject);
    req.end();
  });
  try {
    for (const slug of ["bpc-157", "retatrutide", "tb-500", "mt-2", "mots-c", "pinealon", "epitalon", "ghk-cu"]) {
      const page = await get(`/science/${slug}?review=1`);
      assert.equal(page.status, 200);
      assert.match(page.headers["content-type"], /text\/html/);
      assert.match(page.body, /In this reading list/);
      const payload = await get(`/science/${slug}.txt`);
      assert.equal(payload.status, 200);
      assert.match(payload.headers["content-type"], /text\/x-component/);
    }
    const index = await get("/");
    assert.equal(index.status, 200);
    const asset = index.body.match(/src="([^" ]+\.js)"/)[1];
    assert.equal((await get(asset)).status, 200);
    assert.equal((await get("/science", "HEAD")).body, "");
    assert.equal((await get("/does-not-exist")).status, 404);
    assert.equal((await get("/%2e%2e/package.json")).status, 404);
    assert.equal((await get("/%5c..%5cpackage.json")).status, 400);
    assert.equal((await get("/%invalid")).status, 400);
    assert.equal((await get("/science", "POST")).status, 405);
  } finally { await new Promise((resolve) => server.close(resolve)); }
});
