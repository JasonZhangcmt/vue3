<template>
  <!-- 递归组件 -->
  <!-- userMenu 用户的侧边栏菜单权限 -->
  <!-- router	使用vue-router的模式，该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
  <!-- :index="menu.path" 点击时push到router路由里的路径( menu.path:"/system/user" )  -->
  <template v-for="menu in userMenu">
    <!-- 第一遍遍历的:index="menu.path"是最外层的菜单项(系统管理、审批管理) -->
    <el-sub-menu
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == '1'
      "
      :key="menu._id"
      :index="menu.path"
    >
      <!-- <template #title> 固定用法 显示插入的sub-menu的图标<i>与文字<span> -->
      <!-- v-slot can only be used on components or <template> tags. -->
      <!-- 第一遍遍历的:index="menu.menuName"是最外层的菜单项(系统管理、审批管理) -->
      <template #title>
        <i :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template>

      <!-- 递归调用组件 <tree-menu> -->
      <!-- 第二遍递归遍历的是menu.children :index="menu.children.menuName"是二级菜单的菜单项(用户管理、菜单管理、角色管理、部门管理) -->
      <tree-menu :userMenu="menu.children"></tree-menu>
    </el-sub-menu>
    <!-- 第二遍递归遍历 无三级菜单menu.children[0].menuType == '2'走这里  渲染二级菜单的菜单项(用户管理、菜单管理、角色管理、部门管理) -->
    <!-- :index="menu.path" path: "/system/user" -->
    <el-menu-item
      v-else-if="menu.menuType == 1"
      :key="menu._id"
      :index="menu.path"
    >
      {{ menu.menuName }}
    </el-menu-item>
  </template>
</template>
<script>
export default {
  name: 'TreeMenu',
  props: {
    userMenu: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
