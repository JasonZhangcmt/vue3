import request from "../utils/request"
export default {
  login(param) {
    return request({
      url: '/users/login',
      method: 'post',
      data: param,
      // mock: true, // 是否使用mock
      mock: false, // 是否使用mock
    })
  },
  noticeCount() {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {},
      mock: true, // 是否使用mock
    })
  },
  menuList() {
    return request({
      url: '/menu/list',
      method: 'get',
      data: {},
      mock: true, // 是否使用mock
    })
  },
  userList(params) {
    return request({
      url: '/users/list',
      method: 'get',
      // mock: true, // 是否使用mock
      mock: false, // 是否使用mock
      data: params,
    })
  },
  userDelete(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params,
      mock: true, // 是否使用mock
    })
  },
  getRoleList(params) {
    return request({
      url: '/roles/allList',
      method: 'get',
      data: params,
      mock: true, // 是否使用mock
    })
  },
  getDeptList(params) {
    return request({
      url: '/dept/list',
      method: 'get',
      data: params,
      mock: true, // 是否使用mock
    })
  },
  userSubmit(params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params,
      mock: true, // 是否使用mock
    })
  }
}