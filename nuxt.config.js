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
  plugins: [,
    '@/plugins/vue-draggeable.js',
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
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
