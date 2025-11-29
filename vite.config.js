import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // If the mode is 'gh-pages', use the repo name. Otherwise (Vercel), use root.
    base: mode === "gh-pages" ? "/food-delivery-app/" : "/",
  };
});
