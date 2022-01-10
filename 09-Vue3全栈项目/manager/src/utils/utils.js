export default {
  formateDate(date, rule) {
    let fmt = rule || 'yyyy-MM-dd hh:mm:ss';

    // 通过$1匹配yyyy的值
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, date.getFullYear())
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    }

    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const val = o[k] + ''
        // console.log(RegExp.$1)
        // console.log(val)
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length))
      }
    }

    return fmt
  }
}