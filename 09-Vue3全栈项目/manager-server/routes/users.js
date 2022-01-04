const router = require('koa-router')()
const User = require('../models/userSchema')
const utils = require('../utils/util')
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
    const res = await User.findOne({ userName, userPwd }) // User.findOne 查找账号密码
    if (res) {
      ctx.body = utils.success(res)
    } else {
      ctx.body = utils.fail('用户名或者密码不正确')
    }
  } catch (error) {
    ctx.body = utils.fail(error.msg)
  }
},
)
module.exports = router
