import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

const Dotenv = require("dotenv-webpack");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), legacy(), new Dotenv()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
