// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import QS from 'QS'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 自定义组件
import Login from './views/login'
import Index from './views/index'
import Add from './views/add'
import Update from './views/update'
import Liu from'./views/liu'

Vue.prototype.$axios = axios
Vue.prototype.$qs = QS

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.config.productionTip = false

const router = new VueRouter({
	routes:[
		{path:"/",name:"Login",component:Login,meta:['哈哈哈','呵呵呵']},
		{path:"/index",name:"Index",component:Index,meta:['哼哼哼','盒盒盒']},
		{path:"/add",name:"Add",component:Add},
		{path:"/update",name:"Update",component:Update},
    {path:"/liu",name:"liu",component:Liu}
	],
	mode:"history"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
