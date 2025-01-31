import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures correct routing on Vercel
  server: {
    proxy: {
      "/api": {
        target: "https://image-system-backend.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
