import Vue from "vue"
import App from "./App.vue"
import store from "./store" // 5. 导入./store/index.js暴露的实例化对象

Vue.config.productionTip = false

new Vue({
  // new Vue实例
  store, // 6. 挂载store -- 这里Vue中的每一个组件都可以访问到store中全局共享的数据了
  render: (h) => h(App),
}).$mount("#app")
