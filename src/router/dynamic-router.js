const dynamicRoutes = [
  {
    path: '/storage-management',
    name: 'storage-management',
    component: () => import('../views/storage/index.vue'),
    meta: {
      caption: '库存管理',
      icon: 'el-icon-s-finance',
      requiresAuth: true
    },
    children: [
      {
        path: '/storage-management/in-storage',
        name: 'in-storage',
        component: () => import('../views/storage/in-storage.vue'),
        meta: {
          caption: '入库管理',
          icon: 'el-icon-shopping-cart-1',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('../views/reports/index.vue'),
    meta: {
      caption: '报表查询',
      icon: 'el-icon-document',
      requiresAuth: true
    }
  },
  {
    path: '/system',
    name: 'system',
    component: () => import('../views/system/index.vue'),
    meta: {
      caption: '系统设置',
      icon: 'el-icon-setting',
      requiresAuth: true
    },
    children: [
      {
        path: '/system/user-setting',
        name: 'user-setting',
        component: () => import('../views/system/user-setting.vue'),
        meta: {
          caption: '用户管理',
          requiresAuth: true
        }
      },
      {
        path: '/system/role-setting',
        name: 'role-setting',
        component: () => import('../views/system/role-setting.vue'),
        meta: {
          caption: '权限管理',
          requiresAuth: true
        }
      }
    ]
  }
]

export default dynamicRoutes
