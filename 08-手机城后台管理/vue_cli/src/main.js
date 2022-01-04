import Vue from 'vue'
import App from './App.vue'
import router from './router' // 自己配置的路由文件
import store from './store'
import http from 'axios' // axios配置1
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)

// 按需引入
import {
  Button,
  Select,
  Radio,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Tag,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'
// Vue.component(Button.name, Button)
Vue.use(Button)
Vue.component(Select.name, Select)
Vue.component(Radio.name, Radio)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.prototype.$http = http // axios配置2

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') require('@/api/mock')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
