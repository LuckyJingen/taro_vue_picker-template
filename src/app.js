import Vue from 'vue';
import Taro from '@tarojs/taro'

import XlPicker from 'taro-vue-picker';
Vue.component('xl-picker', XlPicker);

const App = new Vue({
  onShow(options) {
  },
  onLaunch() {
    console.log('----App Launch');
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default);
  },
});

export default App;
