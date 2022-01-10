<template>
  <div class="user-manage">
    <!-- 上方查询/重置表单 -->
    <div class="query-form">
      <!-- :inline="true" 表单横向/纵向排列(默认) -->
      <!-- :model="user" 通过user对象 便于双向绑定 -->
      <!-- ref="form" 重置表单用 -->
      <!-- :rules="rules" 表单验证规则 -->
      <el-form :inline="true" :model="user" ref="form">
        <!-- label="用户ID" prop="userId" 重置表单用 -->
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="user.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <!-- 可下拉单选框 -->
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 下方展示用户信息table -->
    <div class="base-table">
      <!-- table上方 新增/删除按钮 -->
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDelete">批量删除</el-button>
      </div>
      <!-- table下方 table主题内容 -->
      <!-- @selection-change="handleSelectionChange" 为批量删除操作传当前项目的userId -->
      <el-table
        :data="userList.arr"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- :prop="item.prop" 表单验证、重置表单 -->
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="240">
          <!-- #default="scope" 传递参数 scope.row -->
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top">
              <template #default>
                <p>姓名: {{ scope.row.userName }}</p>
                <p>用户角色: {{ showRole(scope.row.role) }}</p>
                <p>电话: {{ scope.row.mobile }}</p>
                <p>职位: {{ scope.row.job }}</p>
              </template>
              <template #reference>
                <template class="name-wrapper">
                  <el-button type="info" size="mini">详情</el-button>
                </template>
              </template>
            </el-popover>
            <el-button
              @click.prevent="handleEdit(scope.row)"
              type="primary"
              size="mini"
            >
              编辑
            </el-button>
            <el-button
              @click.prevent="handleDelete(scope.row)"
              type="danger"
              size="mini"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="pagination"
        background
        layout="sizes, prev, pager, next, jumper"
        :total="pager.total"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pager.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <!-- 点击新增显示模态框 Modal -->
    <el-dialog title="用户新增" v-model="showModal">
      <el-form
        :model="userForm"
        ref="dialogForm"
        label-width="70px"
        :rules="rules"
      >
        <el-form-item prop="userName" label="用户名">
          <el-input
            placeholder="请输入用户名"
            v-model="userForm.userName"
            :disabled="action == 'edit'"
          ></el-input>
          <!-- :disabled="action=='edit'" 判断当前是否是修改操作-禁止修改 -->
        </el-form-item>
        <el-form-item prop="userEmail" label="邮箱">
          <el-input
            placeholder="请输入邮箱"
            v-model="userForm.userEmail"
            :disabled="action == 'edit'"
          >
            <template #append> @qq.com </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
          <el-input
            placeholder="请输入手机号"
            v-model="userForm.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item prop="job" label="岗位">
          <el-input placeholder="请输入岗位" v-model="userForm.job"></el-input>
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-select v-model="userForm.state">
            <el-option label="在职" :value="1"></el-option>
            <el-option label="离职" :value="2"></el-option>
            <el-option label="试用期" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="roleList" label="系统角色">
          <!-- multiple style="width: 100%" 实现多选 -->
          <el-select
            v-model="userForm.roleList"
            placeholder="请选择用户系统角色"
            multiple
            style="width: 100%"
          >
            <!-- 动态获取数据得到roleList内容 -->
            <el-option
              v-for="role in roleList"
              :value="role._id"
              :key="role._id"
              :label="role.roleName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="deptId" label="部门">
          <!-- 级联 -->
          <el-cascader
            v-model="userForm.deptId"
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            placeholder="请选择部门"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleSubmit" type="primary"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, reactive, ref, getCurrentInstance, toRaw } from 'vue'
import utils from '../utils/utils.js'
export default {
  name: 'User',
  // Vue3
  setup() {
    // proxy getCurrentInstance() 获取全局对象 类似于 options api 里面的 this
    const { proxy } = getCurrentInstance()
    // 生命周期函数
    onMounted(() => {
      console.log('...init')
      getUserList()
      getRoleList()
      getDeptList()
      // document.getElementsByClassName(
      //   'el-pagination__jump'
      // )[0].childNodes[0].nodeValue = '前往'
      // var oTxt = document.createTextNode('页')
      // document
      //   .getElementsByClassName('el-pagination__jump')[0]
      //   .appendChild(oTxt)
    })
    // 一般数据类型的初始化
    const age = ref(0)
    // 引用数据类型的初始化 -- 查找的数据
    const user = reactive({
      state: 0, // 初始化为0
    })

    // 引用数据类型的初始化 -- 用户列表
    const userList = reactive({
      arr: [],
    })
    // 引用数据类型的初始化 -- 表格的列的配置 -- 表格列的文字
    const columns = reactive([
      {
        label: '用户ID',
        prop: 'userId',
        // width: '100px',
      },
      {
        label: '用户名',
        prop: 'userName',
        // width: '100px',
      },
      {
        label: '用户邮箱',
        prop: 'userEmail',
        // width: '200px',
      },
      {
        label: '用户角色',
        prop: 'role',
        width: '100px',
        formatter(row, column, value) {
          // 格式化列表中的内容 数字-->指定文本
          return {
            0: '管理员',
            1: '普通用户',
          }[value]
        },
      },
      {
        label: '用户状态',
        prop: 'state',
        width: '100px',
        formatter(row, column, value) {
          // 格式化列表中的内容 数字-->指定文本
          return {
            1: '在职',
            2: '离职',
            3: '试用期',
          }[value]
        },
      },
      {
        label: '注册时间',
        prop: 'createTime',
        width: '120px',
        formatter(row, column, value) {
          // 格式化列表中的日期
          return utils.formateDate(new Date(value),'yyyy年MM月dd日 hh:mm:ss')
        },
      },
      {
        label: '最后登录时间',
        prop: 'lastLoginTime',
        width: '120px',
        formatter(row, column, value) {
          // 格式化列表中的日期
          return utils.formateDate(new Date(value),'yyyy年MM月dd日 hh:mm:ss')
        },
      },
    ])

    // 引用数据类型的初始化 -- 表格分页的配置
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 10,
    })

    // 根据参数 -- 获取用户列表
    const getUserList = async () => {
      let params = { ...user, ...pager }
      const { page, list } = await proxy.$api.userList(params)
      pager.total = page.total // 分页数量
      userList.arr = list
      console.log('用户信息:', userList.arr[0])
    }
    // 查找功能 --
    const handleQuery = () => {
      getUserList()
    }
    // 查找重置
    const handleReset = (form) => {
      // 拿到refs 将传过来的form重置
      proxy.$refs[form].resetFields()
    }
    // 分页点击操作
    const handleCurrentChange = (current) => {
      pager.pageNum = current
      getUserList()
    }
    // 分页size
    const handleSizeChange = (size) => {
      pager.pageSize = size
      getUserList()
    }
    // 用户单个删除
    const handleDelete = async (row) => {
      console.log('删除单项', row)
      console.log('删除单项Id:', row.userId)
      const res = await proxy.$api.userDelete({
        userIds: [row.userId],
      })
      if (res.nModified > 0) {
        proxy.$message.success('删除成功')
        getUserList()
      } else {
        proxy.$message.success('删除失败')
      }
    }
    // 用户批量删除
    const checkedUsersIds = ref([])
    const handlePatchDelete = async () => {
      if (checkedUsersIds.value.length == 0) {
        proxy.$message.error('请选择需要删除的用户')
        return
      } else {
        const res = await proxy.$api.userDelete({
          userIds: checkedUsersIds.value,
        })
        if (res.nModified > 0) {
          proxy.$message.success('删除成功')
          getUserList()
        } else {
          proxy.$message.success('删除失败')
        }
      }
    }
    const handleSelectionChange = (list) => {
      // console.log(list)
      let arr = []
      list.forEach((element) => {
        arr.push(element.userId)
      })
      checkedUsersIds.value = arr
    }
    // 用户新增
    const showModal = ref(false)
    const userForm = reactive({
      // reactive 这里的定义必须是reactive??不能是ref
      state: 1, // 默认的状态为1：在职
    })
    const handleCreate = () => {
      action.value = 'add'
      showModal.value = true
    }
    // 表单验证规则
    const rules = reactive({
      userName: [
        {
          required: true,
          message: '请输入用户名称',
          trigger: 'blur',
        },
      ],
      userEmail: [
        {
          required: true,
          message: '请输入用户邮箱',
          trigger: 'blur',
        },
      ],
      deptId: [
        {
          required: true,
          message: '请选择部门',
          trigger: 'blur',
        },
      ],
      mobile: [
        {
          pattern: /1[3-9]\d{9}/, // 手机号码正则: 第一个数1 第二个数[3-9] 后面跟9个数
          message: '请输入正确的手机格式',
        },
      ],
    })
    // 角色
    const roleList = ref([])

    const getRoleList = async () => {
      const res = await proxy.$api.getRoleList()
      roleList.value = res
    }
    // 部门
    const deptList = ref([])
    const getDeptList = async () => {
      const res = await proxy.$api.getDeptList()
      deptList.value = res
    }
    const handleClose = () => {
      showModal.value = false
      handleReset('dialogForm')
    }
    // 修改
    const action = ref('add')
    const handleSubmit = () => {
      proxy.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let param = toRaw(userForm) // 把双向绑定对象变成普通对象
          // console.log(userForm.userEmail)
          // console.log(userForm.userName)
          param.userEmail = param.userEmail + '@qq.com'
          param.action = action.value
          let res = await proxy.$api.userSubmit(param)
          if (res) {
            showModal.value = false
            proxy.$message.success('新增用户成功')
            handleReset('dialogForm')
            getUserList()
          }
        }
      })
    }
    const handleEdit = (row) => {
      action.value = 'edit'
      showModal.value = true
      // proxy.$nextTick(() =>{} 回调函数--页面完全渲染完成后
      proxy.$nextTick(() => {
        // row.role = showRole(row.role)
        // console.log(row)
        Object.assign(userForm, row)
      })
    }
    const showRole = (role) => {
      if (role == '0') {
        return '管理员'
      }
      return '普通用户'
    }
    const showState = (state) => {
      if (state == '1') {
        return '在职'
      } else if (state == '2') {
        return '离职'
      } else return '试用期'
    }
    return {
      user,
      userList,
      columns,
      userForm,
      handleQuery,
      handleReset,
      pager,
      handleCurrentChange,
      handleSizeChange,
      handleDelete,
      handlePatchDelete,
      handleSelectionChange,
      showModal,
      handleCreate,
      rules,
      getRoleList,
      roleList,
      getDeptList,
      deptList,
      handleClose,
      handleSubmit,
      action,
      handleEdit,
      showRole,
      showState
    }
  },
}
</script>

<style lang="scss"></style>
