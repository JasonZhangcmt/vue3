<template>
  <div class="exception">
    <img src="../assets/images/404.png" />
    <el-button class="btn-home" @click="goHome">回首页</el-button>
  </div>
</template>
<script>
export default {
  name: "404",
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss">
.exception {
  position: relative;
  .btn-home {
    position: absolute;
    bottom: 100px;
    left: 50%;
    margin-left: -34px;
  }
  img {
    width: 100%;
    height: 100vh;
  }
}
</style>