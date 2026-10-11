interface Statement {
  bind(...values: unknown[]): Statement;
  first<T>(): Promise<T | null>;
  run(): Promise<{ success: boolean }>;
}
interface Env {
  INTEREST_DB?: { prepare(query: string): Statement };
}
const productIds = new Set(["core", "sense", "light", "control", "air"]);
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) {
  const reply = (message: string, status = 200, saved = false) =>
    Response.json(
      { message, saved },
      {
        status,
        headers: {
          "Cache-Control": "no-store",
          ...(status === 429 ? { "Retry-After": "60" } : {}),
        },
      },
    );
  if (!env.INTEREST_DB)
    return reply(
      "Interest submissions are temporarily unavailable. Please try again later.",
      503,
    );
  if (request.headers.get("Origin") !== new URL(request.url).origin)
    return reply("Invalid request origin.", 403);
  if (!request.headers.get("Content-Type")?.includes("application/json"))
    return reply("Use a JSON request.", 415);
  if (Number(request.headers.get("Content-Length")) > 2048)
    return reply("Request too large.", 413);
  const reader = request.body?.getReader();
  if (!reader) return reply("Invalid request.", 400);
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 2048) {
        await reader.cancel();
        return reply("Request too large.", 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } catch {
    return reply("Invalid request.", 400);
  }
  let data: {
    products?: unknown;
    consent?: unknown;
    receipt?: unknown;
    website?: unknown;
  };
  try {
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return reply("Invalid request.", 400);
    data = parsed;
  } catch {
    return reply("Invalid request.", 400);
  }
  if (data.website) return reply("Unable to accept this submission.", 400);
  if (
    data.consent !== true ||
    !Array.isArray(data.products) ||
    data.products.length < 1 ||
    data.products.length > 5 ||
    data.products.some((p) => typeof p !== "string" || !productIds.has(p)) ||
    new Set(data.products).size !== data.products.length ||
    typeof data.receipt !== "string" ||
    !uuidPattern.test(data.receipt)
  ) {
    return reply("Choose valid product interests and confirm consent.", 400);
  }
  try {
    // One-way daily hash used only for short-lived abuse protection, never saved with choices.
    const ip = request.headers.get("CF-Connecting-IP") ?? "local";
    const date = new Date().toISOString().slice(0, 10);
    const hash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(ip + date),
        ),
      ),
    )
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
    const minute = Math.floor(Date.now() / 60000);
    await env.INTEREST_DB.prepare(
      "DELETE FROM interest_limits WHERE window < ?",
    )
      .bind(minute - 60)
      .run();
    const limit = await env.INTEREST_DB.prepare(
      "INSERT INTO interest_limits (key, window, count) VALUES (?, ?, 1) ON CONFLICT(key, window) DO UPDATE SET count=count+1 RETURNING count",
    )
      .bind(hash, minute)
      .first<{ count: number }>();
    if (!limit || limit.count > 5)
      return reply(
        "Too many attempts. Please wait a minute and try again.",
        429,
      );
    await env.INTEREST_DB.prepare(
      "DELETE FROM product_interests WHERE created_at < datetime('now', '-180 days')",
    ).run();
    const result = await env.INTEREST_DB.prepare(
      "INSERT OR IGNORE INTO product_interests (receipt, products, consent_version) VALUES (?, ?, ?)",
    )
      .bind(
        data.receipt,
        JSON.stringify([...data.products].sort()),
        "2026-10-11",
      )
      .run();
    if (!result.success) throw Error("Storage unavailable");
    return reply(
      "Your interest has been recorded. No subscription or reservation has been created.",
      200,
      true,
    );
  } catch {
    return reply(
      "We couldn’t save your interest. Please try again later.",
      503,
    );
  }
}
