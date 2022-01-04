<template>
  <div>
    <h4>NowPlaying</h4>
    <ul>
      <li v-for="item in datalist" :key="item.id" @click="handleClick(item.id)">{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      datalist: [{
        id: 111,
        title: '姜子牙'
      },
      {
        id: 222,
        title: '花木兰'
      },
      {
        id: 333,
        title: '急先锋'
      }
      ]
    }
  },
  methods: {
    handleClick (id) {
      console.log(id)
      // this.$router.push('/detail')
      // 1. 路径方式
      // this.$router.push(`/detail/${id}`) // 编程式导航

      // // 2. 路由名字方式
      // this.$router.push({
      //   name: 'filmDetail',
      //   params: {
      //     myid: id
      //   }
      // })

      // 3. query方式跳转详情
      this.$router.push(`/detail/?id=${id}`)
    }
  }
}
</script>

<style scope lang="scss">
  ul li {
    background: rgb(207, 255, 192)
  }
</style>
