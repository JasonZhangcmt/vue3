const router = require('koa-router')()
const util = require('../utils/util')
const Dept = require('../models/deptSchema')

router.prefix('/dept')
// 菜单列表查询
router.get('/list', async (ctx) => {
  const { deptName } = ctx.request.query;
  const params = {}
  if (deptName) params.deptName = deptName;
  let rootList = await Dept.find(params) || []
  // console.log(rootList)
  // console.log(rootList);
  const permissionList = getDeptTree(rootList, null, [])


  if (deptName) {
    ctx.body = util.success(rootList);
  } else {
    ctx.body = util.success(permissionList);
  }
})
// [
//   {
//     _id: new ObjectId("61a8b9b2ed448cfa1c2cb001"),
//     menuType: 1,
//     menuName: '系统管理',
//     path: '/system',`
//     __v: 0,
//      parentId: [ null ],
//   },
//   {
//     _id: new ObjectId("61a8b9caed448cfa1c2cb004"),
//     menuType: 1,
//     menuName: '用户管理',
//     path: '/system/user',
//     icon: '',
//     component: '/system/user',
//     menuState: 1,
//     parentId: [ new ObjectId("61a8b9b2ed448cfa1c2cb001") ],
//     __v: 0
//   }
// ]
// 就是递归树
// getMenuTree(rootList, null, [])
function getDeptTree(rootList, id, list) {
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
    getDeptTree(rootList, item._id, item.children)
    if (item.children.length == 0) {
      delete item.children
    } else if (item.children.length > 0 && item.children[0].menuType == 2) {
      item.action = item.children // 快速区分按钮和菜单 用于后期做按钮权限这一块
    }
  })
  return list
}

router.post('/operate', async (ctx) => {
  const { _id, action, ...params } = ctx.request.body
  let info

  try {
    if (action == 'create') {
      await Dept.create(params)
      info = '创建成功'
    } else if (action == 'edit') {
      params.updateTime = new Date()
      await Dept.findByIdAndUpdate(_id, params)
      info = '编辑成功'
    } else {
      await Dept.findByIdAndRemove(_id)
      await Dept.deleteMany({ parentId: { $all: [_id] } })
      info = '删除成功'
    }
    ctx.body = util.success({}, info)
  } catch (error) {
    ctx.body = util.fail({}, error.stack)
  }


})



module.exports = router
