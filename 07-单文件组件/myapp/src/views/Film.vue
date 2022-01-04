<template>
  <div>
    film
    <div style="height:300px;background:yellow">轮播图</div>
    <ul>
      <li>正在上映</li>
      <li>即将上映</li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<style scoped lang="scss">
  ul {
    display: flex;
    li {
      flex: 1;
      background: pink;
    }
  }
</style>
