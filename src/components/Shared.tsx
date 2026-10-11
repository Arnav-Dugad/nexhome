import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
  Plus,
  Minus,
} from "lucide-react";
import { useInView } from "motion/react";
import { products, type Product } from "../data";
export function LinkButton({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <a className={"button " + (light ? "button-light" : "")} href={href}>
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.1 });
  return (
    <div
      ref={ref}
      className={className + " reveal " + (visible ? "reveal-visible" : "")}
    >
      {children}
    </div>
  );
}
export function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", scroll, { passive: true });
    const theme = localStorage.getItem("profectus360-theme") === "dark";
    setDark(theme);
    document.documentElement.dataset.theme = theme ? "dark" : "light";
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const toggle = () => {
    setDark(!dark);
    document.documentElement.dataset.theme = dark ? "light" : "dark";
    localStorage.setItem("profectus360-theme", dark ? "light" : "dark");
  };
  const links = [
    ["Products", "/products"],
    ["Intelligence", "/intelligence"],
    ["Design", "/design"],
    ["Our story", "/story"],
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className={
          "header " +
          (path === "/" ? "home-header " : "") +
          (scrolled ? "scrolled" : "")
        }
      >
        <a href="/" className="wordmark" aria-label="Profectus360 home">
          <svg
            className="brand-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M6 21V3h7a6 6 0 0 1 0 12H6"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
            />
          </svg>
          <span className="brand-name">
            profectus<span>360</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a
              key={href}
              className={path.startsWith(href) ? "active" : ""}
              href={href}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="nav-cta" href="/early-access">
            Express interest <ArrowUpRight size={14} />
          </a>
          <button
            ref={menuRef}
            className="icon-button menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {open && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              menuRef.current?.focus();
            }
            if (e.key === "Tab") {
              const nodes =
                panelRef.current?.querySelectorAll<HTMLElement>("a,button");
              if (nodes?.length) {
                const first = nodes[0],
                  last = nodes[nodes.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }
          }}
        >
          {[
            ...links,
            ["Journal", "/journal"],
            ["Express interest", "/early-access"],
          ].map(([label, href], i) => (
            <a key={href} href={href}>
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </a>
          ))}
          <button
            className="button"
            onClick={() => {
              setOpen(false);
              menuRef.current?.focus();
            }}
          >
            Close menu <X size={16} />
          </button>
          <p>Intelligence, beautifully integrated.</p>
        </div>
      )}
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a className="wordmark" href="/">
          <span className="brand-name">
            profectus<span>360</span>
          </span>
        </a>
        <p>
          Intelligence,
          <br />
          beautifully integrated.
        </p>
        <div>
          <span className="eyebrow">EXPLORE</span>
          <a href="/products">The ecosystem</a>
          <a href="/intelligence">Intelligence</a>
          <a href="/design">Design philosophy</a>
        </div>
        <div>
          <span className="eyebrow">Profectus360</span>
          <a href="/story">Our story</a>
          <a href="/journal">Journal</a>
          <a href="/contact">Contact</a>
          <a href="/early-access">Express interest</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {2026} Profectus360 concept project. Designed with India in mind.
        </p>
        <div>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/cookies">Cookies</a>
        </div>
      </div>
      <p className="disclosure">
        An early-stage product concept. All visuals are original AI-generated
        concept renders or interactive design studies, not photographs of
        manufactured hardware. Features, specifications, pricing, and timelines
        are provisional. No products are available for purchase.
      </p>
    </footer>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="status-dot" />
      {children}
    </p>
  );
}
export function ProductImage({
  id,
  view = "beauty",
  eager = false,
  className = "",
  sizes = "(max-width: 700px) 100vw, 60vw",
}: {
  id: string;
  view?: string;
  eager?: boolean;
  className?: string;
  sizes?: string;
}) {
  const base =
    id === "core" && view === "macro"
      ? "core-material"
      : id === "control" && view === "lifestyle"
        ? "control-room"
        : view === "beauty"
          ? id
          : id + "-" + view;
  return (
    <picture className={"product-picture " + className}>
      <source
        srcSet={`/images/${base}-640.webp 640w, /images/${base}-1280.webp 1280w`}
        sizes={sizes}
        type="image/webp"
      />
      <img
        src={`/images/${base}-1280.webp`}
        alt={`Profectus360 ${id[0].toUpperCase() + id.slice(1)} — ${view} concept render`}
        width="1536"
        height="1024"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </picture>
  );
}
export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <a className="product-card" href={"/products/" + product.id}>
      <div className="card-visual">
        <span className="card-number">
          0{index + 1} / {product.category.toUpperCase()}
        </span>
        <ProductImage id={product.id} />
        <span className="card-arrow">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="card-info">
        <div>
          <h3>Profectus360 {product.name}</h3>
          <p>{product.tagline}</p>
        </div>
        <span>
          ₹{product.price}
          <small>Indicative</small>
        </span>
      </div>
    </a>
  );
}
export function AccessCTA() {
  return (
    <section className="access-cta section">
      <Eyebrow>THE NEXT CHAPTER</Eyebrow>
      <div>
        <h2>
          A better home
          <br />
          starts with an idea.
        </h2>
        <div>
          <p>
            We’re exploring what a more thoughtful connected home could be. Tell
            us which concepts you’d love to see take shape.
          </p>
          <LinkButton href="/early-access">Express interest</LinkButton>
        </div>
      </div>
    </section>
  );
}
export function FAQ({ items }: { items: [string, string][] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="faqs">
      {items.map(([q, a], i) => (
        <div className="faq" key={q}>
          <h3>
            <button
              aria-expanded={active === i}
              aria-controls={"faq-" + i}
              onClick={() => setActive(active === i ? null : i)}
            >
              {q}
              {active === i ? <Minus size={18} /> : <Plus size={18} />}
            </button>
          </h3>
          <div id={"faq-" + i} hidden={active !== i}>
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function Comparison() {
  const [selected, setSelected] = useState(["core", "sense", "control"]);
  return (
    <section className="section comparison" id="compare">
      <Eyebrow>FIND YOUR FIT</Eyebrow>
      <h2>
        Different roles.
        <br />
        One shared vision.
      </h2>
      <div className="compare-options">
        {products.map((p) => (
          <label key={p.id}>
            <input
              type="checkbox"
              checked={selected.includes(p.id)}
              onChange={() =>
                setSelected(
                  selected.includes(p.id)
                    ? selected.filter((x) => x !== p.id)
                    : [...selected, p.id],
                )
              }
            />
            {p.name}
          </label>
        ))}
      </div>
      {selected.length ? (
        <div className="table-scroll">
          <table>
            <caption className="sr-only">
              Concept product comparison; all figures are provisional
            </caption>
            <thead>
              <tr>
                <th scope="col">Concept</th>
                {products
                  .filter((p) => selected.includes(p.id))
                  .map((p) => (
                    <th key={p.id} scope="col">
                      {p.name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {["Role", "Size target", "Indicative INR", "Key concept"].map(
                (row, i) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    {products
                      .filter((p) => selected.includes(p.id))
                      .map((p) => (
                        <td key={p.id}>
                          {
                            [
                              p.category,
                              p.dimensions,
                              "₹" + p.price,
                              p.features[0],
                            ][i]
                          }
                        </td>
                      ))}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p role="status">
          Select a concept to see its proposed specifications.
        </p>
      )}
      <p className="fine-print">
        Design targets and indicative pricing only. No offer for sale.
      </p>
    </section>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="text-link" href={href}>
      {children}
      <ArrowRight size={16} />
    </a>
  );
}
