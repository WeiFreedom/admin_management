import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

require('../mock') // mock 方式，正式发布时，注释掉该处即可

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (!store.state.user || !store.state.user.user || !store.state.user.user.token) { // 如果没有token
    if (
      to.matched.length > 0 &&
            !to.matched.some(record => record.meta.requiresAuth) // 验证路由是不是要求权限
    ) {
      next()
    } else { // 如果路由需要权限 那么需要登录
      next({ path: '/login' })
    }
  } else {
    if (!store.state.permission.permissionList) {
      store.dispatch('permission/FETCH_PERMISSION').then(() => {
        next({ path: to.path })
      }).catch(error => {
        console.log(error)
      })
    } else {
      if (to.path !== '/login') {
        next()
      } else {
        next(from.fullPath)
      }
    }
  }
})

router.afterEach((to, from, next) => {
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
