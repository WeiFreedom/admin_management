export default {
  LOGIN_OUT_HANDLE (state) {
    state.commit('LOGIN_OUT')
  },
  LOGIN_IN_HANDLE (state, token, userId, userName, userDeptId, userDeptName) {
    state.commit('LOGIN_IN', token, userId, userName, userDeptId, userDeptName)
  }
}
