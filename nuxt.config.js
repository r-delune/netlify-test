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
      // return fs.readdirSync('./assets/content/_modules').map(file => {
      //   return {
      //     route: `/module/${path.parse(file).name}`, // Return the slug
      //     payload: require(`./assets/content/_modules/${file}`),
      //   };
      // });
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
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/markdownit'],
  markdownit: {
    injected: true
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
