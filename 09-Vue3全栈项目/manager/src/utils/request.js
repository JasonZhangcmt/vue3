import axios from 'axios'

import config from '../config'

import { ElMessage } from 'element-plus'

import router from '../router'

import storage from './storage' // Token 验证

const TOKEN_ERROR = 'Token认证失败,请重新登陆'
const NETWORK_ERROR = '网络请求异常,请稍后重试一下...'

//创建axios的实例对象 添加配置
const service = axios.create({
  baseUrl: config.baseApi,
  timeout: 8000,
})

//请求的拦截
service.interceptors.request.use((req) => {
  // 一些公共的请求机制--JWT Token验证机制
  const header = req.headers
  // 第一次登录时 获取不到 token -- 第一次初始为空
  const { token = '' } = storage.getItem('userInfo') || {} // Token 验证 
  // 'Bearer ' + token // 这里Bearer 不能写错 不能更改 代表令牌
  if (!header.Authorization) header.Authorization = 'Bearer ' + token // Token 验证
  return req
})

service.interceptors.response.use((res) => {
  // 一些公共的响应机制
  const { code, data, msg } = res.data

  if (code === 200) {
    return data
  } else if (code === 50001) {
    ElMessage.error(TOKEN_ERROR)
    setTimeout(() => {
      router.push('/login') // 未登录 或登录token失效导致 TOKEN_ERROR 返回登录页面
    }, 1500)
    return Promise.reject(TOKEN_ERROR)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

// 核心request函数
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    // 统一一下 属性是data
    options.params = options.data
  }
  if (typeof options.mock !== 'undefined') {
    config.mock = options.mock
  }
  // 以下非常重要，环境配置，会出现 T0 级别的 BUG
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}

// this.$request
// .get('/login', { name: 'jason' }, { mock: true })
// .then((res) => {
//   console.log(res)
// })
['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {  // 传入的三个值
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})
export default request