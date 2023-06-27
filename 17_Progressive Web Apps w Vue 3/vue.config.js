const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // here place config for pwa (see them after buld in dist/manifest.json)
  pwa: {
    name: "TODO-vue3-pwa",
  },
});
