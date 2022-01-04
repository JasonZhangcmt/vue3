<template>
  <nav>
    <ul>
      <router-link to="/film" tag="li" active-class="active">电影</router-link>
      <router-link to="/cinema" tag="li" active-class="active">影院</router-link>
      <router-link to="/center" tag="li" active-class="active">我的</router-link>
    </ul>
  </nav>
</template>
<style scoped lang='scss'>
  ul {
    display: flex;
    li{
      flex: 1;
      background: rgb(182, 255, 251)
  }
  }
  .active {
    color: pink
  }
</style>
