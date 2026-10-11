interface Env {
  INTEREST_DB?: D1Database;
  DB?: D1Database;
  SIGNUPS_ENABLED?: string;
  PUBLIC_CONTACT_EMAIL?: string;
}
interface D1Database {
  prepare(query: string): { bind(...values: unknown[]): unknown };
}
export const onRequestGet = ({ env }: { env: Env }) =>
  Response.json(
    {
      interest: !!env.INTEREST_DB,
      signups:
        env.SIGNUPS_ENABLED === "true" &&
        !!env.DB &&
        !!env.PUBLIC_CONTACT_EMAIL,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
