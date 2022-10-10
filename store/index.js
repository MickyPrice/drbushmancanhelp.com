export const state = () => ({
  isOut: false
})

export const getters = {
  isOut(state) {
    return state.isOut
  }
}

export const mutations = {
  setState(state) {
    state.isOut = true
  }
}

export const actions = {
  setOut({ state, commit }) {
    commit('setState')
    // state.isOut = false;
  }
}