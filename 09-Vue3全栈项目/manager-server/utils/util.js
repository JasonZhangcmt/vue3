// **通用结构体**
// 分页结构
// 返回结构
// 错误码
// 公共请求头携带token
// 角色
const log4js = require('./log4j')

const CODE = {
  SUCCESS: 200,
  PARAM_ERROR: 10001,// 参数错误
  USER_ACCOUNT_ERROR: 20001,// 账号或者密码错误
  USER_LOGIN_ERROR: 30001,// 用户未登录
  BUSINESS_ERROR: 40001,// 业务请求失败
  AUTH_ERROR: 50001,// 认证失败或者token过期
}

module.exports = {
  /**
   * 分页函数封装
   * @param {number} pageNum
   * @param {number} pageSize 
   */
  pager(pageNum = 1, pageSize = 10) {
    pageNum *= 1 // 隐式转换number类型
    pageSize *= 1 // 隐式转换number类型
    const skipIndex = (pageNum - 1) * pageSize
    return {
      page: {
        pageNum,
        pageSize
      },
      skipIndex
    }
  },
  success(data = '', msg = '', code = CODE.SUCCESS) {
    // 请求成功
    log4js.debug(data) // 引用封装的log4js,处理信息
    return {
      code,
      data,
      msg
    }
  },
  fail (msg = '', code = CODE.BUSINESS_ERROR, data) {
    // 请求失败
    log4js.debug(msg)
    return {
      code,
      data,
      msg
    }
  },
  CODE
}

