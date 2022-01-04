<template>
  <el-row class="home" :getter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2019-7-19</span></p>
          <p>上次登陆地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="height: 520px; margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="height: 280px">
        <!-- <div style="height: 280px" ref="echart"></div> -->
        <echart :chartData="echartData.order" style="height: 280px"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover" style="height: 260px">
          <!-- <div style="height: 280px" ref="userEchart"></div> -->
          <echart :chartData="echartData.user" style="height: 280px"></echart>
        </el-card>
        <el-card shadow="hover" style="height: 260px">
          <!-- <div style="height: 280px" ref="videoEchart"></div> -->
          <echart
            :chartData="echartData.video"
            style="height: 240px"
            :isAxisChart="false"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import { getMenu } from '../../api/data'
import { getHome } from '../../api/data'
// import * as echarts from 'echarts'
import Echart from '@/components/ECharts.vue'
export default {
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require('../../assets/ZJ.jpg'),
      // tableData: [
      //   {
      //     name: 'oppo',
      //     todayBuy: 100000000,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: 'vivo',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: '苹果',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: '小米',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: '三星',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: '魅族',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   }
      // ],
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买',
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
      ],
      // echartsData: {
      //   order: {
      //     legend: {
      //       // 图例文字颜色
      //       textStyle: {
      //         color: '#333',
      //       },
      //     },
      //     grid: {
      //       left: '20%',
      //     },
      //     // 提示框
      //     tooltip: {
      //       trigger: 'axis',
      //     },
      //     xAxis: {
      //       type: 'category', // 类目轴
      //       data: [],
      //       axisLine: {
      //         lineStyle: {
      //           color: '#17b3a3',
      //         },
      //       },
      //       axisLabel: {
      //         // interval: 0,
      //         color: '#333',
      //       },
      //     },
      //     yAxis: [
      //       {
      //         type: 'value',
      //         axisLine: {
      //           lineStyle: {
      //             color: '#17b3a3',
      //           },
      //         },
      //       },
      //     ],
      //     color: [
      //       '#2ec7c9',
      //       '#b6a2de',
      //       '#5ab1ef',
      //       '#ffb980',
      //       '#d87a80',
      //       '#8d98b3',
      //     ],
      //     series: [],
      //   },
      //   user: {
      //     legend: {
      //       // 图例文字颜色
      //       textStyle: {
      //         color: '#333',
      //       },
      //     },
      //     grid: {
      //       left: '20%',
      //     },
      //     // 提示框
      //     tooltip: {
      //       trigger: 'axis',
      //     },
      //     xAxis: {
      //       type: 'category', // 类目轴
      //       data: [],
      //       axisLine: {
      //         lineStyle: {
      //           color: '#17b3a3',
      //         },
      //       },
      //       axisLabel: {
      //         interval: 0,
      //         color: '#333',
      //       },
      //     },
      //     yAxis: [
      //       {
      //         type: 'value',
      //         axisLine: {
      //           lineStyle: {
      //             color: '#17b3a3',
      //           },
      //         },
      //       },
      //     ],
      //     color: ['#2ec7c9', '#b6a2de'],
      //     series: [],
      //   },
      //   video: {
      //     tooltip: {
      //       trigger: 'item',
      //     },
      //     color: [
      //       '#0f78f4',
      //       '#dd536b',
      //       '#9462e5',
      //       '#a6a6a6',
      //       '#e1bb22',
      //       '#39c362',
      //       '#3ed1cf',
      //     ],
      //     series: [],
      //   },
      // },
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    }
  },
  methods: {
    getTableData() {
      getHome().then((res) => {
        console.log(res)
        this.tableData = res.data.tableData

        // 折线图的展示
        const order = res.data.orderData
        // this.echartsData.order.xAxis.data = order.date
        // console.log(order.data[0])
        const keyArray = Object.keys(order.data[0])

        // keyArray.forEach((key) => {
        //   this.echartsData.order.series.push({
        //     name: key,
        //     data: order.data.map((item) => item[key]),
        //     type: 'line',
        //   })
        // })
        // console.log(this.echartsData.order.series)
        // const myEchartsOrder = echarts.init(this.$refs.echart) // this.$refs.echart获取dom
        // myEchartsOrder.setOption(this.echartsData.order)

        // 传给组件的值
        this.echartData.order.xData = order.date

        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line',
          })
        })

        // 用户图--柱状图
        // 封装组件方式
        this.echartData.user.xData = res.data.userData.map((item) => item.date)
        this.echartData.user.series.push({
          name: '新增用户', // 图例
          data: res.data.userData.map((item) => item.new), // 返回数组 item.new 柱状图高度
          type: 'bar', // 样式
        }) // 表中数据
        this.echartData.user.series.push({
          name: '活跃用户',
          data: res.data.userData.map((item) => item.active),
          type: 'bar',
        })

        // this.echartsData.user.xAxis.data = res.data.userData.map(
        //   (item) => item.date
        // ) // 设置x轴为item.date--(周一、周三...)
        // this.echartsData.user.series.push({
        //   name: '新增用户', // 图例
        //   data: res.data.userData.map((item) => item.new), // 返回数组 item.new 柱状图高度
        //   type: 'bar', // 样式
        // }) // 表中数据
        // this.echartsData.user.series.push({
        //   name: '活跃用户',
        //   data: res.data.userData.map((item) => item.active),
        //   type: 'bar',
        // })
        // const myEchartsUser = echarts.init(this.$refs.userEchart) // this.$refs.userEchart获取dom
        // myEchartsUser.setOption(this.echartsData.user)

        // 饼状图 没有x轴
        // 封装组件方式
        this.echartData.video.series.push({
          data: res.data.videoData,
          type: 'pie', // 饼状图
        })

        // 饼状图 没有x轴
        // this.echartsData.video.series.push({
        //   data: res.data.videoData,
        //   type: 'pie', // 饼状图
        // })
        // const myEchartsVideo = echarts.init(this.$refs.videoEchart) // this.$refs.userEchart获取dom
        // myEchartsVideo.setOption(this.echartsData.video)
      })
    },
  },
  mounted() {
    // this.$http.get('/user?ID=12345')
    //   .then(function (response) {
    //     console.log(response)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
    // getMenu().then((res) => {
    //   console.log(res)
    // })
    // getHome().then((res) => {
    //   console.log(res)
    // })
    this.getTableData()
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/home';
</style>
