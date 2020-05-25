export const state = () => ({
    menu_items: [],
    decision_tree: [],
    current_page: '',
    next_page: 0
})

import decision_tree_JSON from '~/assets/content/decision-tree.json';

export const mutations = {
    setNavigationData(state, json) {
        console.log('saving decsion tree data')
        state.decision_tree = json
    },
    setMenuItems(state, user_type) {
        let menu_items = []

        // get all module information
        let module_info = require(`assets/content/module-info.json`)

        // set the available path based on user type
        module_info.modules.forEach(function (module) {
            if (user_type in module) {
                menu_items.push(module)
            }
        });
        state.menu_items = menu_items
    },
    setCurrentPage(state, current_page) {
        console.log('mutating current_page page to ' + current_page)
        state.current_page = current_page
    },
    setNextPage(state, next_page) {
        console.log('mutating next page to ' + next_page)
        state.next_page = next_page
    }

}

export const actions = {
    // load the decison tree to be removed
    async fetchNavigationData({ commit }) {
        // Load the decision tree into state
        // let decision_tree = require(`assets/content/decision-tree.json`)
        // await commit('setNavigationData', decision_tree)
        await commit('setMenuItems', 'Severe')
    },
    // set next page
    async determineNextPage({ commit, state }, payload) {

        // TODO: Move somewhere else
        await commit('setMenuItems', 'Severe')
        console.log('DETERMINE NEXT PAGE FROM ' + payload.page.title)
        console.log('ANSWERS')
        console.log(payload.answers)
        console.log(payload.page.title)
        // console.log(decision_tree_JSON)
        console.log(decision_tree_JSON[payload.page.title])

        if (decision_tree_JSON[payload.page.title]) {

            var module_logic = decision_tree_JSON[payload.page.title]

            if ('completed' in module_logic) {
                console.log('completed condition ' + module_logic.completed)


                for (var i = 0; i < module_logic.completed.set; i++) {
                    console.log('completed set condition ' + module_logic.conditions)
                    console.log('answers ' + payload.answers[i])
                    console.log('found an action')
                    console.log('CUSTOM SET ' + module_logic.completed.set[i])
                    await commit('setNextPage', module_logic.completed.next)
                }

                await commit('setNextPage', module_logic.completed.next)

            } else if (module_logic.next == 'conditional') {
                for (var i = 0; i < module_logic.conditions.length; i++) {

                    console.log('condition ' + module_logic.conditions)
                    console.log(module_logic.conditions[i])
                    console.log(module_logic.conditions[i].answer)
                    console.log('answers ' + payload.answers[i])

                    if (module_logic.conditions[i].answer == payload.answers[i]) {
                        for (var i = 0; i < module_logic.conditions.length; i++) {
                            console.log('found an action')
                            console.log(module_logic.conditions[i].actions.next)
                            module_logic.conditions[i].actions.next

                            await commit('setNextPage', module_logic.conditions[i].actions.next)
                        }
                    }
                }
                console.log('found conditional in decision tree')

            } else {
                console.log('Found next item ' + module_logic.next)
                await commit('setNextPage', module_logic.next)
            }
        }
    },
    async setCurrentPage({ commit }, title) {
        console.log('DISPATCH SETTING CURRENT PAGE' + title)
        await commit('setCurrentPage', title)
    },
}

export const getters = {
    getMenuItems: (state) => {
        return state.menu_items
    },
    getNextPage: (state) => {
        return state.next_page
    },
    getCurrentPage: (state) => {
        return state.current_page
    }
}

