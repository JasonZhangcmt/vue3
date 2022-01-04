import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
// import CommonHeader from '../components/CommonHeader.vue'
// import CommonAside from '../views/CommonAside.vue'

// 解决路由重复错误
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'home',
        // component: () => import('../views/Home/Home')
        component: () => import('@/views/Home/Home')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('@/views/Mall/Mall')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/User/User')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
