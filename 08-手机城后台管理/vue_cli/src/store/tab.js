/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
// 控制CommonAside的伸缩
export default {
  state: {
    // isCollapse: false, // 控制CommonAside的伸缩
    isCollapseTest: true,
    currentMenu: null,
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home',
      }
    ]
  },
  mutations: {
    // collapseMenu(state) {
    //   state.isCollapse = !state.isCollapse
    // },
    collapseMenu2(state) {
      // state.isCollapse = !state.isCollapse
      state.isCollapseTest = !state.isCollapseTest
    },
    selectMenu(state, val) {
      val.name === 'home' ? (state.currentMenu = null) : state.currentMenu = val
      if (val.name == 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val
        // 新增tabList
        const result = state.tabsList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabsList.push(val) : ''
      }
    },
    // 关闭标签
    closeTag(state, val) {
      const result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1) // 找到这一项 删除这一项tab
    },
  },
}
