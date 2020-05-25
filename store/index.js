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
    await commit('setPageData', page_data)
  },
}

export const mutations = {
  setPageData(state, list) {
    state.page_data = list
  }
}

export const getters = {
  getNextPage(state) {
    return state.current_module
  }
}
