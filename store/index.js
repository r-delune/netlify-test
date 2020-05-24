export const state = () => ({
  modules: []
})

export const mutations = {
  setModule(state, list) {
    state.modules = list
  }
}

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
    await commit('setModule', modules)
  }
}