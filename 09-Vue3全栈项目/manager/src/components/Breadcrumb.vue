<template>
  <!-- 面包屑导航 -->
  <!-- separator 分隔符  -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <!-- to 路由跳转对象，同 vue-router 的 to -->
      <!-- breadList 面包屑对象 长度为0 只显示 首页/欢迎页-->
      <router-link to="/welcome" v-if="index === 0">
        {{ item.meta.title }}
      </router-link>
      <!-- breadList 面包屑对象 长度不0 显示 push到breadList中的值-->
      <!-- 点击 侧边栏 菜单部分 会push更改路由 -->
      <!-- 此时匹配match到的路由-展示的(打开的)组件路径-定义在router.js中-meta为自定义的面包屑名称 其title展示到面包屑中 -->
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'Breadcrumb',
  mounted() {
    console.log('当前路由:',this.$route) // 获得match的路由
  },
  computed: {
    breadList() {
      // 此时匹配match到的路由-展示的(打开的)组件路径-定义在router.js中-meta为自定义的面包屑名称 其title展示到面包屑中
      return this.$route.matched
    },
  },
}
</script>
