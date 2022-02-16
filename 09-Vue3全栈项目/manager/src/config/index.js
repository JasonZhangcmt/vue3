// 环境配置的封装
// console.log("main.js打印环境变量:", import.meta.env)
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  // 开发环境
  dev: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/fc3caef6be18cdbe5c3b1619b2145ace/api'
  },
  // 测试环境
  test: {
    baseApi: '/test/future.com/api',
    mockApi: 'https://www.fastmock.site/mock/fc3caef6be18cdbe5c3b1619b2145ace/api'
  },
  // 生产环境
  prod: {
    baseApi: '/future.com/api',
    mock: 'https://www.fastmock.site/mock/fc3caef6be18cdbe5c3b1619b2145ace/api'
  }
}

export default {
  env,
  // mock: true, // mock的开关
  mock: false, // mock的开关
  ...EnvConfig[env], // 扩展运算
  namespace: 'manage' // 命名空间 localStorage封装
}

// 扩展运算 如果 env = 'dev'
// 相当于
// export default {
//   env,
//   mock: true,
//   baseApi: '/',
//   mockApi: ''
// }