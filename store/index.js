export const state = () => ({
  isOut: false,
  isStopped: false
})

export const getters = {
  isOut(state) {
    return state.isOut
  },
  isStopped(state) {
    return state.isStopped
  }
}

export const mutations = {
  setState(state) {
    state.isOut = true
  },
  setStopped(state, value) {
    state.isStopped = value
  }
}

export const actions = {
  setOut({ commit }) {
    commit('setState')
  },
  setStopped({ commit }, val) {
    commit('setStopped', val)
  }
}