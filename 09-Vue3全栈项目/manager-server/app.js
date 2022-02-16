const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const jwt = require('jsonwebtoken') // Token 验证
const koajwt = require('koa-jwt') // koa-jwt 中间件
// const logger = require('koa-logger')
// const log4js = require("log4js");


const log4js = require("./utils/log4j") // 引入 log4js 打印日志
const util = require('./utils/util')


// const index = require('./routes/index')
const router = require('koa-router')() // 登录前后端

// **********
const users = require('./routes/users')
const menus = require('./routes/menus')
const roles = require('./routes/roles')
const depts = require('./routes/depts')
const leaves = require('./routes/leaves')


// error handler
onerror(app)

require('./config/db')
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())


// // app.use(logger())
// const logger = log4js.getLogger();
// logger.level = "debug";
// logger.debug("Some debug messages");

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 手动错误
// app.use(()=>{
//   ctx.bosy('error - body')
// })

// logger
app.use(async (ctx, next) => {
  // 服务端 希望看到前端请求过来的数据
  log4js.info(`get params:${JSON.stringify(ctx.request.query)}`)
  log4js.info(`post params:${JSON.stringify(ctx.request.body)}`)

  // const start = new Date()
  await next().catch((error) => {
    if (error.status == '401') {
      ctx.status = 200
      ctx.body = util.fail('Token认证失败', util.CODE.AUTH_ERROR)
    } else {
      throw error
    }
  })
  // log4js.info('info output')
  // const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(koajwt({ secret: 'Jason' }).unless({
  path: [/^\/api\/users\/login/]
})) // koa-jwt 中间件
router.prefix('/api')
router.get('/leave/count', (ctx) => {
  // Token 验证 -- 获取前端传来的 token
  const token = ctx.request.headers.authorization.split(" ")[1]

  // Token 验证 -- 拿到前端携带过来的 token 进行验证 签名为 Jason
  const payload = jwt.verify(token, 'Jason')
  ctx.body = payload
})

// **********
router.use(users.routes()), users.allowedMethods()
router.use(menus.routes()), menus.allowedMethods()
router.use(roles.routes()), roles.allowedMethods()
router.use(depts.routes()), depts.allowedMethods()
router.use(leaves.routes()), leaves.allowedMethods()


app.use(router.routes(), users.allowedMethods())

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())


log4js.info('info output')
// error-handling
app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
  log4js.error(`${err.stack}`)
});

module.exports = app
