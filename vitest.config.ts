import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    passWithNoTests: true,
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "dist"],
  },
});
