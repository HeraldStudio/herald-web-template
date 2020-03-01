import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import './plugins/device.js'
import './plugins/element.js'
import './plugins/date.js'
import './plugins/console.js'
import 'babel-polyfill'
Vue.config.productionTip = false

window.__global__ = {
  store,
  router
}

// 在这里记录一些版本信息
window.__version__ = 26

// 支持跨用户调试
window.auth = ( token ) => {
  store.commit('token', token)
  return '身份已切换！请刷新页面开始调试'
}



// 对手机屏幕（小于 480 逻辑像素宽度）应用 400px 缩放模式；对其他终端应用自适应宽度模式。
if (window.innerWidth < 480) {
  let viewport = document.querySelector('meta[name="viewport"]')
  viewport.setAttribute('content', 'width=400,user-scalable=no,viewport-fit=cover')
}

Vue.use(axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

