import Vue from 'vue'
import { Button, Input, Message,MessageBox, Loading } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$screenWidth = document.body.clientWidth