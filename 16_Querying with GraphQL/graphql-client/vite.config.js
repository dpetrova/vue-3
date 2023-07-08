import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import graphql from "@rollup/plugin-graphql"; // rollup graphql plugin (to can load queries from external .gql files that can be imported directly into any component)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), graphql()],
});
