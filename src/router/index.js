import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'
import store from '../store/index'
import routes from './routers'
import {routerMode} from '../config/env'

Vue.use(Router)

const router = new Router({
	mode: routerMode,
	routes,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) { // 记录滚动条位置
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop
			}
			return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title
	}
	// console.log('router.currentRoute.fullPath:', router.currentRoute.fullPath)
	// 做免登陆校验
	if (to.matched.some(record => record.meta.requireAuth === true) && (_.isEmpty(store.state.userInfo) || _.isEmpty(store.state.userInfo.avatar))) {
		store.dispatch('checkLogin', next)
	} else {
		next()
	}
})

export default router
