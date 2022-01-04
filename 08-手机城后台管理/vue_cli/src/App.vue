<!-- <p>p段落</p>
<el-button>按钮</el-button>
<el-button type="info">按钮2</el-button>
<el-radio v-model="radio" label="1">备选项</el-radio>
<el-radio v-model="radio" label="2">备选项</el-radio>
<router-link to="/">去home页面</router-link> |
<router-link to="/about">去about组件</router-link> -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '1',
    }
  },
}
</script>
<style lang="scss">
#app {
  height: 100vh;
}
</style>
