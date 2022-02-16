const router = require('koa-router')()
const util = require('../utils/util')
const Leave = require('../models/leaveSchema')
const Dept = require('../models/deptSchema')

router.prefix('/leave')
// 菜单列表查询
router.get('/list', async (ctx) => {
  const { applyState } = ctx.request.query;
  let authorization = ctx.request.headers.authorization
  let { data } = util.decoded(authorization)
  const { page, skipIndex } = util.pager(ctx.request.query)
  console.log("=>", data);
  let params = {
    "applyUser.userId": data.userId
  }

  if (applyState) params.applyState = applyState

  const query = Leave.find(params)
  const list = await query.skip(skipIndex).limit(page.pageSize)
  const total = await Leave.countDocuments(params)
  ctx.body = util.success({
    page: {
      ...page,
      total
    },
    list
  })
})

router.post('/operate', async (ctx) => {
  const { _id, action, ...params } = ctx.request.body
  let authorization = ctx.request.headers.authorization
  let { data } = util.decoded(authorization)
  if (action == 'create') {
    let orderNo = 'XJ'
    orderNo += util.formateDate(new Date, 'yyyyMMdd')
    const total = await Leave.countDocuments()
    params.orderNo = orderNo + total
    // 获取用户当前部门的id
    let id = data.deptId.pop()
    // 查找这个部门的负责人的信息
    let dept = await Dept.findById(id)
    // 获取人事部门 和 财务部门的信息
    let userList = await Dept.find({ deptName: { $in: ['人事', '财务'] } })
    let auditUsers = dept.userName // 这个是审批人的集合
    let curAuditUserName = dept.userName // 这个是当前 
    let auditFlows = [
      {
        userId: dept.userId,
        userName: dept.userName,
        userEmail: dept.userEmail
      }
    ]
    userList.map(item => {
      auditFlows.push({
        userId: item.userId,
        userName: item.userName,
        userEmail: item.userEmail
      })
      auditUsers += ',' + item.userName
    })
    params.auditUsers = auditUsers
    params.curAuditUserName = curAuditUserName
    params.auditFlows = auditFlows
    params.auditLogs = []
    params.applyUser = {
      userId: data.userId,
      userName: data.userName,
      userEmail: data.userEmail,
    }

    await Leave.create(params)
    ctx.body = util.success('', '创建成功')
  }
})


module.exports = router
