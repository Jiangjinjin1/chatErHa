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
	return result
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
	return result
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
	return result
}

export const addNickName = async (params) => {
	const {
		nickname
	} = params
	const result = await fetchApi({
		url: '/admin/addNickName',
		data: {
			nickname
		}
	})
	return result
}
