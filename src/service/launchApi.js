import fetchApi from '../config/fetch'

/**
 * 登录接口获取用户信息
 */

export const registAccount = async (params) => {
	const {
		username,
		password
	} = params
	const result = await fetchApi({
		url: '/admin/regist',
		data: {
			username,
			password
		}
	})
	return result.data
}

export const login = async (params) => {
	const {
		username,
		password
	} = params
	const result = await fetchApi({
		url: '/admin/login',
		data: {
			username,
			password
		}
	})
	return result.data
}

export const modifyPassWord = async (params) => {
	const {
		username,
		password
	} = params
	const result = await fetchApi({
		url: '/admin/modifyPassWord',
		data: {
			username,
			password
		}
	})
	return result.data
}

export const addNickName = async (params) => {
	const {
		password
	} = params
	const result = await fetchApi({
		url: '/admin/addNickName',
		data: {
			password
		}
	})
	return result.data
}
