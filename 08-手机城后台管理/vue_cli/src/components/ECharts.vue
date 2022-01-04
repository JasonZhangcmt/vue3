<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from 'echarts' // 引入echarts
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        }
      },
    },
    isAxisChart: { // 判断是否有x轴
      type: Boolean,
      default: true, // 默认有x轴
    },
  },
  watch: { // 监听传过来的chartData
    chartData: {
      handler: function () { // 对数据做处理
        this.initChart() // 处理数据
      },
      deep: true,
    },
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
  },
  methods: {
    initChart() {
      this.initChartData() // 处理数据

      // 设置echarts表格 -- 之前需要获取 echarts 实例化对象
      if (this.echart) {
        this.echart.setOption(this.options) // 通过计算属性this.options返回是否有x轴的配置this.axisOption : this.normalOption
      } else { // 为空时初始化
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData() {
      if (this.isAxisChart) { // 如果有x轴
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else { // 没有x轴
        this.normalOption.series = this.chartData.series
      }
    },
  },
  data() {
    return {
      axisOption: { // 有x轴的配置
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333',
          },
        },
        grid: {
          left: '20%',
        },
        // 提示框
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category', // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: '#17b3a3',
            },
          },
          axisLabel: {
            interval: 0,
            color: '#333',
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3',
              },
            },
          },
        ],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
        ],
        series: [],
      },
      normalOption: { // 无x轴的配置
        tooltip: {
          trigger: 'item',
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf',
        ],
        series: [],
      },
      echart: null, // 定义表格对象
    }
  },
}
</script>
