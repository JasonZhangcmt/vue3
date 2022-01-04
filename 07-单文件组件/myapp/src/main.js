import Vue from 'vue' // ES6导入模块
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
// import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter) // 注册路由模块
// vue 实例化挂载到 app 节点中
new Vue({
  router,
  // store,
  render: h => h(App) // 单页面相关--App根组件render渲染后挂载到app节点上
  // render: function(callback){
  //   return callback(App)
  // }
}).$mount('#app') // 挂载方式 new Vue( {el: '#app' })
