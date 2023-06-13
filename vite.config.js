import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/todo-list/",
  build: {
    target: "esnext",
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@assets", replacement: "/src/assets" },
      { find: "@components", replacement: "/src/components" },
      { find: "@contexts", replacement: "/src/contexts" },
      { find: "@data", replacement: "/src/data" },
      { find: "@features", replacement: "/src/features" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@layouts", replacement: "/src/layouts" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@utils", replacement: "/src/utils" },
    ],
  },
});
