import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers3,
  LockKeyhole,
  Radio,
  X,
} from "lucide-react";
import { products, articles, type Product } from "./data";
import {
  Header,
  Footer,
  Eyebrow,
  LinkButton,
  ProductImage,
  ProductCard,
  AccessCTA,
  FAQ,
  Comparison,
  TextLink,
  Reveal,
} from "./components/Shared";
import Simulator from "./components/Simulator";
import InterestForm from "./components/InterestForm";
const Viewer = lazy(() => import("./components/Viewer"));
function Home() {
  const [focus, setFocus] = useState("core");
  const p = products.find((p) => p.id === focus)!;
  return (
    <>
      <section className="hero">
        <ProductImage id="core" eager className="hero-image" />
        <div className="hero-content">
          <Eyebrow>A MORE CONSIDERED CONNECTED HOME</Eyebrow>
          <h1>
            Intelligence,
            <br />
            beautifully
            <br />
            <em>integrated.</em>
          </h1>
          <p>
            Technology that feels at home.
            <br />
            Introducing the Profectus360 ecosystem.
          </p>
          <div className="hero-actions">
            <LinkButton href="/early-access">Express interest</LinkButton>
            <TextLink href="/products/core">Meet Core</TextLink>
          </div>
          <span className="hero-interest-note">
            Concepts in development · No email needed
          </span>
        </div>
        <div className="hero-bottom">
          <span>
            DESIGNED WITH INDIA IN MIND.{" "}
            <span className="muted">IMAGINED FOR EVERYDAY LIFE.</span>
          </span>
          <a href="#ecosystem">
            EXPLORE THE VISION <ArrowDown size={14} />
          </a>
        </div>
        <span className="hero-annotation">01 / CORE — CONCEPT RENDER</span>
      </section>
      <div className="concept-strip">
        <span className="status-dot" />
        An idea, taking shape.
        <span>
          Our products are concepts in development. Discover the journey.
        </span>
        <a href="/story">
          Our story <ArrowUpRight size={14} />
        </a>
      </div>
      <section className="section ecosystem" id="ecosystem">
        <div className="section-heading">
          <div>
            <Eyebrow>FIVE OBJECTS. ONE ECOSYSTEM.</Eyebrow>
            <h2>
              Individually considered.
              <br />
              Better together.
            </h2>
          </div>
          <p>
            From the air you breathe to the light you live in. A family of
            thoughtful devices, imagined to work in harmony.
          </p>
        </div>
        <div className="ecosystem-rail">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="section-tail">
          <p>Original concept studies / Proposed ecosystem</p>
          <TextLink href="/products">Explore all products</TextLink>
        </div>
      </section>
      <figure className="family-stage">
        <ProductImage id="lineup" />
        <figcaption>
          THE Profectus360 FAMILY / ORIGINAL CONCEPT VISUALIZATION
        </figcaption>
      </figure>
      <section className="dark-section intelligence-teaser">
        <div className="section">
          <Eyebrow>QUIET INTELLIGENCE</Eyebrow>
          <div className="split-heading">
            <h2>
              Your home.
              <br />
              In its element.
            </h2>
            <div>
              <p>
                Imagine a home that understands the rhythm of your day. Helpful
                when needed. Quiet when it isn’t.
              </p>
              <TextLink href="/intelligence">
                Explore Profectus360 Intelligence
              </TextLink>
            </div>
          </div>
          <Simulator compact />
        </div>
      </section>
      <section className="section explore-section">
        <div className="section-heading">
          <div>
            <Eyebrow>GET TO KNOW THE FAMILY</Eyebrow>
            <h2>
              A place for everything.
              <br />
              And everything in tune.
            </h2>
          </div>
          <p>
            Explore how each concept could contribute to a more intuitive home.
          </p>
        </div>
        <div className="product-explorer">
          <div
            className="explorer-tabs"
            role="group"
            aria-label="Explore ecosystem"
          >
            {products.map((item) => (
              <button
                key={item.id}
                aria-pressed={focus === item.id}
                onClick={() => setFocus(item.id)}
              >
                <span>0{products.indexOf(item) + 1}</span>
                {item.name}
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
          <div className="explorer-image">
            <ProductImage id={focus} />
          </div>
          <div className="explorer-copy" aria-live="polite">
            <span className="eyebrow">Profectus360 {p.name.toUpperCase()}</span>
            <h3>{p.tagline}</h3>
            <p>{p.description}</p>
            <TextLink href={"/products/" + p.id}>Discover {p.name}</TextLink>
          </div>
        </div>
      </section>
      <section className="design-story">
        <div className="design-image">
          <ProductImage id="core" view="macro" />
        </div>
        <div className="design-copy">
          <Eyebrow>FORM WITH PURPOSE</Eyebrow>
          <h2>
            Less noise.
            <br />
            More meaning.
          </h2>
          <p>
            Softly sculpted forms. Honest materials. A quiet presence. We
            believe the most thoughtful technology should belong in your home,
            beautifully.
          </p>
          <TextLink href="/design">Our design philosophy</TextLink>
          <span className="image-credit">
            MATERIAL EXPLORATION / CONCEPT VISUAL
          </span>
        </div>
      </section>
      <section className="section privacy-section">
        <Eyebrow>PERSONAL BY DESIGN</Eyebrow>
        <div className="split-heading">
          <h2>
            A connected home.
            <br />A private world.
          </h2>
          <p>
            Our ambition is local-first intelligence: useful routines that could
            run within your home, with fewer reasons to send data elsewhere.
          </p>
        </div>
        <div className="architecture">
          <div>
            <Radio />
            <h3>Your devices</h3>
            <p>Signals from your home</p>
          </div>
          <span className="architecture-line" />
          <div className="architecture-core">
            <Cpu />
            <h3>Profectus360 Core</h3>
            <p>Local processing target</p>
          </div>
          <span className="architecture-line" />
          <div>
            <LockKeyhole />
            <h3>Your choices</h3>
            <p>Optional connected features</p>
          </div>
        </div>
        <p className="fine-print">
          Proposed architecture. Offline capabilities, security, and
          compatibility require future validation.
        </p>
        <TextLink href="/intelligence#privacy">
          A closer look at local-first
        </TextLink>
      </section>
      <section className="longevity section">
        <span className="giant-number" aria-hidden="true">
          LONG
          <br />
          EVITY.
        </span>
        <div>
          <Eyebrow>THINKING BEYOND THE NEXT UPGRADE</Eyebrow>
          <h2>
            Designed to matter.
            <br />
            Intended to last.
          </h2>
          <p>
            We’re exploring serviceable construction, considered material
            choices, and long-term software support. Longevity is a design
            ambition, with commitments to be defined after engineering
            validation.
          </p>
          <TextLink href="/design#longevity">Read our approach</TextLink>
        </div>
      </section>
      <section className="section roadmap">
        <Eyebrow>FROM VISION TO REALITY</Eyebrow>
        <div className="section-heading">
          <h2>
            Good things
            <br />
            take consideration.
          </h2>
          <p>
            No countdowns. No promises before proof. A transparent view of the
            work ahead.
          </p>
        </div>
        <div className="roadmap-grid">
          {[
            [
              "01",
              "Concept exploration",
              "Current phase",
              "Product family, industrial design, and experience direction.",
            ],
            [
              "02",
              "Engineering validation",
              "Planned",
              "Architecture, feasibility, prototyping, and compatibility testing.",
            ],
            [
              "03",
              "Pilot & refinement",
              "Future ambition",
              "Usability research, reliability, and manufacturing evaluation.",
            ],
            [
              "04",
              "Availability",
              "Not announced",
              "Release decisions only after validation. No launch date is set.",
            ],
          ].map(([n, t, s, d]) => (
            <div key={n}>
              <span>{n}</span>
              <p className="eyebrow">{s}</p>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <AccessCTA />
    </>
  );
}
function Products() {
  const [filter, setFilter] = useState("All");
  return (
    <>
      <section className="section page-intro">
        <Eyebrow>THE Profectus360 ECOSYSTEM</Eyebrow>
        <h1>
          Objects of purpose.
          <br />
          <em>A home in harmony.</em>
        </h1>
        <p>
          Five concepts. A shared design language. Explore a more considered
          relationship with the technology around you.
        </p>
        <div className="catalog-toolbar">
          <div role="group" aria-label="Filter product concepts">
            {["All", ...products.map((p) => p.category)].map((c) => (
              <button
                key={c}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <a href="#compare">
            Compare concepts <Layers3 size={16} />
          </a>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => filter === "All" || p.category === filter)
            .map((p) => (
              <ProductCard key={p.id} product={p} index={products.indexOf(p)} />
            ))}
        </div>
        <p className="fine-print">
          All products are concepts. Specifications and INR pricing are
          indicative targets, subject to change.
        </p>
      </section>
      <Comparison />
      <AccessCTA />
    </>
  );
}
function Gallery({ product }: { product: Product }) {
  const [view, setView] = useState("beauty");
  const [modal, setModal] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const views = ["beauty", "rear", "macro", "studio", "lifestyle", "exploded"];
  useEffect(() => {
    if (modal) dialog.current?.showModal();
    else dialog.current?.close();
  }, [modal]);
  return (
    <section className="section gallery-section">
      <Eyebrow>STUDIES IN FORM</Eyebrow>
      <div className="section-heading">
        <h2>
          Every angle.
          <br />
          Every intention.
        </h2>
        <p>
          AI-generated concept imagery and original 3D design studies.
          Engineering details are illustrative.
        </p>
      </div>
      <button
        ref={trigger}
        className="gallery-main"
        aria-label="Open fullscreen concept gallery"
        onClick={() => setModal(true)}
      >
        <ProductImage id={product.id} view={view} />
        <span>
          Explore fullscreen <ArrowUpRight size={18} />
        </span>
      </button>
      <div
        className="gallery-tabs"
        role="group"
        aria-label="Concept image views"
      >
        {views.map((v) => (
          <button aria-pressed={view === v} key={v} onClick={() => setView(v)}>
            {v}
          </button>
        ))}
      </div>
      {modal && (
        <dialog
          className="gallery-dialog"
          ref={dialog}
          onCancel={() => {
            setModal(false);
            trigger.current?.focus();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModal(false);
              trigger.current?.focus();
            }
          }}
        >
          <div>
            <button
              className="dialog-close icon-button"
              aria-label="Close gallery"
              onClick={() => {
                setModal(false);
                trigger.current?.focus();
              }}
            >
              <X />
            </button>
            <ProductImage id={product.id} view={view} />
            <div className="dialog-controls">
              <button
                aria-label="Previous view"
                onClick={() =>
                  setView(
                    views[
                      (views.indexOf(view) + views.length - 1) % views.length
                    ],
                  )
                }
              >
                <ChevronLeft />
              </button>
              <p>
                {product.name} / {view} concept study
              </p>
              <button
                aria-label="Next view"
                onClick={() =>
                  setView(views[(views.indexOf(view) + 1) % views.length])
                }
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
function ProductPage({ product: p }: { product: Product }) {
  const [finish, setFinish] = useState("Silver");
  const [view3d, setView3d] = useState(false);
  return (
    <>
      <section className={"product-hero product-" + p.id}>
        <div>
          <Eyebrow>
            Profectus360 {p.name.toUpperCase()} / {p.category.toUpperCase()}{" "}
            CONCEPT
          </Eyebrow>
          <h1>{p.tagline}</h1>
          <p>{p.description}</p>
          <div className="product-price">
            ₹{p.price}
            <span>
              Indicative price target
              <br />
              In development · not for sale
            </span>
          </div>
          <LinkButton href={"/early-access?product=" + p.id}>
            Express interest in {p.name}
          </LinkButton>
        </div>
        <ProductImage id={p.id} eager />
      </section>
      <section className="section feature-editorial">
        <Eyebrow>THOUGHTFULLY CONNECTED</Eyebrow>
        <h2>
          Designed around
          <br />
          the way you live.
        </h2>
        <div>
          {p.features.map((f, i) => (
            <Reveal key={f}>
              <span>0{i + 1}</span>
              <h3>{f}</h3>
              <p>
                {
                  [
                    "A capability we are exploring to make everyday interactions feel more natural.",
                    "Part of a connected architecture, subject to engineering and compatibility validation.",
                    "An experience target. Final behavior will be defined through prototyping and testing.",
                  ][i]
                }
              </p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="viewer-section section">
        <div>
          <Eyebrow>A CLOSER LOOK</Eyebrow>
          <h2>Find your perspective.</h2>
          <p>
            Explore an original, simplified 3D model. Rotate with a pointer or
            arrow keys. Finishes are design explorations.
          </p>
          <div
            className="finish-options"
            role="group"
            aria-label="Concept finish"
          >
            {["Silver", "Graphite"].map((f) => (
              <button
                key={f}
                aria-pressed={finish === f}
                onClick={() => {
                  setFinish(f);
                  setView3d(true);
                }}
              >
                <i className={f.toLowerCase()} />
                {f}
              </button>
            ))}
          </div>
          {!view3d && (
            <button className="button" onClick={() => setView3d(true)}>
              Explore in 3D <ArrowUpRight size={16} />
            </button>
          )}
          <span className="fine-print">
            Interactive design study / Not an engineering model
          </span>
        </div>
        <div className="viewer-container">
          {view3d ? (
            <Suspense
              fallback={
                <div className="viewer-loading">
                  Preparing your perspective…
                </div>
              }
            >
              <Viewer id={p.id} finish={finish} />
            </Suspense>
          ) : (
            <ProductImage id={p.id} view="studio" />
          )}
        </div>
      </section>
      <Gallery product={p} />
      <section className="section specs">
        <div>
          <Eyebrow>ENGINEERING INTENT</Eyebrow>
          <h2>
            The details.
            <br />
            As imagined.
          </h2>
          <p>
            Proposed specifications, subject to feasibility studies and change.
            No performance or certification claims.
          </p>
        </div>
        <dl>
          {p.specs.map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="section faq-section">
        <div>
          <Eyebrow>A FEW GOOD QUESTIONS</Eyebrow>
          <h2>Before you wonder.</h2>
        </div>
        <FAQ
          items={[
            [
              `Can I buy Profectus360 ${p.name}?`,
              "No. This is an early-stage product concept. There is no checkout, preorder, reservation, or announced release date.",
            ],
            [
              "Are these final specifications?",
              "No. All features, dimensions, connectivity goals, and pricing are provisional design targets. They require engineering validation.",
            ],
            [
              "Are the images real product photographs?",
              "No. Beauty, material, and selected lifestyle images are AI-generated concept renders. Remaining views and the interactive viewer are simplified original 3D design studies. None represent manufactured prototypes.",
            ],
            [
              "Will this work with my existing devices?",
              "Compatibility is a goal, not a confirmed capability. Supported platforms and device categories will be announced only after implementation and testing.",
            ],
          ]}
        />
      </section>
      <Comparison />
      <AccessCTA />
    </>
  );
}
function Intelligence() {
  return (
    <>
      <section className="section page-intro">
        <Eyebrow>Profectus360 INTELLIGENCE</Eyebrow>
        <h1>
          A home that finds
          <br />
          <em>your rhythm.</em>
        </h1>
        <p>
          A vision of technology that responds thoughtfully to everyday life.
          Try a simulated routine and explore the possibilities.
        </p>
      </section>
      <section className="section simulator-page">
        <Simulator />
        <p className="fine-print">
          Browser simulation only. Values are illustrative, no real sensors or
          devices are connected, and no measured energy or air-quality benefit
          is claimed.
        </p>
      </section>
      <section className="section intelligence-principles">
        <Eyebrow>HELPFUL BY INTENTION</Eyebrow>
        <h2>
          Little moments.
          <br />
          Thoughtfully connected.
        </h2>
        <div className="editorial-columns">
          {[
            [
              "Context before commands",
              "We are exploring routines that could respond to presence, light, and the flow of a day. You should remain in control.",
            ],
            [
              "A shared language",
              "Matter and Thread integration targets aim to reduce ecosystem boundaries. Certified compatibility is not yet established.",
            ],
            [
              "Choice at the center",
              "A routine should be understandable and easy to adjust. AI-assisted suggestions are an ambition, with final behavior still to be designed.",
            ],
          ].map(([title, copy]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="dark-section section privacy-detail" id="privacy">
        <Eyebrow>LOCAL FIRST. HUMAN ALWAYS.</Eyebrow>
        <h2>
          The most personal place
          <br />
          deserves personal control.
        </h2>
        <div className="editorial-columns">
          <div>
            <LockKeyhole />
            <h3>Keep decisions close</h3>
            <p>
              The goal is for ordinary routines to run on Core within your home.
              Offline behavior will depend on the final architecture.
            </p>
          </div>
          <div>
            <Cpu />
            <h3>Collect with purpose</h3>
            <p>
              Minimal data, understandable permissions, and clear retention
              controls are product design goals. No hardware telemetry is
              collected by this site.
            </p>
          </div>
          <div>
            <Radio />
            <h3>Connect by choice</h3>
            <p>
              Optional cloud features may need connectivity and separate
              disclosures. This website’s actual data handling is described in
              its privacy notice.
            </p>
          </div>
        </div>
        <TextLink href="/privacy">Read the website privacy notice</TextLink>
      </section>
      <AccessCTA />
    </>
  );
}
function Design() {
  return (
    <>
      <section className="section page-intro">
        <Eyebrow>THE Profectus360 DESIGN LANGUAGE</Eyebrow>
        <h1>
          Quiet by nature.
          <br />
          <em>Considered by design.</em>
        </h1>
        <p>
          Objects that belong. Interfaces that make sense. Technology that
          leaves room for life.
        </p>
      </section>
      <div className="wide-image">
        <ProductImage id="core" view="macro" />
      </div>
      <section className="section numbered-editorial">
        {[
          [
            "01",
            "A shared silhouette.",
            "Soft corners, restrained proportions, and a continuous material language give the five concepts a common identity. Each form still serves a different role.",
          ],
          [
            "02",
            "Materials with intention.",
            "Bead-blasted aluminum, tactile textures, and warm light are our current material direction. Processes, tolerances, and final material composition remain to be evaluated.",
          ],
          [
            "03",
            "An interface you can feel.",
            "A turn. A press. A small change in light. We are exploring familiar gestures and calm feedback instead of adding another screen to every moment.",
          ],
        ].map(([n, title, copy]) => (
          <Reveal key={n}>
            <span>{n}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </Reveal>
        ))}
      </section>
      <section className="design-story">
        <ProductImage id="control" view="lifestyle" />
        <div className="design-copy">
          <Eyebrow>HUMAN SCALE</Eyebrow>
          <h2>
            Made for the
            <br />
            spaces between.
          </h2>
          <p>
            A bedside table. A shelf. A familiar corner. Our concepts are
            imagined as part of the home, with a presence that feels deliberate
            rather than demanding.
          </p>
          <span className="image-credit">
            ILLUSTRATIVE LIFESTYLE DESIGN STUDY
          </span>
        </div>
      </section>
      <section className="section longevity-detail" id="longevity">
        <Eyebrow>LONGEVITY AS A DESIGN QUESTION</Eyebrow>
        <h2>
          A longer view.
          <br />A more thoughtful future.
        </h2>
        <div className="editorial-columns">
          <div>
            <h3>Serviceability</h3>
            <p>
              We intend to evaluate repair access and replaceable components. No
              repair program or spare-parts commitment exists yet.
            </p>
          </div>
          <div>
            <h3>Responsible materials</h3>
            <p>
              Recycled content and lower-impact packaging are research goals. We
              make no verified sustainability claim.
            </p>
          </div>
          <div>
            <h3>Software over time</h3>
            <p>
              Security updates and support life should be considered from the
              beginning. A support period will be defined before any product
              launch.
            </p>
          </div>
        </div>
      </section>
      <AccessCTA />
    </>
  );
}
function Story() {
  return (
    <>
      <section className="section story-intro">
        <Eyebrow>OUR STORY IS JUST BEGINNING</Eyebrow>
        <h1>
          From India.
          <br />
          For a more
          <br />
          <em>thoughtful home.</em>
        </h1>
        <p>
          Profectus360 is an early-stage Indian consumer technology concept. An
          exploration of beautifully engineered objects and privacy-conscious
          intelligence.
        </p>
      </section>
      <section className="dark-section section story-manifesto">
        <span className="eyebrow">THE IDEA BEHIND THE OBJECTS</span>
        <h2>
          What if connected living
          <br />
          felt a little more human?
        </h2>
        <div>
          <p>
            There is a difference between a home full of technology and
            technology that feels at home. We’re interested in the second.
          </p>
          <p>
            Our vision is a coherent family of smart-home devices that could
            simplify daily rituals, respect personal space, and bring a more
            considered design perspective to everyday electronics.
          </p>
          <p>
            We’re at the concept exploration stage. This site shares industrial
            design studies and simulated experiences. It does not announce a
            registered company, production facilities, certified hardware, or
            commercially available products.
          </p>
        </div>
      </section>
      <section className="section">
        <Eyebrow>A VISION, WITH OPEN QUESTIONS</Eyebrow>
        <div className="split-heading">
          <h2>
            Thoughtful ambition.
            <br />
            Honest progress.
          </h2>
          <p>
            For people who value considered design, useful automation, and
            meaningful control. The next steps are research, engineering
            validation, and testing the ideas in real life.
          </p>
        </div>
        <FAQ
          items={[
            [
              "What is Profectus360 today?",
              "An early-stage product concept and design exploration. Hardware and software are not commercially available.",
            ],
            [
              "Who is behind it?",
              "No founders, team biographies, or company credentials are published on this site. We will share verified information when it is ready.",
            ],
            [
              "When will the products launch?",
              "No launch date is announced. Engineering feasibility, compatibility, reliability, and manufacturing must be evaluated first.",
            ],
          ]}
        />
      </section>
      <AccessCTA />
    </>
  );
}
function Journal({ slug }: { slug?: string }) {
  const article = articles.find((a) => a.slug === slug);
  if (slug && !article) return <NotFound />;
  return article ? (
    <article className="section article">
      <a className="text-link" href="/journal">
        <ChevronLeft size={16} />
        Back to journal
      </a>
      <Eyebrow>{article.category.toUpperCase()} / CONCEPT EDITORIAL</Eyebrow>
      <h1>{article.title}</h1>
      <p className="article-deck">{article.excerpt}</p>
      <ProductImage
        id={article.category === "Design" ? "control" : "core"}
        view="macro"
      />
      {article.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <div className="article-note">
        Editorial perspective from a concept project. Product capabilities are
        ambitions, not verified specifications.
      </div>
      <TextLink href="/journal">More notes from the studio</TextLink>
    </article>
  ) : (
    <>
      <section className="section page-intro">
        <Eyebrow>NOTES FROM THE STUDIO</Eyebrow>
        <h1>
          Ideas for
          <br />
          <em>better living.</em>
        </h1>
        <p>
          Thoughts on design, privacy, and the possibilities of a more connected
          home. Concept editorials from an early-stage project.
        </p>
        <div className="journal-grid">
          {articles.map((a, i) => (
            <a href={"/journal/" + a.slug} key={a.slug}>
              <ProductImage
                id={["core", "control", "sense", "air"][i]}
                view={i % 2 ? "lifestyle" : "macro"}
              />
              <span className="eyebrow">{a.category} / CONCEPT EDITORIAL</span>
              <h2>{a.title}</h2>
              <p>{a.excerpt}</p>
              <span className="text-link">
                Read the story <ArrowUpRight size={16} />
              </span>
            </a>
          ))}
        </div>
      </section>
      <AccessCTA />
    </>
  );
}
function Access() {
  return (
    <>
      <section className="section access-page">
        <div>
          <Eyebrow>A SHARED VISION OF HOME</Eyebrow>
          <h1>
            A little interest.
            <br />
            <em>A new possibility.</em>
          </h1>
          <p>
            What does a more thoughtful connected home look like to you? Tell us
            which Profectus360 concepts you’d love to see take shape.
          </p>
          <div className="access-promises">
            <p>
              <Check size={17} />
              Your product preferences, without personal details
            </p>
            <p>
              <Check size={17} />
              No payment, preorder, or reservation
            </p>
            <p>
              <Check size={17} />
              No email signup or marketing subscription
            </p>
          </div>
          <div className="interest-editorial">
            <ProductImage id="lineup" />
            <p>FIVE CONCEPTS. ONE CONSIDERED HOME.</p>
          </div>
        </div>
        <InterestForm />
      </section>
      <section className="section faq-section">
        <h2>A little clarity.</h2>
        <FAQ
          items={[
            [
              "What happens when I express interest?",
              "Your selected product concepts are saved as anonymous feedback to help inform the project’s direction. No name or email address is requested.",
            ],
            [
              "Does expressing interest reserve a product?",
              "No. This is feedback on concepts in development, not a preorder, reservation, purchase, or guarantee of availability.",
            ],
            [
              "Will I receive emails?",
              "No. Email signup remains unavailable and no email delivery service is connected. You can follow our progress in the journal.",
            ],
            [
              "What stage is the project in?",
              "Concept exploration. Engineering validation and product availability are not announced.",
            ],
          ]}
        />
      </section>
    </>
  );
}
function Contact() {
  const [topic, setTopic] = useState("General interest");
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  function download() {
    const blob = new Blob(
      [
        `Profectus360 inquiry draft\nTopic: ${topic}\n\n${text}\n\nThis draft has not been sent.\n`,
      ],
      { type: "text/plain;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profectus360-inquiry.txt";
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
  }
  return (
    <section className="section contact-page">
      <div>
        <Eyebrow>START A CONVERSATION</Eyebrow>
        <h1>
          Good ideas begin
          <br />
          <em>with a question.</em>
        </h1>
        <p>
          A verified contact channel has not been published yet. You can prepare
          and download an inquiry locally; nothing is sent to Profectus360.
        </p>
        <TextLink href="/story">Learn about the project</TextLink>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          download();
        }}
        className="contact-form"
      >
        <h2>Prepare an inquiry</h2>
        <label htmlFor="topic">What’s on your mind?</label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            setSaved(false);
          }}
        >
          {[
            "General interest",
            "Product concepts",
            "Design & engineering",
            "Privacy question",
          ].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <label htmlFor="inquiry">Your message</label>
        <textarea
          id="inquiry"
          rows={7}
          value={text}
          maxLength={5000}
          onChange={(e) => {
            setText(e.target.value);
            setSaved(false);
          }}
          placeholder="Share your thoughts…"
          required
        />
        <p className="fine-print">
          Browser-local draft. No contact details are collected, and this
          message will not be submitted.
        </p>
        <button className="button">
          Download inquiry draft <ArrowDown size={16} />
        </button>
        {saved && (
          <p role="status" className="form-result success">
            Draft downloaded. It has not been sent.
          </p>
        )}
      </form>
    </section>
  );
}
function Legal({ type }: { type: string }) {
  const content: Record<
    string,
    { title: string; sections: [string, string][] }
  > = {
    privacy: {
      title: "Privacy notice",
      sections: [
        [
          "Scope",
          "This notice describes the Profectus360 concept website. It does not describe a released hardware product or app. Last updated: 11 October 2026.",
        ],
        [
          "Data on this website",
          "You can browse without creating an account. The site does not use advertising trackers or analytics scripts. Hosting providers may process technical request information such as IP addresses and access logs to serve and protect the site; retention is governed by the hosting provider.",
        ],
        [
          "Early interest",
          "Express interest saves your selected product concepts, a random submission receipt, a consent version, and a submission time in Cloudflare D1. It requests no name, email address, contact details, or free-text message. The receipt prevents duplicate retries and is generated in memory for each submission; it is not a persistent browser identifier. Email signup remains unavailable. No subscription, reservation, or payment is created.",
        ],
        [
          "Local storage",
          "Your selected light or dark theme is saved in your browser under profectus360-theme. No other persistent browser data is used by the site.",
        ],
        [
          "Contact drafts",
          "Inquiry text is processed in the browser and downloaded only when you request it. It is not sent to a server or persisted by the site.",
        ],
        [
          "Retention and requests",
          "Anonymous preference records older than 180 days are deleted when new submissions arrive. To limit abuse, a one-way hash of your IP address and the UTC date is used separately for rate limiting; it is never attached to your product preferences. Rate-limit entries older than one hour are cleared on subsequent submissions. The application does not save raw IP addresses. The concept site has no published operator contact channel, so email signup remains disabled.",
        ],
        [
          "Your choices",
          "You can clear the theme preference in your browser storage. Expressing interest is optional. Avoid entering sensitive information into inquiry drafts. Revisit this notice before using any future registration functionality.",
        ],
      ],
    },
    terms: {
      title: "Terms of use",
      sections: [
        [
          "The project",
          "Profectus360 is an early-stage Indian consumer technology concept. This website presents design studies, editorial perspectives, and browser simulations. It does not assert registered-company status or commercial operations.",
        ],
        [
          "Concepts and estimates",
          "Product features, dimensions, pricing in INR, connectivity, materials, and timelines are provisional. They are not offers for sale, warranties, certifications, or promises of performance. No purchase, payment, or reservation is possible here.",
        ],
        [
          "Visuals and simulations",
          "Images are original AI-generated concept renders and procedural 3D design studies, not photographs of manufactured prototypes. Demo values are illustrative and do not control physical devices.",
        ],
        [
          "Use of the site",
          "Use the site lawfully and do not abuse its forms or infrastructure. Third-party software and fonts retain their respective licenses. Repository licensing does not imply exclusive rights in AI-generated output or third-party work.",
        ],
        [
          "Changes",
          "Concepts and site content may change as exploration continues. A future commercial service would require separate terms and disclosures. Last updated: 10 October 2026.",
        ],
      ],
    },
    cookies: {
      title: "Cookies & local storage",
      sections: [
        [
          "Site cookies",
          "This application does not set advertising, analytics, or authentication cookies. Hosting or security services may use their own technical mechanisms; none are intentionally added by this frontend.",
        ],
        [
          "Theme preference",
          "We use browser local storage, not a cookie, to remember your selected theme. Key: profectus360-theme. Values: light or dark. It remains until you clear it or change your preference.",
        ],
        [
          "Forms and demos",
          "Simulator state is kept in memory and resets when you reload. Contact drafts are downloaded locally. Interest submission receipts are kept in memory only and reset when you reload; they do not track your browser across visits.",
        ],
        [
          "Managing storage",
          "Clear this site’s storage in your browser settings to reset your theme preference. No consent banner is shown because the application adds no nonessential tracking. Last updated: 10 October 2026.",
        ],
      ],
    },
  };
  const data = content[type];
  return (
    <section className="section legal-page">
      <Eyebrow>CLEAR BY INTENTION</Eyebrow>
      <h1>{data.title}</h1>
      {data.sections.map(([title, body]) => (
        <section key={title}>
          <h2>{title}</h2>
          <p>{body}</p>
        </section>
      ))}
      <TextLink href="/contact">Contact information</TextLink>
    </section>
  );
}
function NotFound() {
  return (
    <section className="section not-found">
      <Eyebrow>404 / A LITTLE OFF COURSE</Eyebrow>
      <h1>
        Let’s find
        <br />
        <em>your way home.</em>
      </h1>
      <p>This page doesn’t exist. The ecosystem is a good place to start.</p>
      <LinkButton href="/">Back to Profectus360</LinkButton>
    </section>
  );
}
export function App({ path: rawPath }: { path: string }) {
  const path = rawPath.replace(/\/$/, "") || "/";
  let page;
  const p = products.find((p) => path === "/products/" + p.id);
  if (path === "/") page = <Home />;
  else if (path === "/products") page = <Products />;
  else if (p) page = <ProductPage product={p} />;
  else if (path === "/intelligence") page = <Intelligence />;
  else if (path === "/design") page = <Design />;
  else if (path === "/story") page = <Story />;
  else if (path === "/journal" || path.startsWith("/journal/"))
    page = <Journal slug={path.split("/")[2]} />;
  else if (path === "/early-access") page = <Access />;
  else if (path === "/contact") page = <Contact />;
  else if (["/privacy", "/terms", "/cookies"].includes(path))
    page = <Legal type={path.slice(1)} />;
  else page = <NotFound />;
  return (
    <>
      <Header path={path} />
      <main id="main" tabIndex={-1}>
        {page}
      </main>
      <Footer />
    </>
  );
}
