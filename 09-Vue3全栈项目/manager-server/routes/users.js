const router = require('koa-router')()
const User = require('../models/userSchema')
const utils = require('../utils/util')

const jwt = require('jsonwebtoken') // jwt验证
const util = require('../utils/util')

const Counter = require('../models/counterSchema')
const md5 = require('md5')

const Menu = require('../models/menuSchema')
const Role = require('../models/roles')


router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body
    // 这里可以 指定返回的字段 三种方式
    // 1. const res = await User.findOne({ userName, userPwd }, 'roleList')
    // 1. const res = await User.findOne({ userName, userPwd }, 'userId userName userEmail state role deptId roleList ')

    // 2. {userId:1, _id:0} 为1的返回 为0的不返回
    // 2. const res = await User.findOne({ userName, userPwd }, {userId:1, _id:0}) // User.findOne 查找账号密码

    // 3. select('userId')
    // 3. const res = await User.findOne({ userName, userPwd }).select('userId') // User.findOne 查找账号密码

    // 新增账号的密码是经过加密的 这里的userPwd也需要加密比对 找不到res
    // const res = await User.findOne({ userName, userPwd }, 'userId userName userEmail state role deptId roleList') // User.findOne 查找账号密码
    const res = await User.findOne({ userName, userPwd: md5(userPwd) }, 'userId userName userEmail state role deptId roleList') // User.findOne 查找账号密码

    // 新增账号的密码是经过加密的 这里的userPwd也需要加密比对 找不到res
    // const data = res._doc
    // const token = jwt.sign({   // jwt验证
    //   data: data
    // }, 'Jason', { expiresIn: '1h' }); // jwt验证 -- token失效时间

    if (res) {
      const data = res._doc
      const token = jwt.sign({   // jwt验证
        data: data
      }, 'Jason', { expiresIn: '1h' }); // jwt验证 -- token失效时间

      data.token = token  // jwt验证
      ctx.body = utils.success(res)
    } else {
      ctx.body = utils.fail('用户名或者密码不正确')
    }
  } catch (error) {
    ctx.body = utils.fail(error.msg) // '用户名或者密码不正确' 返回的错误信息
  }
},
)

router.get('/list', async (ctx) => {
  const { userId, userName, state } = ctx.request.query
  const { page, skipIndex } = util.pager(ctx.request.query)

  let params = {}
  if (userId) params.userId = userId
  if (userName) params.userName = userName
  if (state && state != '0') params.state = state

  try {
    const query = User.find(params, { _id: 0, userPwd: 0 })
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await User.countDocuments(params)

    ctx.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })

  } catch (err) {
    ctx.body = util.fail(`查询异常${err.stack}`)
  }

})

// 删除操作
router.post('/delete', async (ctx) => {
  const { userIds } = ctx.request.body
  // 把用户的状态变成离职
  const res = await User.updateMany({ userId: { $in: userIds } }, { state: 2 })
  if (res.modifiedCount) {
    ctx.body = util.success(res, `共删除成功${res.modifiedCount} 条`)
    return

  } else {
    ctx.body = util.fail('删除失败')
  }
})

// 编辑操作
router.post('/operate', async (ctx) => {
  const { userId, userName, userEmail, mobile, job, state, roleList, deptId,
    action } = ctx.request.body
  if (action == 'add') {
    if (!userName || !userEmail || !deptId) {
      ctx.body = util.fail('参数错误', util.CODE.PARAM_ERROR)
      return
    }
    // 新增用户
    const res = await User.findOne({ $or: [{ userName }, { userEmail }] }, '_id userName userEmail')
    if (res) { // 用户名重复
      ctx.body = util.fail(`存在重复的用户,信息如下: ${res.userName}-${res.userEmail}`)
      return
    } else {
      try {
        const doc = await Counter.findOneAndUpdate({ _id: 'userId' }, { $inc: { sequence_value: 1 } })
        const user = new User({
          userId: doc.sequence_value,
          userName,
          userPwd: md5('123456'),
          userEmail,
          role: 1,
          roleList,
          state,
          job,
          deptId,
          mobile
        })
        user.save()
        ctx.body = util.success({}, '用户创建成功')
        return
      } catch (error) {
        ctx.fail(error, stack, '用户创建失败')
      }
    }
  }
  else {
    if (!deptId) {
      ctx.body = util.fail('部门不能为空', util.CODE.PARAM_ERROR)
      return
    }
  }
  try {
    // 更新{ mobile, job, state, roleList, deptId }
    const res = await User.findOneAndUpdate({ userId }, { mobile, job, state, roleList, deptId })
    ctx.body = util.success(res, '更新成功')
  } catch (error) {
    ctx.body = util.fail('更新失败')
  }
})


router.get('/all/list', async (ctx) => {
  try {
    const list = await User.find({}, "userId userName userEmail")
    ctx.body = util.success(list)
  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})

router.get('/getPermissionList', async (ctx) => {
  // 解密的操作
  let authorization = ctx.request.headers.authorization
  let { data } = util.decoded(authorization)
  let menuList = await getMenuList(data.role, data.roleList)
  let actionList = getActionList(JSON.parse(JSON.stringify(menuList)))
  ctx.body = util.success({ actionList, menuList })

  // ctx.body = util.success({ menuList })

})

async function getMenuList(userRole, roleKeys) {
  let rootList = []
  if (userRole == 0) {
    rootList = await Menu.find({}) || []
  } else {
    let roleList = await Role.find({ _id: { $in: roleKeys } })
    let permissionList = []
    roleList.map(role => {
      let { checkedKeys, halfCheckedKeys } = role.permissionList
      permissionList = permissionList.concat(...checkedKeys, ...halfCheckedKeys)
    })
    permissionList = [...new Set(permissionList)]
    rootList = await Menu.find({ _id: { $in: permissionList } })
  }

  return util.getTree(rootList, null, [])
}

function getActionList(list) {
  // 返回权限标识
  const actionList = []
  const deep = (arr) => {
    while (arr.length) {
      let item = arr.pop()
      if (item.action) {
        item.action.map(action => {
          actionList.push(action.menuCode)
        })
      }
      if (item.children && !item.action) {
        deep(item.children)
      }
    }
  }

  deep(list)

  return actionList

}

module.exports = router
