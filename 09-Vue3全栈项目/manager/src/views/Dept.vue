<template>
  <div class="dept-manege">
    <div class="query-form">
      <el-form :inline="true" ref="queryForm">
        <el-form-item label="部门名称">
          <el-input
            placeholder="请输入部门名称"
            v-model="queryForm.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-button @click="getDeptList">查询</el-button>
          <el-button @click="handleReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button @click="handleOpen" type="primary">创建</el-button>
      </div>
      <el-table
        :data="deptList"
        row-key="_id"
        :tree-props="{ children: 'children' }"
        stripe
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          v-bind="item"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="action == 'create' ? '创建部门' : '编辑部门'"
      v-model="showModal"
      :before-close="handleClose"
    >
      <el-form
        ref="deptForm"
        :model="deptForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="上级部门" props="parentId">
          <el-cascader
            placeholder="请选择部门"
            v-model="deptForm.parentId"
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            :show-all-levels="true"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" props="deptName">
          <el-input
            placeholder="请输入部门名称"
            v-model="deptForm.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" props="userName">
          <el-select
            placeholder="请选择负责人"
            v-model="deptForm.userName"
            @change="handleUser"
          >
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="`${item.userId}/${item.userName}/${item.userEmail}`"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" props="userEmail">
          <el-input
            placeholder="请输入邮箱"
            v-model="deptForm.userEmail"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleSubmit" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dept',
  data() {
    return {
      queryForm: {
        deptName: '',
      },
      columns: [
        {
          label: '部门名称',
          prop: 'deptName',
        },
        {
          label: '负责人',
          prop: 'userName',
        },
        {
          label: '更新时间',
          prop: 'updateTime',
        },
        {
          label: '创建时间',
          prop: 'createTime',
        },
      ],
      deptList: [],
      pager: {
        pageNum: 1,
        pageSize: 10,
      },
      showModal: false,
      action: 'create',
      deptForm: {
        parentId: [null],
      },
      rules: {
        parentId: [
          {
            required: true,
            message: '请选择上级部门',
            trigger: 'blur',
          },
        ],
        deptName: [
          {
            required: true,
            message: '请输入部门名称',
            trigger: 'blur',
          },
        ],
        userName: [
          {
            required: true,
            message: '请选择负责人',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {
    this.getDeptList()
    this.getAllUserList()
  },
  methods: {
    handleEdit(row) {
      this.action = 'edit'
      this.showModal = true
      this.$nextTick(() => {
        Object.assign(this.deptForm, row)
      })
    },
    async handleDelete(_id) {
      this.action = 'delete'
      await this.$api.deptOperate({ action: this.action, _id })
      this.$message.success('删除成功')
      this.getDeptList()
    },
    async getDeptList() {
      let list = await this.$api.getDeptList(this.queryForm)
      this.deptList = list
    },
    handleOpen() {
      this.action = 'create'
      this.showModal = true
    },
    async getAllUserList() {
      this.userList = await this.$api.userAllList()
    },
    handleSubmit() {
      this.$refs.deptForm.validate(async (valid) => {
        if (valid) {
          let params = { ...this.deptForm, action: this.action }
          delete params.userEmail
          let res = await this.$api.deptOperate(params)
          if (res) {
            this.$message.success('操作成功')
            this.handleClose()
            this.getDeptList()
          }
        }
      })
    },
    handleReset(form) {
      // 拿到refs 将传过来的form重置
      // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs[form].resetFields()
    },
    handleClose() {
      this.handleReset('deptForm')
      this.showModal = false
    },
    handleUser(val) {
      console.log(val) // 1000002/admin/admin@imooc.com
      const [userId, userName, userEmail] = val.split('/')
      Object.assign(this.deptForm, { userId, userName, userEmail })
    },
    // handleQuery(){
    //   this.getDeptList()
    // }
  },
}
</script>
