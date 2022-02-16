const router = require('koa-router')()
const Role = require('../models/roles')
const utils = require('../utils/util')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
router.prefix('/roles')



router.get('/allList', async (ctx) => {
  try {
    const list = await Role.find({}, "_id roleName")
    ctx.body = utils.success(list)
  } catch (error) {
    ctx.body = utils.fail(`查询失败${error.stack}`)
  }
})

router.get('/list', async (ctx) => {
  const { roleName } = ctx.request.query
  const { page, skipIndex } = utils.pager(ctx.request.query)
  try {
    let params = {}
    if (roleName) params.roleName = roleName
    const query = Role.find(params)
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await Role.countDocuments(params)
    ctx.body = utils.success({
      list,
      page: {
        ...page,
        total
      }
    })
  } catch (error) {
    ctx.body = utils.fail(`查询失败${error.stack}`)
  }
})

router.post('/operate', async (ctx) => {
  const { _id, roleName, remark, action } = ctx.request.body
  let res, info
  try {
    if (action == 'create') {
      res = await Role.create({ roleName, remark })
      info = '创建成功'
    } else if (action == 'edit') {
      if (_id) {
        let params = { roleName, remark }
        params.updateTime = new Date()
        res = await Role.findByIdAndUpdate(_id, params)

      } else {
        ctx.body = utils.fail(`缺少参数params:_id`)
        return
      }
    } else {
      if (_id) {
        res = await Role.findByIdAndDelete(_id)
        info = '删除成功'
      } else {
        ctx.body = utils.fail(`删除失败`)
        return
      }
    }
    ctx.body = utils.success(res, info)
  } catch (error) {
    ctx.body = utils.fail(`操作失败${error.stack}`)
  }
})

router.post('/update/permission', async (ctx) => {
  const { _id, permissionList } = ctx.request.body
  try {
    let params = { permissionList, updateTime: new Date() }
    let res = await Role.findByIdAndUpdate(_id, params)
    ctx.body = utils.success(res, '权限设置成功')
  } catch (error) {
    ctx.body = utils.fail(`设置权限失败`)
  }
})
module.exports = router
