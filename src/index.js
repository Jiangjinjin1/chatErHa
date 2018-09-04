import 'babel-polyfill'
import Vue from 'vue'
import {
	Button,
	Message,
	Input
} from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import _ from 'lodash'
import Icon from 'vue-svg-icon/Icon.vue'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
import DrawerLayout from 'vue-drawer-layout'
import router from './router'
import './style/main.css'
import './config/rem'
import store from './store/index'
import App from './App'
import {hostURL} from './config/env'

Vue.use(VueSocketio, socketio(hostURL('/chat')))// 与服务端链接

Vue.use(infiniteScroll)

Vue.use(DrawerLayout) // vue-drawer-layout

const UIComponents = [
	Button,
	Input
]
for (let i = 0, len = UIComponents.length; i < len; i++) {
	Vue.component(UIComponents[i].name, UIComponents[i])
}
Vue.component('icon', Icon)

Vue.prototype.$message = Message
Vue.prototype._ = _

const app = new Vue({
	router,
	store,
	...App
})

app.$mount('#app')
