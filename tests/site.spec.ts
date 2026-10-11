import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes, products } from "../src/data";
test("all routes, images, internal links, and metadata", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes.filter((r) => r != "/404")) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((imgs) =>
            imgs.every(
              (i) =>
                (i as HTMLImageElement).complete &&
                (i as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    expect(
      await page.locator("meta[name=description]").getAttribute("content"),
    ).toBeTruthy();
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((as) =>
        as
          .map((a) => a.getAttribute("href"))
          .filter(
            (h): h is string => !!h && h.startsWith("/") && !h.includes("#"),
          ),
      );
    for (const href of new Set(hrefs)) {
      const r = await request.get(href);
      expect(r.status(), href).toBe(200);
    }
  }
  expect(errors).toEqual([]);
});
test("responsive layouts at all requested widths", async ({ page }) => {
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/products",
      "/products/core",
      "/intelligence",
      "/early-access",
      "/contact",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
    await page.goto("/");
    await page.screenshot({
      path: `artifacts/home-${width}.png`,
      fullPage: true,
    });
  }
});
test("catalog filters and comparison selection", async ({ page }) => {
  await page.goto("/products");
  await page.getByRole("button", { name: "Sensor", exact: true }).click();
  await expect(page.locator(".product-grid .product-card")).toHaveCount(1);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".product-grid .product-card")).toHaveCount(5);
  await page.getByLabel("Air", { exact: true }).check();
  await expect(page.locator("thead")).toContainText("Air");
  await page.getByLabel("Core", { exact: true }).uncheck();
  await expect(page.locator("thead")).not.toContainText("Core");
});
test("every product gallery, FAQ, finish and 3D viewer", async ({ page }) => {
  for (const p of products) {
    await page.goto("/products/" + p.id);
    await page.getByRole("button", { name: "rear", exact: true }).click();
    await expect(page.locator(".gallery-main img")).toHaveAttribute(
      "src",
      new RegExp(p.id + "-rear"),
    );
    await page
      .getByRole("button", { name: "Open fullscreen concept gallery" })
      .click();
    await expect(page.locator("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Next view" }).click();
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog")).toHaveCount(0);
    await page
      .getByRole("button", { name: `Can I buy Profectus360 ${p.name}?` })
      .click();
    await expect(page.locator("#faq-0")).toBeVisible();
    await page.getByRole("button", { name: "Graphite", exact: true }).click();
    await expect(page.locator("canvas")).toBeVisible();
    await page.locator("canvas").focus();
    await page.keyboard.press("ArrowRight");
  }
});
test("scene simulation and lighting controls", async ({ page }) => {
  await page.goto("/intelligence");
  await page.getByRole("button", { name: "Movie night", exact: true }).click();
  await expect(page.locator(".room-status")).toContainText("Cinema scene");
  await expect(page.getByRole("slider")).toHaveValue("18");
  await page.getByRole("slider").fill("50");
  await expect(page.locator(".light-control")).toContainText("50%");
  await page.getByRole("button", { name: "Lighting on" }).click();
  await expect(page.locator(".light-control")).toContainText("0%");
  await page.getByRole("button", { name: "Night mode", exact: true }).click();
  await expect(page.locator(".room-status")).toContainText("Rest easy");
});
test("mobile navigation, focus return and theme persistence", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Intelligence" })
    .click();
  await expect(page).toHaveURL(/intelligence/);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
test("unavailable signup is transparent; local contact draft downloads", async ({
  page,
}) => {
  await page.goto("/early-access");
  await expect(
    page.getByText("Email signup remains unavailable.", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Email address" }),
  ).toHaveCount(0);
  await page.goto("/contact");
  await page.getByLabel("Your message").fill("A question about the concept.");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download inquiry draft" }).click();
  expect((await downloadPromise).suggestedFilename()).toBe(
    "profectus360-inquiry.txt",
  );
  await expect(page.getByRole("status")).toContainText("It has not been sent.");
});
test("accessible primary pages in light and dark themes", async ({ page }) => {
  // Forty full-page audits need a longer allowance on a busy development machine.
  test.setTimeout(180000);
  for (const route of routes.filter((r) => r !== "/404")) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  for (const route of routes.filter((r) => r !== "/404")) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const dark = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      dark.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      route + " dark",
    ).toEqual([]);
  }
});
test("404, reduced motion, and keyboard skip link", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "your way home",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("Express interest preselects a product, validates, recovers from errors and saves to D1", async ({
  page,
  request,
}) => {
  await page.goto("/products/sense");
  await page.getByRole("link", { name: "Express interest in Sense" }).click();
  await expect(page).toHaveURL(/early-access\/?\?product=sense/);
  await expect(
    page.getByRole("checkbox", { name: "Sense", exact: true }),
  ).toBeChecked();
  await page.getByRole("checkbox", { name: "Sense", exact: true }).uncheck();
  await page.getByRole("checkbox", { name: /I agree to send/ }).check();
  await page
    .getByRole("button", { name: "Express interest", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Choose at least one product",
  );
  await page.getByRole("checkbox", { name: "Core", exact: true }).check();
  await page.getByRole("checkbox", { name: "Light", exact: true }).check();
  await page.route("**/api/interest", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        saved: false,
        message: "Temporarily unavailable. Please try again.",
      }),
    }),
  );
  await page
    .getByRole("button", { name: "Express interest", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Please try again");
  await expect(
    page.getByRole("checkbox", { name: "Core", exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole("heading", { name: "Interest recorded." }),
  ).toHaveCount(0);
  await page.unroute("**/api/interest");
  const status = await request.get("/api/status");
  expect(
    (await status.json()).interest,
    "Run with wrangler pages dev to exercise real D1 storage",
  ).toBe(true);
  const responsePromise = page.waitForResponse(
    (r) => r.url().endsWith("/api/interest") && r.request().method() === "POST",
  );
  await page
    .getByRole("button", { name: "Express interest", exact: true })
    .click();
  const response = await responsePromise;
  expect(response.status()).toBe(200);
  expect((await response.json()).saved).toBe(true);
  await expect(page.getByRole("status")).toContainText(
    "Your interest has been recorded",
  );
  await expect(page.locator(".interest-tags")).toContainText("Core");
  await expect(page.locator(".interest-tags")).toContainText("Light");
  await expect(page.getByRole("textbox")).toHaveCount(0);
  await expect(
    page.getByRole("textbox", { name: "Email address" }),
  ).toHaveCount(0);
});
