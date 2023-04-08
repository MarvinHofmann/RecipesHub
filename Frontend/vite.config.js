import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'inline',
    mode: "development",
    base: "/",
    srcDir: "src",
    filename: "sw.js",
    includeAssets: ["/icons/icon-192.png"],
    workbox: {
      cleanupOutdatedCaches: true,
      globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}']
    },
    devOptions: {
      enabled: true
    },
    manifest: {
      name: "RecipeHub",
      short_name: "Test",
      description: "RecipeHub ist eine Web APP um Rezepte zu verwalten",
      theme_color: "#000000",
      start_url: "/",
      display: "standalone",
      background_color: "#000000",
      icons: [
        {
          src: "/icons/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  }),
  ],
})
