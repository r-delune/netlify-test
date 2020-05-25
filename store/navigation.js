export const state = () => ({
    menu_items: []
})

export const mutations = {
    setNavigationData(state, json) {
        state.tree = json
    },
    setMenuItems(state, user_type) {
        let menu_items = []

        // get all module information
        let tree = require(`assets/module-info.json`)

        // set the available path based on user type
        tree.module_data.forEach(function (module) {
            if (user_type in module) {
                menu_items.push(module)
            }
        });
        state.menu_items = menu_items
    },
}

export const actions = {
    // load the decison tree
    async fetchNavigationData({ commit }) {
        // Load the decision tree into state
        let tree = require(`assets/decision-tree.json`)
        await commit('setNavigationData', tree)

        // TODO: Move somewhere else
        await commit('setMenuItems', 'Severe')
    },
}

export const getters = {
    getMenuItems: (state) => {
        return state.menu_items
    }
}

