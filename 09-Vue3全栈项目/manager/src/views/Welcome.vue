<script>
// export default {
//   name: 'welcome',
// }
//
</script>

<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">公司内部员工管理系统</div>
      <div class="desc">--由vue3.0 + ElementPlus + Node + mongodb共同构建</div>
    </div>
    <div class="img">
      <img src="./../assets/images/welcome.png" alt="" width="600px">
    </div>
  </div>
</template>

<style scoped lang="scss">
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;
  .content {
    position: relative;
    bottom: 40px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
    .desc {
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }
  .img {
    margin-left: 50px;
    width: 300px;
    height: 300px;
    opacity: 40%;
    margin-bottom: 340px;
    // z-index: 0;
    // background-image: no-repeat;
    // background-size:contain;
    // width: 300px;
    // height: 300px;
  }
}
</style>
