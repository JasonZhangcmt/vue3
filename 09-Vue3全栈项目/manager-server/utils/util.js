// **通用结构体**
// 分页结构
// 返回结构
// 错误码
// 公共请求头携带token
// 角色
const log4js = require('./log4j')
const jwt = require('jsonwebtoken')

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
  // 结构 {pageNum = 1, pageSize = 10}
  pager({ pageNum = 1, pageSize = 10 }) {
    pageNum *= 1 // 隐式转换number类型
    pageSize *= 1 // 隐式转换number类型
    const skipIndex = (pageNum - 1) * pageSize // 索引的开始位置
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
  fail(msg = '', code = CODE.BUSINESS_ERROR, data) {
    // 请求失败
    log4js.debug(msg)
    return {
      code,
      data,
      msg
    }
  },
  CODE,
  decoded(authorization) {
    if (authorization) {
      let token = authorization.split(' ')[1]
      return jwt.verify(token, 'Jason')
    }
    return ''
  },
  getTree(rootList, id, list) {
    for (let i = 0; i < rootList.length; i++) {
      let item = rootList[i]
      // js的基本功了
      if (String(item.parentId.slice().pop()) == String(id)) {
        // 
        list.push(item._doc)
      }
    }
    list.map(item => {
      item.children = []
      this.getTree(rootList, item._id, item.children)
      if (item.children.length == 0) {
        delete item.children
      } else if (item.children.length > 0 && item.children[0].menuType == 2) {
        item.action = item.children // 快速区分按钮和菜单 用于后期做按钮权限这一块
      }
    })
    return list
  },
}

