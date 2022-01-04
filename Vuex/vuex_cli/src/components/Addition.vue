<template>
  <div>
    <!-- <h3>当前count值为:{{$store.state.count}}</h3> -->
    <h3>{{$store.getters.showNum}}</h3>
    <button @click="add">+1</button>
    <button @click="add2">+N</button>
    <button @click="addAsync">+1 Async</button>
    <button @click="addNAsync">+N Async</button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    add(){
      this.$store.commit('add')
    },
    add2(){
      this.$store.commit('addN', 2)
    },
    // 异步让count +1
    // 触发 actions 的第一种方式
    // dispatch 专门用来触发 action
    addAsync(){
      this.$store.dispatch('addAsync')
    },
    // 带参数方法
    addNAsync(){
      this.$store.dispatch('addNAsync',8)
    }
  }
}
</script>
