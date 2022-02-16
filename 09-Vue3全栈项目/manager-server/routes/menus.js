const router = require('koa-router')()
const Menu = require('../models/menuSchema')
const util = require('../utils/util')
router.prefix('/menu')

// 菜单列表查询
router.get('/list', async (ctx) => {
  const { menuName, menuState } = ctx.request.query
  let params = {}
  if (menuState) params.menuState = menuState
  if (menuName) params.menuState = menuName
  let rootList = await Menu.find(params) || []
  console.log(rootList)
  const permissionList = getMenuTree(rootList, null, [])
  ctx.body = util.success(permissionList)
})

// 递归树 递归创建的菜单层级
function getMenuTree(rootList, id, list) {
  for (let i = 0; i < rootList.length; i++) {
    let item = rootList[i]
    if (String(item.parentId.slice().pop()) == String(id)) {
      list.push(item._doc)
    }
  }
  list.map(item => {
    item.children = []
    getMenuTree(rootList, item._id, item.children)
    if (item.children.length == 0) {
      delete item.children
    } else if (item.children.length > 0 && item.children[0].menuType == 2) {
      item.action = item.children // 快速区分按钮和菜单 这里用于后期做按钮权限
    }
  })
  return list
}

router.post('/operate', async (ctx) => {
  const { _id, action, ...params } = ctx.request.body
  let res, info

  try {
    if (action == 'add') {
      res = await Menu.create(params)
      info = '创建成功'
    } else if (action == 'edit') {
      params.updateTime = new Date()
      await Menu.findByIdAndUpdate(_id, params)
      info = '编辑成功'
    } else {
      await Menu.findByIdAndRemove(_id)
      await Menu.deleteMany({ parentId: { $all: [_id] } })
      info = '删除成功'
    }
    ctx.body = util.success({}, info)
  } catch (error) {

  }


})
module.exports = router
