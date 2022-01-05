<script>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  name: 'app',
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup() {
    let locale = zhCn
    return {
      locale,
    }
  },
}
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
@import './assets/style/index.scss';
@import './assets/style/reset.css';
</style>
