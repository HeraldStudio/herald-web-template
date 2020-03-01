import axios from 'axios'

export default { 
    install: (Vue) => {
        window.$axios = axios.create({
          transformResponse: function (data) {
            // 对 data 进行任意转换处理
            data = JSON.parse(data)
            return data;
          }
        })
        Vue.prototype.$axios = window.$axios
      }
}