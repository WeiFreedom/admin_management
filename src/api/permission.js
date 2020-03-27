import request from '../utils/request'

export function getPermissionById (id) {
  return request.get('/api/permission/getPermissionById?id=' + id)
}

export function login (userid, password) {
  return request.post('/api/permission/login', { userid: userid, password: password })
}
