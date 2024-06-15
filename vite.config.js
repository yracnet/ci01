import { defineConfig } from "vite";
import { pluginAPIRoutes } from "vite-plugin-api-routes";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    outDir: "dist/public",
  },
  plugins: [
    pluginAPIRoutes({
      routeBase: "api",
      dirs: [
        {
          dir: "src/api-books",
          route: "books",
        },
      ],
      outDir: "dist",
    }),
  ],
});
