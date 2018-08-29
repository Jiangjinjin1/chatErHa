import fetchApi from '../config/fetch'

export default {
	async checkLogin ({commit}, next) {
		try {
			const loginResult = await fetchApi({
				url: '/admin/checkLogin'
			})

			commit('SET_USER_INFO', loginResult)
			next()
		} catch (e) {
			commit('LOG_OUT')
			next('/launchPage')
		}
	}
}
