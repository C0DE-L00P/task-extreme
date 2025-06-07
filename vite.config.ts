import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  appType: "mpa",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          "react-router": ["react-router-dom"],
          tailwind: ["tailwindcss"],
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
