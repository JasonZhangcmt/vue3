import Vue from 'vue'
import Vuex from 'vuex' // 1. 导入vuex

Vue.use(Vuex) // 2. 将vuex安装到项目中

export default new Vuex.Store({
  // 3. new创建了Vuex.Store构造函数的实例
  // 4. export default 把new的实例暴露出去
  state: {
    count: 0,
  }, // 在state里面可以获取全局共享的数据
  mutations: {
    add(state) {
      state.count++
    },
    addN(state,step) {
      state.count+=step
    },
    sub(state) {
      state.count--
    },
    subN(state,step) {
      state.count-=step
    },
    // 只有 mutations中的函数才有权利修改 state。
    // 不能在 mutations里执行异步操作。
    // addAsync(context) {
    //   setTimeout(() => {
    //     context.commit('add')
    //   }, 1000);
    // }
  },
  actions: {
    addAsync(context) { // context相当于new出来的Vuex.Store实例对象
      setTimeout(() => {
        // context在Actions 中不能直接修改 state中的数据，要通过 mutations修改。
        context.commit('add')
      },1000)
    },
    addNAsync(context,step) { // context相当于new出来的Vuex.Store实例对象
      setTimeout(() => {
        // context在Actions 中不能直接修改 state中的数据，要通过 mutations修改。
        context.commit('addN',step)
      },1000)
    },
    subAsync(context) { // context相当于new出来的Vuex.Store实例对象
      setTimeout(() => {
        // context在Actions 中不能直接修改 state中的数据，要通过 mutations修改。
        context.commit('sub')
      },1000)
    },
    subNAsync(context,step) { // context相当于new出来的Vuex.Store实例对象
      setTimeout(() => {
        // context在Actions 中不能直接修改 state中的数据，要通过 mutations修改。
        context.commit('subN',step)
      },1000)
    }
  },
  getters: {
    showNum(state){
      return '当前最新的数据是----【'+ state.count +'】'
    }
  }
})
