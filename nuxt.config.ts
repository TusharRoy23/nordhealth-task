// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: {
    enabled: process.env.DEV_TOOLS_ENABLED === "true",
  },

  typescript: {
    typeCheck: true,
    strict: true,
  },

  ssr: false,
  nitro: {
    preset: "static",
  },
  css: ["@provetcloud/css"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  modules: ["@nuxt/eslint"],
});
