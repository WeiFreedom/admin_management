import { getPermissionById } from '../../api/permission'
import router, { DynamicRoutes } from '@/router/index'
import { recursionRouter } from '@/utils/recursion-router'
import dynamicRouter from '@/router/dynamic-router'

export default {
  namespaced: true,
  state: {
    permissionList: null /** 所有路由 */,
    sidebarMenu: [] /** 面包屑导航菜单 */,
    currentMenu: '', /** 当前active导航菜单 */
    tabMenu: [] /** tab页 */
  },
  getters: {},
  mutations: {
    SET_PERMISSION (state, routes) {
      state.permissionList = routes
    },
    CLEAR_PERMISSION (state) {
      state.permissionList = null
    },
    SET_MENU (state, menu) {
      state.sidebarMenu = menu
    },
    CLEAR_MENU (state) {
      state.sidebarMenu = []
    },
    SET_CURRENT_MENU (state, currentMenu) {
      state.currentMenu = currentMenu
    },
    ADD_TAB_MENU (state, tabMenu) {
      let flag = false
      /** 判断是否存在重复的tab */
      if (state.tabMenu) {
        state.tabMenu.forEach(element => {
          if (element.name === tabMenu.name) {
            flag = true
          }
        })
      }
      if (!flag) {
        state.tabMenu.push(tabMenu)
      }
    },
    SET_TAB_MENU (state, tabMenus) {
      state.tabMenu = tabMenus
    }
  },
  actions: {
    FETCH_SET_TAB_MENU (state, tabMenus) {
      state.commit('SET_TAB_MENU', tabMenus)
    },
    /** 设置当前tab页 */
    FETCH_SET_CURRENT_MENU (state, currentMenu) {
      state.commit('SET_CURRENT_MENU', currentMenu)
    },
    /** 动态增加tab页 */
    FETCH_ADD_TAB_MENU (state, tabMenu) {
      state.commit('ADD_TAB_MENU', tabMenu)
    },
    FETCH_CLEAR_MENU (state) {
      state.commit('CLEAR_MENU')
    },
    FETCH_SET_MENU (state, menu) {
      state.commit('SET_MENU', menu)
    },
    async FETCH_PERMISSION ({ commit, state }) {
      const permissionList = await getPermissionById()
      /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
      const routes = recursionRouter(permissionList, dynamicRouter)
      const MainContainer = DynamicRoutes.find(v => v.path === '/')

      const children = MainContainer.children

      children.push(...routes)
      /* 生成面包屑导航 */
      commit('SET_MENU', ['主页', '仪表盘'])

      /** 默认Tab页 */
      commit('SET_CURRENT_MENU', 'dashboard')
      commit('ADD_TAB_MENU', { name: 'dashboard', path: '/dashboard', title: '仪表盘' })

      /*  初始路由 */
      const initialRoutes = router.options.routes

      /* 将路由表保存进去右侧导航栏 */
      commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])

      /*  动态添加路由 */
      router.addRoutes(DynamicRoutes)
    }
  }
}
