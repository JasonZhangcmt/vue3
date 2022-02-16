import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue' // 路由 组件引入
// import Welcome from '../components/Welcome.vue' // 路由 组件引入
// import Login from '../components/Login.vue' // 路由 组件引入

import storage from '../utils/storage' // 动态路由
import API from './../api' // 动态路由
import util from './../utils/utils' // 动态路由

const routes = [ // 路由 routes = []
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页',
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎页'
        },
        component: () => import('../views/Welcome.vue')
      },
      {
        name: 'userManage',
        path: "/system/user",
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/User.vue'),
      },
      {
        name: 'menuManage',
        path: "/system/menu",
        meta: {
          title: '菜单管理'
        },
        component: () => import('../views/Menu.vue'),
      },
      {
        name: 'roleManage',
        path: "/system/role",
        meta: {
          title: '角色管理'
        },
        component: () => import('../views/Role.vue'),
      },
      {
        name: 'deptManage',
        path: "/system/dept",
        meta: {
          title: '部门管理'
        },
        component: () => import('../views/Dept.vue'),
      },
      {
        name: 'audit/leave',
        path: '/audit/leave',
        mate: {
          title: '休假申请'
        },
        component: () => import('../views/Leave.vue'),
      },

    ]
  },
  {
    name: 'login',
    path: '/login',
    mate: {
      title: '登录页'
    },
    component: () => import('../views/Login.vue'),
  },
  {
    name: '404',
    path: '/404',
    mate: {
      title: '404页面'
    },
    component: () => import('../views/404.vue'),
  },
]
// 路由 实例化 后面export暴露出去
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

function checkPermission(path) {
  let hasPermission = router.getRoutes().filter(route => route.path == path).length
  if (hasPermission) {
    return true
  }

  return false
}
// debugger
// 路由守卫 - 跳转至404页面
router.beforeEach((to, from, next) => {
  if (checkPermission(to.path)) {
    document.title = to.meta.title
    next()
  } else {
    next('/404')
  }
})

// 动态路由
async function loadAsyncRoutes() {
  let userInfo = storage.getItem('userInfo') || {}
  if (userInfo.token) {
    try {
      // 拿到menuList 
      const { menuList } = await API.permissionList()
      let routes = util.generateRoute(menuList)
      routes.map(route => {
        let url = `./../views/${route.component}.vue`
        route.component = () => import(url)
        router.addRoute('home', route)
      })
    } catch (error) {

    }
  }
}

await loadAsyncRoutes()

export default router // 路由 暴露实例化路由