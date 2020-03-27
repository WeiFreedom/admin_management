export default {
  LOGIN_OUT (state) {
    state.user.userToken = ''
    state.user.userId = ''
    state.user.userName = ''
    state.user.userDeptId = ''
    state.user.userDeptName = ''
  },
  LOGIN_IN (state, token, userId, userName, userDeptId, userDeptName) {
    state.user.userToken = token
    state.user.userId = userId
    state.user.userName = userName
    state.user.userDeptId = userDeptId
    state.user.userDeptName = userDeptName
  }
}
