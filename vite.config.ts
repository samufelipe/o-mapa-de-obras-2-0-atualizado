import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // Multi-page: natal.html tem meta tags (title/OG/description) proprias
      // pro dominio cronogramadenatal.inovandonasuaobra.com.br, servido via
      // rewrite condicionado por host no vercel.json. O React app montado
      // (main.tsx/App.tsx) e o mesmo em ambos, so o <head> muda.
      input: {
        main: path.resolve(__dirname, "index.html"),
        natal: path.resolve(__dirname, "natal.html"),
      },
    },
  },
}));
