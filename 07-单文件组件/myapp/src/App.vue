<template>
  <div>
    <h1>TODO LIST</h1>
    hello11---{{ myname }}
    <button @click="handleClick">改名字</button>
    <input type="text" v-model="mytext">
    <button @click="handleAdd">添加</button>
    <ul>
      <li v-for="item in mylist" :key="item">{{item}}</li>
    </ul>

    <h1>抽屉</h1>
    <navbar @myevent="handleEvent">
        <button slot="left" @click="isShow=!isShow">slot-Lshow</button>
        <button slot="right" @click="isShow=!isShow">slot-Rshow</button>
    </navbar>
    <sidebar v-show="isShow"></sidebar>
    <!-- 样式会相互影响 -->
    <h1>路由</h1>
    <!-- 路由容器 -->
    <!-- <router-view></router-view> -->
    <h1>路由跳转</h1>
    <tabbar></tabbar>
    <router-view></router-view>
  </div>
  <!-- 依旧只能有一个根节点 -->
</template>
<script>
// 这里只引入了结构
import navbar from './components/Navbar'
import sidebar from './components/Sidebar.vue'
import tabbar from './components/Tabbar.vue'
// import Vue from 'vue'
// // 还需注册全局组件
// Vue.component('navbar', navbar)
// Vue.component('sidebar', sidebar)
// ES6模块导出规范
export default {
  data () {
    return {
      myname: 'Hello!ZJZJ11',
      mytext: '',
      mylist: [],
      isShow: false

    }
  },
  // 局部注册方式
  components: {
    sidebar,
    navbar,
    tabbar
  },
  methods: {
    handleClick () {
      this.myname = 'NewName-Jason'
    },
    handleAdd () {
      this.mylist.push(this.mytext)
    },
    handleEvent () {
      this.isShow = !this.isShow
    }
  }
}
</script>
<style>
  li {
    background: blue
  }
</style>
