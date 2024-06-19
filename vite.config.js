import { defineConfig } from "vite";
import { pluginAPIRoutes } from "vite-plugin-api-routes";
import pluginReact from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    outDir: "dist/public",
  },
  define: {
    "process.env.BUILD_TIME": JSON.stringify(new Date().toLocaleString()),
  },
  plugins: [
    pluginReact(),
    pluginAPIRoutes({
      routeBase: "api",
      dirs: [
        {
          dir: "src/api-books",
          route: "books",
        },
      ],
      outDir: "dist/server",
    }),
  ],
});
