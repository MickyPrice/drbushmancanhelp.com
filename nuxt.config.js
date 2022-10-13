export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Dr. Bushman • Dr. Bushman can help!',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },

      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-title', property: 'og:title', content: 'Dr Bushman Can Help' },
      { hid: 'og-desc', property: 'og:description', content: 'Have a friend with a face longer than it should be? Dr Bushman Can Help!' },
      { hid: 'og-image', property: 'og:image',
        content: 'https://www.drbushmancanhelp.com/dr_bushman_can_help_social_image.png'
      },
      { hid: 'og-url', property: 'og:url', content: 'https://www.drbushmancanhelp.com' },
      { hid: 'author', content: 'Michael Price - michaelprice.co.nz' },
      { hid: 't-type', name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Preload Audio
      { rel: 'preload', type: 'audio/mp3', as: "audio", href: "/mp3/1_what_seems_to_be_the_problem.mp3" },
      { rel: 'preload', type: 'audio/mp3', as: "audio", href: "/mp3/2_ok_im_sorry_to_hear_than.mp3" },
      { rel: 'preload', type: 'audio/mp3', as: "audio", href: "/mp3/3_please_answer_these_simple_questions.mp3" },
      { rel: 'preload', type: 'audio/mp3', as: "audio", href: "/mp3/4_is_he_breathing.mp3" },
      { rel: 'preload', type: 'audio/mp3', as: "audio", href: "/mp3/5_does_he_have_a_history.mp3" },
      { rel: 'preload', type: 'audio/mp3', as: "audio", href: "/mp3/6_ok_great_would_he_be_surprised.mp3" },
      { rel: 'preload', type: 'audio/mp3', as: "audio", href: "/mp3/7_final_question_worm_in_his_brain.mp3" },
      { rel: 'preload', type: 'audio/mp3', as: "audio", href: "/mp3/8_ready_to_diaganose.mp3" },
      { rel: 'preload', type: 'audio/mp3', as: "audio", href: "/mp3/9_thank_you_for_visiting.mp3" },
      { rel: 'preload', type: 'audio/mp3', as: "audio", href: "/mp3/10_out.mp3" },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  env: {
    apiKey: process.env.apiKey,
    // authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    // storageBucket: process.env.storageBucket,
    // messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.apiKey,
          // authDomain: process.env.authDomain,
          projectId: process.env.projectId,
          // storageBucket: process.env.storageBucket,
          // messagingSenderId: process.env.messagingSenderId,
          appId: process.env.apiKey,
          measurementId: process.env.measurementId
        },
        services: {
          firestore: true
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
