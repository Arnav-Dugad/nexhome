import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { products } from "../data";
import { ProductImage, TextLink } from "./Shared";

export default function InterestForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const receipt = useRef<string | null>(null);

  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product");
    if (product && products.some((p) => p.id === product))
      setSelected([product]);
  }, []);

  function choose(id: string) {
    receipt.current = null;
    setMessage("");
    setState("idle");
    setSelected((current) =>
      current.includes(id) ? current.filter((p) => p !== id) : [...current, id],
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading" || state === "success") return;
    if (!selected.length) {
      setState("error");
      setMessage("Choose at least one product that interests you.");
      return;
    }
    const website = new FormData(event.currentTarget).get("website") ?? "";
    receipt.current ??= crypto.randomUUID();
    setState("loading");
    setMessage("");
    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: selected,
          consent,
          receipt: receipt.current,
          website,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok || data.saved !== true) {
        setState("error");
        setMessage(
          data.message ?? "Your interest could not be saved. Please try again.",
        );
        return;
      }
      setState("success");
      setMessage(
        "Your interest has been recorded. Thank you for helping shape Profectus360.",
      );
    } catch {
      setState("error");
      setMessage(
        "We couldn’t confirm your submission. Please try again; a retry won’t create a duplicate.",
      );
    }
  }

  return (
    <div className="access-form interest-form">
      <span className="eyebrow">HELP SHAPE WHAT’S NEXT</span>
      <h2>
        Your home.
        <br />
        <em>Your perspective.</em>
      </h2>
      {state === "success" ? (
        <div className="interest-success">
          <span className="interest-success-icon" aria-hidden="true">
            <Check size={28} />
          </span>
          <h3>Interest recorded.</h3>
          <p role="status">{message}</p>
          <div className="interest-tags">
            {products
              .filter((p) => selected.includes(p.id))
              .map((p) => (
                <span key={p.id}>{p.name}</span>
              ))}
          </div>
          <p className="fine-print">
            No subscription, reservation, or payment. You can follow our
            progress in the journal.
          </p>
          <TextLink href="/journal">Explore the journal</TextLink>
        </div>
      ) : (
        <form onSubmit={submit} aria-busy={state === "loading"}>
          <fieldset
            disabled={state === "loading"}
            className="interest-options"
            aria-describedby="interest-help"
          >
            <legend>What would you like to see in your home?</legend>
            <p id="interest-help">Select one or more concepts.</p>
            {products.map((product) => (
              <label
                className={
                  "interest-option " +
                  (selected.includes(product.id) ? "selected" : "")
                }
                key={product.id}
              >
                <ProductImage id={product.id} sizes="56px" />
                <span>
                  <strong>{product.name}</strong>
                  <small>{product.category}</small>
                </span>
                <input
                  type="checkbox"
                  checked={selected.includes(product.id)}
                  onChange={() => choose(product.id)}
                  value={product.id}
                  name="products"
                  aria-label={product.name}
                />
              </label>
            ))}
          </fieldset>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label className="consent interest-consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              disabled={state === "loading"}
            />
            <span>
              I agree to send my anonymous product preferences. I’ve read the{" "}
              <a href="/privacy">privacy notice</a>.
            </span>
          </label>
          <button
            className="button"
            disabled={state === "loading"}
            type="submit"
          >
            {state === "loading" ? (
              <>
                Recording interest{" "}
                <LoaderCircle className="interest-spinner" size={16} />
              </>
            ) : (
              <>
                Express interest <ArrowUpRight size={16} />
              </>
            )}
          </button>
          <p className={"form-result " + state} role="status">
            {message}
          </p>
          <p className="fine-print">
            Only your product choices are saved. No email, account, or personal
            details required. Email signup remains unavailable.
          </p>
        </form>
      )}
    </div>
  );
}
