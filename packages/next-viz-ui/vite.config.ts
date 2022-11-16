import path from "path";
import { VitePluginNode } from "vite-plugin-node";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const current = fileURLToPath(import.meta.url);
const root = path.dirname(current);

export default defineConfig({
  plugins: [
    VitePluginNode({
      adapter: "express",
      appPath: "./src/index.ts",
    }),
  ],
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime"],
  },
  build: {
    lib: {
      entry: path.resolve(root, "src/index.ts"),
      name: "next-viz-ui",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["express", "react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          vite: "vite",
          express: "express",
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime.js",
          fs: "fs",
          path: "path",
          url: "url",
        },
      },
    },
  },
});
