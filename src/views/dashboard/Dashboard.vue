<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const chartDomRef = ref(null)
const activeName = ref('first')
const chartsData = ref(null)
let myChart = null

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(chartDomRef.value)
})

// 监听 echarts 数据改变，重新渲染图表
watch(chartsData, () => {
  myChart.setOption(chartsData.value, true)
})


const getChartsData = {
  async first() {
    const res = await getData()
    chartsData.value = res
  },
  async second() {
    const res = await getData2()
    chartsData.value = res
  },
  async third() {
    const res = await getData3()
    chartsData.value = res
  },
  async fourth() {
    const res = await getData4()
    chartsData.value = res
  },
}
// 监听tab切换获取新数据
watch(activeName, () => {
  if (getChartsData[activeName.value]) {
    getChartsData[activeName.value]()
  }
    
}, {
  immediate: true
})









function getData() {
  return new Promise((resolve) => {
    const data = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    resolve(data)
  })
}

function getData2() {
  return new Promise((resolve) => {
    const data = {
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
    resolve(data)
  })
}
function getData3() {
  return new Promise((resolve) => {
    const data = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
    resolve(data)
  })
}

function getData4() {
  return new Promise((resolve) => {
    const data =  {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
    }
  ]
};
    resolve(data)
  })
}
</script>

<template>
     <div class="page">
    <el-row>
      <el-col :span="24"><div class="box" style="height: 80px;"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16" >
        <div class="box" style="height: 600px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="标签1" name="first">1
            </el-tab-pane>
            <el-tab-pane label="标签2" name="second">2
            </el-tab-pane>
            <el-tab-pane label="标签3" name="third">3
            </el-tab-pane>
            <el-tab-pane label="标签4" name="fourth">4
            </el-tab-pane>
          </el-tabs>
          <div v-show="activeName === 'first' || activeName === 'second'||activeName === 'third'||activeName === 'fourth'" class="chart" ref="chartDomRef"></div>
        </div>
      </el-col>
      <el-col :span="8"><div class="box" style="height: 400px;"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><div class="box" style="height: 160px;"></div></el-col>
      <el-col :span="8"><div class="box" style="height: 160px;"></div></el-col>
      <el-col :span="8"><div class="box" style="height: 160px;"></div></el-col>
    </el-row>
    <el-row :gutter="20">
    <el-col :span="14"><div class="box" style="height: 500px;"></div></el-col>
    <el-col :span="10"><div class="box" style="height: 500px;"></div></el-col>
  </el-row>
  </div>
</template>

<style lang='scss' scoped>
.box {
  padding: 20px;
  border-radius: 5px;
  background: #ffffff;
  margin-bottom: 20px;
}
.chart {
    height: 400px;
}
</style>
