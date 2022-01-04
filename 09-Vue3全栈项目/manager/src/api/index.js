import request from "../utils/request"
export default {
  login(param) {
    return request({
      url: '/users/login',
      method: 'post',
      data: param,
      // mock: true, // 是否使用mock
    })
  },
  noticeCount() {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {}
      // mock: true, // 是否使用mock
    })
  },
  menuList() {
    return request({
      url: '/menu/list',
      method: 'get',
      data: {}
      // mock: true, // 是否使用mock
    })
  }
}