// vitest.config.ts
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.js";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      base: "__test__",
      coverage: {
        reporter: ["text", "json", "html"],
        reportsDirectory: "__tests__/coverage",
      },
    },
  })
);
