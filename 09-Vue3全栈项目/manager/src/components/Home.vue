<script>
import { Fold, Bell, ArrowDown } from '@element-plus/icons'
import TreeMenu from './TreeMenu.vue'
import Breadcrumb from './Breadcrumb.vue'
export default {
  name: 'home',
  components: {
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
      isCollapse: false, // 判断菜单收缩
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
      if (e == 'email') return // 下拉点击事件，email不操作，否则退出登录并返回登录页
      this.$store.commit('saveUserInfo', '')
      this.userInfo = {}
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
      // const res = await this.$api.permissionList()
      // console.log('用户的userMenu-传给TreeMenu组件渲染侧边栏菜单:', res)
      const { actionList, menuList } = await this.$api.permissionList()
      this.userMenu = menuList
      this.$store.commit('saveMenuList', menuList)
      this.$store.commit('saveActionList', actionList)
    },
    handleOpen(key, keyPath) {
      // index: 需要打开的 sub-menu 的 index
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // index: 需要收起的 sub-menu 的 index
      console.log(key, keyPath)
    },
  },
}
</script>

<template>
  <div class="basic-layout">
    <!-- 侧边栏 收缩 isCollapse -->
    <!-- :class 根据收缩动态绑定class -->
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <div class="logo">
        <img src="./../assets/logo.png" class="src" />
        <span v-if="!isCollapse">Manager</span>
      </div>
      <!-- 侧边栏 菜单部分 -->
      <!-- :collapse="isCollapse" 控制侧边栏收缩 -->
      <!-- router ElementPlus-Menu 属性 -->
      <!-- router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
      <!-- :unique-opened="true" E-Menu属性 是否只保持一个子菜单的展开 -->
      <!-- :collapse-transition="true" E-Menu属性 开启折叠动画(内部文字显示动画) -->
      <!-- mode="vertical" E-Menu属性 菜单展开方式(horizontal / vertical) -->
      <!-- @open="handleOpen" E-Menu方法 展开指定的sub-menu index: 需要打开的 sub-menu 的 index -->
      <el-menu
        class="nav-menu"
        background-color="#001529"
        text-color="#fff"
        :collapse="isCollapse"
        router
        :unique-opened="false"
        :collapse-transition="true"
        mode="vertical"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- @open="handleOpen" @close="handleClose" 在tree-menu中触发(一级菜单-系统管理触发) -->
        <!-- 自定义<tree-menu :userMenu="userMenu">组件 -->
        <!-- 将获取到的用户菜单权限List 渲染成菜单 -->
        <tree-menu :userMenu="userMenu"></tree-menu>
      </el-menu>
    </div>

    <!-- 右边栏 主体内容 -->
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <!-- 右边栏-上栏 顶部导航 -->
      <div class="nav-top">
        <!-- 右边栏-上栏-顶部导航-左侧 收缩按钮+面包屑组件 -->
        <div class="nav-left">
          <fold class="menu-fold" @click="toggle"></fold>
          <!-- 自定义面包屑组件 -->
          <!-- 点击 侧边栏 菜单部分 会push更改路由 面包屑目的：取出当前路由的title展示 -->
          <div class="bread">
            <breadcrumb></breadcrumb>
          </div>
        </div>
        <!-- 右边栏-上栏-顶部导航-右侧 登录用户的个人信息+消息提示+登出 -->
        <div class="user-info">
          <!-- <el-badge/> 出现在按钮、图标旁的数字或状态标记 -->
          <!-- :is-dot	小圆点提示 -->
          <el-badge :is-dot="noticeCount > 0 ? true : false" class="user-badge">
            <el-icon class="el-icon-bell"> </el-icon>
          </el-badge>
          <!-- <el-dropdown/> 下拉菜单 可以配置 click 激活或者 hover 激活 -->
          <!-- @command="handleLogout" 点击菜单触发的事件回调 下方<el-dropdown-item command="email">点击时的参数就是email -->
          <!-- split-button  -->
          <!-- trigger 触发下拉的行为 hover, click, contextmenu -->
          <el-dropdown
            split-button
            size="mini"
            trigger="hover"
            @command="handleLogout"
          >
            <span class="user-link">
              {{ userInfo.userName }}
            </span>

            <!-- Dropdown Slots -->
            <!-- 下拉列表，通常是 <el-dropdown-menu> 组件 -->
            <template #dropdown>
              <el-dropdown-menu>
                <!-- command 点击菜单项触发的事件回调 -->
                <!-- divided 显示分割线 -->
                <!-- icon 图标 -->
                <el-dropdown-item command="email" icon="el-icon-monitor">
                  邮箱:{{ userInfo.userEmail }}
                </el-dropdown-item>
                <el-dropdown-item command="logout" divided icon="el-icon-link">
                  退出
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <!-- 右边栏-下栏-主体内容 展示数据+操作(侧边栏点击后<router-view>动态展示组件) -->
      <div class="wrapper">
        <!-- 根据路由 这里默认打开欢迎页面 Welcome.vue -->
        <router-view></router-view>
      </div>
    </div>
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
    transition: width 0.2s; // 收缩的过渡效果
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
        // z-index: 10;
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
