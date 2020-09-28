import Taro from '@tarojs/taro';
/** 判断对象函数
   * @isObject Object函数
*/
export function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}
/** 获取指针位置
   * @getIndicatorHeight 指针位置函数
*/
export function getIndicatorHeight() {
  return Math.round(Taro.getSystemInfoSync().screenWidth / (750 / 100))
}
/**
   * @debounce 防抖函数
   * @param fn 执行函数
   * @param time 时间间隔
*/
export function debounce(fn, time) {
    let timer = null
    return function(...arg) {
        if (timer)clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, time)
    }
}
