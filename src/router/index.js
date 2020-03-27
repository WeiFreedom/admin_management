import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/index'
import Dashboard from '../views/main/dashboard'
import ToDo from '../views/main/todo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

/* 准备动态添加的路由 */
export const DynamicRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [],
    redirect: '/dashboard'
  },
  {
    path: '/',
    name: 'Index',
    component: Home,
    meta: {
      caption: '主页',
      icon: 'el-icon-s-home'
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          parent: 'Home',
          caption: '仪表盘'
        }
      },
      {
        path: '/todo',
        name: 'todo',
        component: ToDo,
        meta: {
          parent: 'Home',
          caption: '备忘录'
        }
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    component: () => import('../views/403.vue'),
    meta: {
      visible: false,
      caption: '403错误页',
      icon: 'el-icon-warning'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {
      visible: false,
      caption: '404错误页',
      icon: 'el-icon-question'
    }
  }
]
