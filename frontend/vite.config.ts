import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import million from "million/compiler";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), react(), svgr()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
    ],
  },
});
