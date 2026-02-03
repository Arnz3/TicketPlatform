// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/hints'],
  css: ['~/assets/css/main.css'],
  plugins: [
      'plugins/1.firebase.client',
  ],
  ui: {
    colorMode: false,
    fonts: false
  },
  runtimeConfig: {
    public: {
      FIREBASE_CONFIG: JSON.parse(
        process.env.NUXT_PUBLIC_FIREBASE_CONFIG!
      ),
      dev: process.env.NODE_ENV !== 'production'
    },
  },
})