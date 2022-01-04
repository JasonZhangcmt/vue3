<template>
  <div>
    <ul>
      <li>首页</li>
      <li>aaaa</li>
      <li>bbbb</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
// scoped 自动生成唯一属性 样式只影响局部作用域
// lang="scss" 支持scss写法
  $width:300px;
  // 定义变量 $width
  ul{
    li{
      background:pink;
      width: $width;
    }
  }
</style>
