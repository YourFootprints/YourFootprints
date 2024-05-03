// https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts

/// <reference types="vitest" />
/// <reference types="vite/client" />

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
  test: {
    globals: true,
    environment: "jsdom",
    // this points to the setup file that we created earlier
    setupFiles: "./src/setupTests.js",
    // you might want to disable the `css: true` line, since we don't have
    // tests that rely on CSS -- and parsing CSS is slow.
    // I'm leaving it in here becasue often people want to parse CSS in tests.
    css: true,
  },
});
