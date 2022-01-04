<template>
  <div>
    Detail
  </div>
</template>
<script>
export default {
  mounted () {
    // this.$route 当前匹配的路由对象信息
    // console.log('这里AJAX请求', this.$route.params.myid)

    console.log('这里AJAX请求', this.$route.query.id)
  }
}
</script>
