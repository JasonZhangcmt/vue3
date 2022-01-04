<template>
    <el-container style="height: 100%">
      <el-aside width="auto"> <CommonAside></CommonAside> </el-aside>
      <el-container>
        <el-header><CommonHeader></CommonHeader> </el-header>
        <CommonTag></CommonTag>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  name: 'Main',
  components: { CommonAside, CommonHeader, CommonTag }
}
</script>
<style lang="scss">
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0
}
</style>
