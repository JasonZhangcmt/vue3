import axios from 'axios' // 引入axios

import config from '../config' // 环境配置文件baseApi mockApi

import { ElMessage } from 'element-plus' // 提示的UI - success error提示

import router from '../router'

import storage from './storage' // Token 验证

const TOKEN_ERROR = 'Token认证失败,请重新登陆' // 定义的公共错误
const NETWORK_ERROR = '网络请求异常,请稍后重试一下...' // 定义的公共错误

// 创建axios的实例对象 添加配置
// axios.create 可传参数
const service = axios.create({
  baseUrl: config.baseApi, // 默认的参数baseUrl -- baseApi: '/api',
  timeout: 8000, // 访问接口的超时时间 8s
})

// 请求时的拦截 axios官网的拦截 请求的地址-config.baseApi
// interceptors:拦截器
service.interceptors.request.use((req) => { // interceptors.request.use
  // console.log('每次调用接口的请求拦截',req)
  // 一些公共的请求机制 -- JWT Token验证机制
  const header = req.headers
  // 第一次登录时 获取不到 token -- 第一次初始为空
  const { token = '' } = storage.getItem('userInfo') || {} // Token 验证 
  // 'Bearer ' + token // 这里Bearer 不能写错 不能更改 代表令牌
  if (!header.Authorization) header.Authorization = 'Bearer ' + token // Token 验证
  return req
})

service.interceptors.response.use((res) => {
  // 一些公共的响应机制
  // 对返回的数据进行处理
  // console.log('每次调用接口的响应拦截',res)
  const { code, data, msg } = res.data // 取得返回值

  if (code === 200) {
    return data // 返回成功的数据
  } else if (code === 50001) { // code为50001时提示Token认证错误
    ElMessage.error(TOKEN_ERROR)
    setTimeout(() => {
      router.push('/login') // 未登录 或登录token失效导致 TOKEN_ERROR 返回登录页面
    }, 1500)
    return Promise.reject(TOKEN_ERROR)
  } else { // 其他错误 - 服务器端错误、网络请求异常
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

// 核心request函数
function request(options) {
  options.method = options.method || 'get' // 不传 method 默认为 get
  if (options.method.toLowerCase() === 'get') { // method字符大小写统一
    // 统一一下 属性是data 统一将data传入 赋值给params
    options.params = options.data
  }
  let isMock = config.mock // mock bug修改
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock // 传过来的 options.mock 判断是否开启mock
  }
  
  // 以下非常重要，环境配置，会出现 T0 级别的 BUG
  if (config.env === 'prod') { // 判断当前环境 如果为生产环境(线上) 需要修改baseURL为传过来的 config.baseApi
    service.defaults.baseURL = config.baseApi
  } else { // 当前环境 config.mock 是否开启   开启baseURL则为mockApi  否则baseURL使用 baseApi: '/api', 
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options) // 返回axios的实例对象 options 为 调用request时传递过来的method、data、mock
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