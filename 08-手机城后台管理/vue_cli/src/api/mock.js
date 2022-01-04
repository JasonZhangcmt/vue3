import Mock from 'mockjs'

import homeApi from './mockServerData/home' // homeApi即get到的数据./mockServerData/home.js
Mock.mock('/api/home/getData', homeApi.getStatisticalData) // mock模拟的地址： /api/home/getData

// import userApi from './mockServerData/user'
// import permissionApi from './mockServerData/permission'
// Mock.mock('/api/home/getData', homeApi.getStatisticalData)
// // Mock.mock('/api/user/getUser', userApi.getUserList)

// Mock.mock(/api\/user\/getUser/, 'get', userApi.getUserList)
// // 权限相关
// Mock.mock(/api\/permission\/getMenu/, 'post', permissionApi.getMenu)
