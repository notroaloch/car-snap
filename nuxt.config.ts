// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  colorMode: {
    preference: 'system',
  },
  devtools: { enabled: true },
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  imports: {
    dirs: ['types', 'zod'],
  },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],
  nitro: {
    imports: {
      dirs: ['types', 'zod'],
    },
  },
  runtimeConfig: {
    autoSyncStudioApiKey: '',
    autoSyncStudioApiSource: '',
  },
});
