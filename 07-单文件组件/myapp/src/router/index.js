import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '../views/Film.vue'
import Cinema from '../views/Cinema.vue'
import Center from '../views/Center.vue'
import Comingsoon from '../views/film/Comingsoon.vue'
import Nowplaying from '../views/film/Nowplaying.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter) // 注册路由模块 这里创建了全局组件：router-view
const routes = [
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/film',
    component: Film,
    children: [
      {
        path: '/film/comingsoon',
        component: Comingsoon
      },
      {
        path: 'nowplaying',
        component: Nowplaying
      },
      {
        path: '',
        redirect: '/film/nowplaying' // 重定向
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  // {
  //   path: '/detail/:myid', // 动态路由  /detail/下任意匹配
  //   component: Detail,
  //   name: 'filmDetail'
  // },
  {
    path: '/detail', // query方式动态路由
    component: Detail
  },
  {
    path: '*', // 通配符 优先级较低
    redirect: '/film/nowplaying' // 重定向,默认打开的路由
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history' // 默认为 hash 模式
  mode: 'hash'
})

// 全局路由守卫
// 任何路由过来之前都要经过 router.beforeEach 的同意
router.beforeEach((to, from, next) => {
  // console.log(to)
  const auth = ['/center', '/order', '/money'] // 进入auth的路径前都需要验证
  if (auth.includes(to.fullPath)) {
    // console.log('这里需要验证token')
    if (!localStorage.getItem('token')) { // 没有token就去登录
      next('/login')
    } else { // 有token就进入
      next()
    }
  } else {
    next()
  }
})
export default router // 导出路由  导出的路由对象对应this.$router
