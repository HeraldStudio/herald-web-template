import Vue from 'vue'

Vue.prototype.$device = {}
Vue.prototype.$device.isWechat = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
Vue.prototype.$device.isDesktop = window.innerWidth > 480
Vue.prototype.$device.isMobile = window.innerWidth <= 480
Vue.prototype.$device.height = window.innerHeight
Vue.prototype.$device.platform = () => {
    let device = window.innerWidth < 480 ? 'mobile' : 'desktop'
    if (Vue.prototype.$device.isWechat) {
        return `wechat-web-${device}`
    } else {
        return `web-${device}`
    }
}
