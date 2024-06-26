import { defineConfig } from "vite";
// import { resolve } from "path";
import { name as pkgName } from './package.json';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    emptyOutDir: true,
  },
  base: process.env.NODE_ENV === "production" ? `${pkgName}` : "/",
  server: {
    port: 3000,
    host: true,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
      hashPrefix: "prefix",
    },
    preprocessorOptions: { less: { javascriptEnabled: true } },
  },
});
