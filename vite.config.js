import { defineConfig } from "vite";
import { pluginAPIRoutes } from "vite-plugin-api-routes";
import pluginReact from "@vitejs/plugin-react-swc";

const htmlPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return html.replace("__BUILD_TIME__", new Date().toISOString());
    },
  };
};
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    outDir: "dist/public",
  },
  plugins: [
    htmlPlugin(),
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
