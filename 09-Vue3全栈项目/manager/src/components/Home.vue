<script>
import { Setting, Check, Fold, Bell, ArrowDown } from '@element-plus/icons'
import TreeMenu from './TreeMenu.vue'
import Breadcrumb from './Breadcrumb.vue'
export default {
  name: 'home',
  components: {
    // setting: Setting,
    // check: Check,
    fold: Fold,
    bell: Bell,
    arrowDown: ArrowDown,
    TreeMenu,
    Breadcrumb,
  },
  data() {
    return {
      // userInfo: {
      //   userName: 'Jason',
      //   userEmail: 'jason@gmail.com',
      // },
      userInfo: this.$store.state.userInfo,
      isCollapse: false,
      noticeCount: 0,
      userMenu: [],
    }
  },
  mounted() {
    this.getNoticeCount()
    this.getMenuList()
  },
  methods: {
    handleLogout(e) {
      // 监控 下拉菜单的点击事件
      console.log(e)
      if (e == 'email') return
      this.$store.commit('saveUserInfo', '')
      this.userInfo = null
      this.$router.push('/login')
    },
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    async getNoticeCount() {
      const res = await this.$api.noticeCount()
      // console.log(res)
      this.noticeCount = res
    },
    async getMenuList() {
      const res = await this.$api.menuList()
      console.log(res)
      this.userMenu = res
    },
  },
}
</script>

<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <div class="logo">
        <img src="./../assets/logo.png" alt="" class="src" />
        <span>Manager</span>
      </div>

      <!-- 菜单部分 -->
      <!-- router 可以在路由后面自动 push index的值 -->
      <el-menu
        default-active="2"
        class="nav-menu"
        background-color="#001529"
        text-color="#fff"
        :collapse="isCollapse"
        router
      >
        <tree-menu :userMenu="userMenu"></tree-menu>
      </el-menu>
    </div>

    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <fold class="menu-fold" @click="toggle"></fold>
          <div class="bread">
            <breadcrumb></breadcrumb>
          </div>
        </div>
        <div class="user-info">
          <el-badge :is-dot="noticeCount > 0 ? true : false" class="user-badge">
            <el-icon class="el-icon-bell">
              <!-- <bell></bell> -->
            </el-icon>
          </el-badge>
          <!--  @command="handleLogout" 点击菜单触发的事件回调 -->
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userInfo.userName }}
              <!-- <el-icon class="el-icon-right">
              </el-icon> -->
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">
                  邮箱:{{ userInfo.userEmail }}
                </el-dropdown-item>
                <el-dropdown-item command="logout"> 退出 </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <!-- <div class="main-page"> -->
          <router-view></router-view>
        <!-- </div> -->
      </div>
    </div>
    <!-- <h1>学习vue3全栈管理系统</h1> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<style scoped lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    // overflow-y: auto; // 超出滚动条
    transition: width 0.5s; // 收缩的过渡效果
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 15px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      background-color: #001529;
      // .menu-setting {
      //   width: 20px;
      //   height: 20px;
      //   margin-right: 12px;
      // }
      border-right: none;
      height: calc(100vh - 50px);
    }
    &.fold {
      width: 64px;
    }
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px; // 左侧固定 右侧自适应
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        z-index: 10;
        display: flex;
        align-items: center;
        .menu-fold {
          width: 25px;
          height: 25px;
          margin-right: 15px;
        }
      }
      .user-info {
        z-index: 2;
        .user-badge {
          line-height: 20px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        height: 100%;
        background-color: #fff;
      }
    }
    &.fold {
      margin-left: 64px;
    }
    &.unfold {
      margin-left: 200px;
    }
  }
}
</style>
