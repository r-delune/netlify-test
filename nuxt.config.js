require('dotenv').config({ path: './.env' })
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Auto-generate custome routes
  */
  generate: {
    routes: function () {
      const fs = require('fs');
      const path = require('path');
      return fs.readdirSync('./assets/content/_pages').map(file => {
        return {
          route: `/page/${path.parse(file).name}`, // Return the slug
          payload: require(`./assets/content/_pages/${file}`),
        };
      });
    },
  },
  /*
   ** External js plugins
  */
  plugins: [
    { src: '@/plugins/vue-draggeable.js', ssr: false },
    { src: '@/plugins/youtube-embed.js', ssr: false },
    { src: '@/plugins/vue-charts.js', mode: 'client' }
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/assets/styles/transitions.css', lang: 'css' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-analytics', {
      id: 'UA-165087681-1'
    }]],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/markdownit'],
  /*
   ** Render markdown
   */
  markdownit: {
    injected: true
  },
  /*
   ** Create axios requests to backend
   */
  axios: {
    debug: false,
    credentials: true,
    //proxy: true,
    //https: true
  },
  /*
  ** Authentication interface with API
  */
  auth: {
    plugins: ['~/plugins/auth.js'],
    redirect: {
      login: '/login',
      logout: '/',
      callback: false,
      home: '/'
    },
    strategies: {
      'laravel.passport': {
        redirect: false,
        url: process.env.BASE_API,
        client_id: process.env.PASSWORD_GRANT_ID,
        client_secret: process.env.PASSWORD_GRANT_SECRET,
      },
      // User authentication
      local: {
        endpoints: {
          login: { url: process.env.BASE_API + '/auth/login_profile', method: 'POST', propertyName: 'access_token' },
          user: { url: process.env.BASE_API + '/auth/profile', method: 'GET', propertyName: 'user' },
          logout: { url: process.env.BASE_API + '/auth/profile_logout', method: 'GET' }
        },
        // tokenRequired:true,
        client_id: process.env.PASSWORD_GRANT_ID,
        client_secret: process.env.PASSWORD_GRANT_SECRET,
      },
      // Admin authentication
      local2: {
        _scheme: 'local',
        endpoints: {
          login: { url: process.env.BASE_API + '/auth/admin_login', method: 'POST' },
          user: { url: process.env.BASE_API + '/auth/admin', method: 'GET', propertyName: 'user' },
          logout: { url: process.env.BASE_API + '/auth/admin_logout', method: 'GET' }
        },
        tokenRequired: true,
        client_id: process.env.PASSWORD_GRANT_ID,
        client_secret: process.env.PASSWORD_GRANT_SECRET,
      }
    }
  },
  /*
   ** Environment variables
   */
  env: {
    baseURL: process.env.BASE_URL || 'http://localhost:8000',
    baseAPI: process.env.BASE_API || 'http://localhost:8000/api'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  }
}
