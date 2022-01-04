<template>
  <div>
    center
  </div>
</template>
<script>
export default {
  data () {
    return {
      // token: false
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   // 组件内的路由拦截
  //   if (!localStorage.getItem('token')) { // 没有token就去登录
  //     next('/login')
  //   } else { // 有token就进入
  //     next()
  //   }
  // },
  mounted () {
    // 检查token，如果没有，重定向到登录界面
    // if (!localStorage.getItem('token')) {
    //   this.$router.push('/login')
    // }
  }
}
</script>
