import { test } from "node:test";
import assert from "node:assert/strict";
import { onRequestGet } from "../functions/api/status.ts";
import { onRequestPost } from "../functions/api/signup.ts";
import { onRequestPost as interestPost } from "../functions/api/interest.ts";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
const request = (data) =>
  new Request("https://profectus360.pages.dev/api/signup", {
    method: "POST",
    headers: {
      Origin: "https://profectus360.pages.dev",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
test("signup is unavailable without configured storage and verified contact", async () => {
  assert.deepEqual(await onRequestGet({ env: {} }).json(), {
    signups: false,
    interest: false,
  });
  const response = await onRequestPost({
    request: request({ email: "test@example.com", consent: true }),
    env: {},
  });
  assert.equal(response.status, 503);
  assert.match(
    (await response.json()).message,
    /No information has been saved/,
  );
});
const configured = {
  SIGNUPS_ENABLED: "true",
  PUBLIC_CONTACT_EMAIL: "test@example.com",
  DB: {
    prepare() {
      throw Error("Validation must not access the database");
    },
  },
};
test("cross-origin requests are rejected before storage", async () => {
  const req = request({ email: "test@example.com", consent: true });
  req.headers.set("Origin", "https://unrelated.example");
  assert.equal(
    (await onRequestPost({ request: req, env: configured })).status,
    403,
  );
});
test("email, consent, payload and content type validation", async () => {
  for (const data of [
    { email: "invalid", consent: true },
    { email: "test@example.com", consent: false },
    { email: 17, consent: true },
  ])
    assert.equal(
      (await onRequestPost({ request: request(data), env: configured })).status,
      400,
    );
  assert.equal(
    (
      await onRequestPost({
        request: request({ email: "a".repeat(3000) }),
        env: configured,
      })
    ).status,
    413,
  );
  const req = request({});
  req.headers.set("Content-Type", "text/plain");
  assert.equal(
    (await onRequestPost({ request: req, env: configured })).status,
    415,
  );
});
test("honeypot submissions do not access storage", async () => {
  assert.equal(
    (
      await onRequestPost({
        request: request({
          email: "test@example.com",
          consent: true,
          website: "spam",
        }),
        env: configured,
      })
    ).status,
    200,
  );
});

const interestRequest = (data) =>
  new Request("https://profectus360.pages.dev/api/interest", {
    method: "POST",
    headers: {
      Origin: "https://profectus360.pages.dev",
      "Content-Type": "application/json",
      "CF-Connecting-IP": "192.0.2.17",
    },
    body: JSON.stringify(data),
  });
const preference = () => ({
  products: ["core", "air"],
  consent: true,
  receipt: crypto.randomUUID(),
  website: "",
});
function interestEnv(t) {
  const db = new DatabaseSync(":memory:");
  t.after(() => db.close());
  db.exec(
    readFileSync(
      new URL(
        "../migrations/interest/0001_product_interests.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  return {
    db,
    env: {
      INTEREST_DB: {
        prepare(sql) {
          let values = [];
          return {
            bind(...args) {
              values = args;
              return this;
            },
            async first() {
              return db.prepare(sql).get(...values) ?? null;
            },
            async run() {
              db.prepare(sql).run(...values);
              return { success: true };
            },
          };
        },
      },
    },
  };
}
test("anonymous interest fails honestly without storage or when storage fails", async () => {
  assert.equal(
    (await interestPost({ request: interestRequest(preference()), env: {} }))
      .status,
    503,
  );
  const broken = {
    INTEREST_DB: {
      prepare() {
        throw Error("Database unavailable");
      },
    },
  };
  const response = await interestPost({
    request: interestRequest(preference()),
    env: broken,
  });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).saved, false);
});
test("anonymous interest rejects invalid origins, content types, payloads, consent and bots", async (t) => {
  const { db, env } = interestEnv(t);
  for (const data of [
    null,
    [],
    {},
    { ...preference(), products: [] },
    { ...preference(), products: ["core", "core"] },
    { ...preference(), products: ["unknown"] },
    { ...preference(), consent: false },
    { ...preference(), receipt: "bad" },
    { ...preference(), website: "spam" },
  ]) {
    assert.equal(
      (await interestPost({ request: interestRequest(data), env })).status,
      400,
    );
  }
  const origin = interestRequest(preference());
  origin.headers.set("Origin", "https://unrelated.example");
  assert.equal((await interestPost({ request: origin, env })).status, 403);
  const plain = interestRequest(preference());
  plain.headers.set("Content-Type", "text/plain");
  assert.equal((await interestPost({ request: plain, env })).status, 415);
  assert.equal(
    (
      await interestPost({
        request: interestRequest({ ...preference(), extra: "a".repeat(3000) }),
        env,
      })
    ).status,
    413,
  );
  const malformed = new Request("https://profectus360.pages.dev/api/interest", {
    method: "POST",
    headers: {
      Origin: "https://profectus360.pages.dev",
      "Content-Type": "application/json",
    },
    body: "{",
  });
  assert.equal((await interestPost({ request: malformed, env })).status, 400);
  assert.equal(
    db.prepare("SELECT COUNT(*) AS n FROM product_interests").get().n,
    0,
  );
  assert.equal(
    db.prepare("SELECT COUNT(*) AS n FROM interest_limits").get().n,
    0,
  );
});
test("anonymous interest saves selected concepts and deduplicates retries in SQLite", async (t) => {
  const { db, env } = interestEnv(t);
  const data = preference();
  for (let i = 0; i < 2; i++) {
    const response = await interestPost({
      request: interestRequest(data),
      env,
    });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).saved, true);
  }
  const rows = db.prepare("SELECT * FROM product_interests").all();
  assert.equal(rows.length, 1);
  assert.deepEqual(JSON.parse(rows[0].products), ["air", "core"]);
  assert.equal(rows[0].consent_version, "2026-10-11");
  assert.equal(rows[0].receipt, data.receipt);
  assert.deepEqual(Object.keys(rows[0]).sort(), [
    "consent_version",
    "created_at",
    "products",
    "receipt",
  ]);
  const limit = db.prepare("SELECT * FROM interest_limits").get();
  assert.match(limit.key, /^[a-f0-9]{64}$/);
  assert.deepEqual(await onRequestGet({ env }).json(), {
    signups: false,
    interest: true,
  });
});
test("anonymous interest throttles after five attempts and clears expired records", async (t) => {
  const { db, env } = interestEnv(t);
  db.exec(
    "INSERT INTO product_interests VALUES ('old', '[\"core\"]', 'old', datetime('now', '-181 days')); INSERT INTO interest_limits VALUES ('old', 1, 2);",
  );
  for (let i = 0; i < 5; i++)
    assert.equal(
      (await interestPost({ request: interestRequest(preference()), env }))
        .status,
      200,
    );
  const limited = await interestPost({
    request: interestRequest(preference()),
    env,
  });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "60");
  assert.equal((await limited.json()).saved, false);
  assert.equal(
    db.prepare("SELECT COUNT(*) AS n FROM product_interests").get().n,
    5,
  );
  assert.equal(
    db
      .prepare("SELECT COUNT(*) AS n FROM interest_limits WHERE key='old'")
      .get().n,
    0,
  );
});
