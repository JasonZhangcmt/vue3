const mongoose = require('mongoose')

const leaveSchema = mongoose.Schema({
  orderNo: String,
  applyType: Number,
  startTime: {
    type: Date,
    default: Date.now()
  },//开始时间
  endTime: {
    type: Date,
    default: Date.now()
  },//结束时间
  applyUser: {
    userId: String,
    userName: String,
    userEmail: String,
  },
  leaveTime: String,
  reasons: String,
  auditUsers: String,
  curAuditUserName: String,
  auditFlows: [
    {
      userId: String,
      userName: String,
      userEmail: String,
    }
  ],
  auditLogs: [
    {
      userId: String,
      userName: String,
      createTime: Date,
      remark: String,
      action: String
    }
  ]
})

module.exports = mongoose.model('leaves', leaveSchema, 'leaves')