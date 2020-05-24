export const state = () => ({
  modules: [],
  pages: []
})

export const mutations = {
  setModules(state, list) {
    console.log('setting modules')
    console.log(list)
    state.modules = list
  },

  setPages(state, list) {
    console.log('setting pages')
    console.log(list)
    state.pages = list
  }
}

// export const actions = {
//   async nuxtServerInit({ commit }) {
//     let files = await require.context(
//       '~/assets/content/_pages/',
//       false,
//       /\.json$/
//     )
//     let pages = files.keys().map(key => {
//       let res = files(key)
//       res.slug = key.slice(2, -5)
//       return res
//     })
//     await commit('setPages', pages)
//   }
// }


export const actions = {
  async nuxtServerInit({ commit }) {
    let files = await require.context(
      '~/assets/content/_modules/',
      false,
      /\.json$/
    )
    let modules = files.keys().map(key => {
      let res = files(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setModules', modules)
  }
}


// export const state = () => ({
//   blogPosts: [],
// });

// export const mutations = {
//   setBlogPosts(state, list) {
//     state.blogPosts = list;
//   },
// };

// export const actions = {
//   async nuxtServerInit({ commit }) {
//     let files = await require.context('~/assets/content/blog/', false, /\.json$/);
//     let blogPosts = files.keys().map(key => {
//       let res = files(key);
//       res.slug = key.slice(2, -5);
//       return res;
//     });
//     await commit('setBlogPosts', blogPosts);
//   },
// };
