const router = require('koa-router')()
const User = require('../models/userSchema')
const utils = require('../utils/util')

const jwt = require('jsonwebtoken') // jwt验证
const util = require('../utils/util')

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

    const res = await User.findOne({ userName, userPwd }, 'userId userName userEmail state role deptId roleList') // User.findOne 查找账号密码

    const data = res._doc
    const token = jwt.sign({   // jwt验证
      data: data
    }, 'Jason', { expiresIn: '1h' }); // jwt验证 -- token失效时间

    if (res) {
      data.token = token  // jwt验证
      ctx.body = utils.success(res)
    } else {
      ctx.body = utils.fail('用户名或者密码不正确')
    }
  } catch (error) {
    ctx.body = utils.fail(error.msg)
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

module.exports = router
