<template>
  <div>
    <!-- <h3>当前count值为:{{ count }}</h3> -->
    <h3>{{ showNum }}</h3>

    <button @click="subtration">-1</button>
    <button @click="subtration2">-N</button>
    <button @click="subtrationAsync">-1 Async</button>
    <button @click="subtrationNAsync">-N Async</button>
    <button @click="subNAsync(88)">-N Async2</button>

  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['count']), // ...展开运算符 把全局数据映射为当前组件的计算属性
    ...mapGetters(['showNum'])
  },
  methods: {
    ...mapMutations(['sub','subN']),
    ...mapActions(['subAsync','subNAsync']),
    subtration(){
      this.sub()
    },
    subtration2(){
      this.subN(4)
    },
    subtrationAsync(){
      this.subAsync()
    },
    subtrationNAsync(){
      this.subNAsync(10)
    },
  }
}
</script>
