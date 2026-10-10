import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  testMatch: "**/*.spec.ts",
  timeout: 60000,
  workers: 2,
  use: {
    baseURL: process.env.TEST_URL || "http://127.0.0.1:4173",
    trace: "retain-on-failure",
  },
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
});
