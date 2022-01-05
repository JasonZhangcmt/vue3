<script>
// import { User, View } from '@element-plus/icons'
export default {
  name: 'login',
  data() {
    return {
      user: {
        userName: '',
        userPwd: '',
      },
      rules: {
        // 必填项required 为空时提示message 失去焦点时触发trigger:
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        userPwd: [{ required: true, message: '请输入密码名', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // goHome() {
    //   this.$router.push('/welcome')
    // },
    login() {
      this.$refs.userForm.validate((res) => {
        console.log(res)
        if (res) {
          this.$api.login(this.user).then((res) => {
            console.log(res)
            this.$store.commit('saveUserInfo', res)
            this.$router.push('/welcome') // 登陆成功 跳转首页
          })
        }
      })
    },
  },
  mounted() {
    // this.$request({
    //   method: 'get',
    //   url: '/login',
    //   data: {
    //     name: 'chris',
    //   },
    // }).then((res) => {
    //   console.log(res)
    // })
    // this.$storage.setItem('user', { name: '张军', age: '18' })
    // // 希望以下面的方式来调用,需要对request.js做出改变
    // this.$request
    //   .get('/login', { name: 'jason' }, { mock: true })
    //   .then((res) => {
    //     console.log(res)
    //   })
  },
  // computed: {
  //   userIcon() {
  //     return User
  //   },
  //   viewIcon() {
  //     return View
  //   },
  // },
}
</script>

<template>
  <div class="login-warpper">
    <div class="modal">
      <el-form :model="user" :rules="rules" status-icon ref="userForm">
        <div class="title">登录页</div>
        <el-form-item prop="userName">
          <!-- 计算属性 @element-plus/icons-vue 图标的使用-->
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            v-model="user.userName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            type="password"
            prefix-icon="el-icon-view"
            v-model="user.userPwd"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- <h1>欢迎来到登录页面</h1>
    <button @click="goHome">回首页</button> -->
  </div>
</template>

<style lang="scss">
.login-warpper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 35px;
    background: #fff;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 35px;
      line-height: 1.5;
      text-align: center;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
