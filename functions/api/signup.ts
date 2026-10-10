interface Statement {
  bind(...values: unknown[]): Statement;
  first<T>(): Promise<T | null>;
  run(): Promise<{ success: boolean }>;
}
interface Env {
  DB?: {
    prepare(query: string): Statement;
    batch(statements: Statement[]): Promise<unknown>;
  };
  SIGNUPS_ENABLED?: string;
  PUBLIC_CONTACT_EMAIL?: string;
}
export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) {
  const reply = (message: string, status = 200) =>
    Response.json(
      { message },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  if (env.SIGNUPS_ENABLED !== "true" || !env.DB || !env.PUBLIC_CONTACT_EMAIL)
    return reply(
      "Registration is not available. No information has been saved.",
      503,
    );
  if (request.headers.get("Origin") !== new URL(request.url).origin)
    return reply("Invalid request origin.", 403);
  if (!request.headers.get("Content-Type")?.includes("application/json"))
    return reply("Use a JSON request.", 415);
  const text = await request.text();
  if (text.length > 2048) return reply("Request too large.", 413);
  let data: { email?: unknown; consent?: unknown; website?: unknown };
  try {
    data = JSON.parse(text);
  } catch {
    return reply("Invalid request.", 400);
  }
  if (data.website) return reply("Your interest has been recorded.");
  if (
    typeof data.email !== "string" ||
    data.email.length > 254 ||
    data.consent !== true
  )
    return reply("Enter a valid email and confirm consent.", 400);
  const email = data.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return reply("Enter a valid email address.", 400);
  try {
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const hash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(ip + new Date().toISOString().slice(0, 10)),
        ),
      ),
    )
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
    const minute = Math.floor(Date.now() / 60000);
    await env.DB.prepare("DELETE FROM rate_limits WHERE window < ?")
      .bind(minute - 60)
      .run();
    const count = await env.DB.prepare(
      "INSERT INTO rate_limits (key, window, count) VALUES (?, ?, 1) ON CONFLICT(key, window) DO UPDATE SET count=count+1 RETURNING count",
    )
      .bind(hash, minute)
      .first<{ count: number }>();
    if ((count?.count ?? 0) > 5)
      return reply("Too many attempts. Please wait a minute.", 429);
    await env.DB.prepare(
      "DELETE FROM interests WHERE created_at < datetime('now', '-180 days')",
    ).run();
    await env.DB.prepare(
      "INSERT OR IGNORE INTO interests(email, consent_version) VALUES (?, ?)",
    )
      .bind(email, "2026-10-10")
      .run();
    return reply("Your interest has been recorded. No email will be sent.");
  } catch {
    return reply(
      "Registration could not be saved. Please try again later.",
      503,
    );
  }
}
