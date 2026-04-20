import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/avac-horizons/", // ✅ VERY IMPORTANT FOR GITHUB PAGES

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  optimizeDeps: {
    include: ["d3-geo", "topojson-client"],
  },

  server: {
    port: 5173,
    open: true,
  },
});