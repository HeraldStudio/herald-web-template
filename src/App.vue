<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
import qs from 'querystring';
export default {
  name: "app",
  components: {},
  data() {
    return {
      idsTicket: "",
      wechatCode: ""
    };
  },
  methods: {
    initAxios() {
      // 初始化 Axios 配置
      this.$axios.defaults.baseURL = "https://xgbxscwx.seu.edu.cn/api/";
      //this.$axios.defaults.baseURL = "localhost:3000";
      this.$axios.defaults.headers["x-api-token"] = this.$store.state.token;
    },
    async login() {
      // 对接 CAS-We-Can 或者统一身份认证的流程示例，按需修改
      let loading = this.$loading({ fullscreen: true });
      if(window.location.search){
        // 如果当前页面参数携带了ticket
        let ticket = qs.parse(window.location.search.replace('?','')).ticket
        if(ticket){
          // 包含 ticket，开启登录流程
          let res = await this.$axios.post('/auth', { 
            ticket,
            service: 'https://xgbxscwx.seu.edu.cn',
            platform: this.$device.platform()
          })
          if(res.data.success){
            this.$store.commit('token', res.data.result)
            window.location.search = ''
            return // 很重要，不要进入后面的流程
          } // 执行到此处说明ticket无效，给他清理了就是了
        }
        window.location.search = ''
      }
      let res = await this.$axios.get("/user");
      if (!res.data.success) {
        // 如果获取失败，就说明 token 无效了
        // 首先保存当前路由
        // console.log(this.$route)
        this.$store.commit('saveUnfinishedRoute', {
          params:this.$route.params,
          fullPath:this.$route.fullPath
          })
        if(this.$device.isWechat){
          window.location = `https://xgbxscwx.seu.edu.cn/cas-we-can/login?goto=https://xgbxscwx.seu.edu.cn`
        } else {
          window.location = `https://newids.seu.edu.cn/authserver/login?goto=https://xgbxscwx.seu.edu.cn`
        }
      } else if (this.$store.state.hasUnfinishedRoute) {
        // token 有效，并且还有未完成的路由
        loading.close()
        // console.log(this.$store.state.unfinishedRoute)
        this.$router.push({path:this.$store.state.unfinishedRoute.fullPath, params:this.$store.state.unfinishedRoute.params})
        this.$store.commit('clearUnfinishedRoute')
      } else {
        loading.close()
      }
    }
  },
  created() {
    this.initAxios();
    this.login();
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #f0f0f0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.content-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}
</style>
