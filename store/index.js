export const state = () => ({
  page_data: [],
})

export const actions = {
  // render all static pages to route
  async nuxtServerInit({ commit }) {
    let files = await require.context(
      '~/assets/content/_pages/',
      false,
      /\.json$/
    )
    let page_data = files.keys().map(key => {
      let res = files(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setPages', page_data)
  },
}

export const mutations = {
  setPages(state, list) {
    state.page_data = list
  }
}