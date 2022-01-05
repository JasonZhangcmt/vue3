import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue' // 路由 组件引入
// import Welcome from '../components/Welcome.vue' // 路由 组件引入
// import Login from '../components/Login.vue' // 路由 组件引入


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
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    mate: {
      title: '登录页'
    },
    component: () => import('../views/Login.vue'),
  }
]
// 路由 实例化
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router // 路由 暴露实例化路由