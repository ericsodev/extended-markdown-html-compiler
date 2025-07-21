import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  test: {
    watch: false,
    environment: "node",
    globals: true,
    include: ["**/*.test.ts"],
  },
  globals: true,
  watch: false,
});
