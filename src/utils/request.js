import axios from 'axios'
import store from '../store/index.js'
import baseURL from '../settings/base-setting'
import { Message } from 'element-ui'
const request = {}

var instance = axios.create({
  timeout: 5000,
  baseURL
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 请求头添加token
    if (store.state.user.userToken) {
      config.headers.Authorization = store.state.user.userToken
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求出错'
          break
        case 401:
          Message.warning({
            message: '授权失败，请重新登录'
          })
          store.dispatch('LOGIN_OUT_HANDLE')
          setTimeout(() => {
            window.location.reload()
          }, 1000)

          return
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 500:
          err.message = '服务器端出错'
          break
      }
    } else {
      err.message = '连接服务器失败'
    }
    Message.error({
      message: err.message
    })
    return Promise.reject(err.response)
  }
)

request.get = function (url, options) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, options)
      .then(response => {
        if (response.code === 0) {
          resolve(response.data)
        } else {
          Message.error({
            message: response.message
          })
          reject(response.message)
        }
      })
      .catch(e => {
        console.log(e)
      })
  })
}

request.post = function (url, data, options) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, options)
      .then(response => {
        if (response.code === 0) {
          resolve(response.data)
        } else {
          Message.error({
            message: response.message
          })
          reject(response.message)
        }
        // reject(response.message)
      })
      .catch(e => {
        console.log(e)
      })
  })
}

export default request
