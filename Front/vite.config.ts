import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Détection automatique de l'environnement
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProduction ? "/OTennis/" : "/", // GitHub Pages en prod, chemin classique en local
  plugins: [react()],
});
