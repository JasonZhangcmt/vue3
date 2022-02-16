import request from "../utils/request"
export default {
  login(param) {
    return request({
      url: '/users/login',
      method: 'post',
      data: param,
      // mock: true, // 使用mock 前端接口
      mock: false, // 不使用mock 后端接口
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
      // mock: true, // 是否使用mock
    })
  },
  permissionList() {
    return request({
      url: '/users/getPermissionList',
      method: 'get',
      // mock: true,
      data: {},
    })
  },

  userList(params) {
    return request({
      url: '/users/list',
      method: 'get',
      // mock: true, // 是否使用mock
      data: params,
    })
  },
  userAllList() {
    return request({
      url: '/users/all/list',
      method: 'get',
      // mock: true, // 是否使用mock
      // data: params,
    })
  },
  userDelete(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params,
      // mock: true, // 是否使用mock
    })
  },
  getRoleList(params) {
    return request({
      url: '/roles/allList',
      method: 'get',
      data: params,
      mock: false
      // mock: true, // 是否使用mock
    })
  },
  getDeptList(params) {
    return request({
      url: '/dept/list',
      method: 'get',
      data: params,
      // mock: true, // 是否使用mock
    })
  },
  userSubmit(params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params,
      // mock: true, // 是否使用mock
    })
  },
  menuSubmit(params) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data: params,
      // mock: true, // 是否使用mock
    })
  },
  roleList(params) {
    return request({
      url: '/roles/list',
      method: 'get',
      mock: false,
      data: params,
      // mock: true, // 是否使用mock
    })
  },
  roleOperate(params) {
    return request({
      url: '/roles/operate',
      method: 'post',
      data: params,
      // mock: true, // 是否使用mock
    })
  },
  updatePermission(params) {
    return request({
      url: '/roles/update/permission',
      method: 'post',
      data: params,
      // mock: true, // 是否使用mock
    })
  },
  deptOperate(params) {
    return request({
      url: '/dept/operate',
      method: 'post',
      data: params,
      // mock: true, // 是否使用mock
    })
  },
  // 审批列表
  getApplyList(params) {
    return request({
      url: '/leave/list',
      method: 'get',
      // mock: true,
      data: params
    })
  },
  leaveOperate(params) {
    return request({
      url: '/leave/operate',
      method: 'post',
      mock: true,
      data: params
    })
  }
}