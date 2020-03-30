export default {
  namespaced: true,
  state: {
    get user () {
      return JSON.parse(localStorage.getItem('user')) || {}
    },
    set user (value) {
      localStorage.setItem('user', JSON.stringify(value))
    }
  },
  mutations: {
    LOGIN_OUT (state) {
      localStorage.setItem('user', JSON.stringify({}))
    },
    LOGIN_IN (state, user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  actions: {
    LOGIN_OUT_HANDLE (state) {
      state.commit('LOGIN_OUT')
    },
    LOGIN_IN_HANDLE (state, user) {
      state.commit('LOGIN_IN', user)
    }
  }
}
