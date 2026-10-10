import { test } from "node:test";
import assert from "node:assert/strict";
import { onRequestGet } from "../functions/api/status.ts";
import { onRequestPost } from "../functions/api/signup.ts";
const request = (data) =>
  new Request("https://nexhome.pages.dev/api/signup", {
    method: "POST",
    headers: {
      Origin: "https://nexhome.pages.dev",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
test("signup is unavailable without configured storage and verified contact", async () => {
  assert.deepEqual(await onRequestGet({ env: {} }).json(), { signups: false });
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
