import { createApp } from 'vue'

import ElementPlus from 'element-plus' // ElementPlus
// 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons'

import 'element-plus/dist/index.css' // ElementPlus

import router from './router' // 路由 本地路由导入

// import axios from 'axios' // mock使用 引入axios
// import config from './config' // mock使用 引入本地环境配置api
// axios.get(config.mockApi + '/login').then((res) => {
//   console.log(res)
// }) // mock使用 打印AJAX请求返回值

import App from './App.vue'

import request from './utils/request' // axios封装 request引入

import storage from './utils/storage' // localStorage封装 storage引入 

import api from './api' // 登录 本地api引入

import store from './store' // 用户账号 本地存储 引入


// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)  // 路由 引入

app.use(store) // 用户账号 本地存储 全局vuex
app.mount('#app')

// console.log("环境变量", import.meta.env)

app.config.globalProperties.$request = request // axios封装 全局注册
app.config.globalProperties.$storage = storage // localStorage封装 全局注册
app.config.globalProperties.$api = api // 登录 全局api

// 统一注册el-icon图标
for(let iconName in ElIconModules){
  app.component(iconName,ElIconModules[iconName])
}
app.use(ElementPlus,{size:'small'}) // element-plus主题size设置