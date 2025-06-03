// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/image', '@nuxt/icon', '@nuxt/fonts', '@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@pinia/nuxt', '@primevue/nuxt-module', '@nuxtjs/i18n'],
  i18n: {
    // Estrategia: sin prefijo para el default, con prefijo para el resto
    strategy: 'prefix_except_default',

    // Default es España (sin prefijo en URL)
    defaultLocale: 'es',

    // Configuración de segmentos
    locales: [
      {
        code: 'es',
        iso: 'es-ES',
        name: 'España'
      },
      {
        code: 'ar',
        iso: 'es-AR',
        name: 'Argentina'
      },
      {
        code: 'mx',
        iso: 'es-MX',
        name: 'México'
      },
      {
        code: 'us',
        iso: 'en-US',
        name: 'United States'
      }
    ],

    // Deshabilitar detección automática para control total
    detectBrowserLanguage: false,

    // Configuración para eliminar warning
    bundle: {
      optimizeTranslationDirective: false
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/callback',
      exclude: [
        '/login',
        '/register',
        '/forgot-password',
        '/forgot-password-confirmation',
        '/reset-password',
      ]
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      secure: process.env.NODE_ENV === 'production'
    },
    clientOptions: {
      auth: {
        persistSession: true,
        detectSessionInUrl: true,
      }
    }
  },
  // Fonts
  // Pre load
  primevue: {
    components: {
      include: [
        'Toast', 'Button', 'Dialog', 'InputText', 'Password', 'ProgressSpinner', 'Drawer', 'FileUpload', 'Dropdown', 'InputSwitch', 'InputNumber', 'Textarea'
      ]
    },
    options: {
      ripple: false,
      unstyled: false
    }
  },
  icon: {
    size: '1rem',
    class: 'tablerIcon',
    serverBundle: {
      collections: ['tabler'],
    }
  },
  vite: {
    optimizeDeps: {
      include: ['pinia']
    },
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
    },
    server: {
      fs: {
        strict: false
      }
    }
  },
  experimental: {
    payloadExtraction: true,
    crossOriginPrefetch: true,
    viewTransition: true,
    componentIslands: true
  },
})