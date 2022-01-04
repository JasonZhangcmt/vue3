<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link to="/welcome" v-if="index === 0">
        {{ item.meta.title }}
      </router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'Breadcrumb',
  mounted() {
    console.log(this.$route) // 获得match的路由
  },
  computed: {
    breadList() {
      return this.$route.matched
    },
  },
}
</script>
