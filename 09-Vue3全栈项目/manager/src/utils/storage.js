// localStorage的二次封装
import config from './../config'

export default {
  getStorage() { // 把localStorage取出来 JSON.parse() 取出的内容转换成JSON格式
    return JSON.parse(window.localStorage.getItem(config.namespace) || "{}")
  },
  setItem(key, val) { // 设置本地
    let storage = this.getStorage()
    // console.log(storage) -- 本地存储namespace对象
    storage[key] = val
    // 写入localStorage 的 namespace中
    // 调用时： this.$storage.setItem('user', { name: '张军', age: '18' })
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  getItem(key) {
    return this.getStorage()[key]
  },
  clearItem(key) {
    let storage = this.getStorage()
    delete storage[key] // 删除
    // 删除后的内容 写入localStorage namespace
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAll() {
    window.localStorage.clear()
  }
}