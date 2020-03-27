import Mock from 'mockjs'
import { permissionList, token } from './permission'

Mock.setup({
  timeout: 800 // 设置延迟响应，模拟向后端请求数据
})

Mock.mock(/api\/permission\/getPermissionById/, 'get', permissionList)

Mock.mock(/api\/permission\/login/, 'post', token)
