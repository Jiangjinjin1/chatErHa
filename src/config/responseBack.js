export default function (status) {
	let statusValue = ''
	switch (status) {
	case 400:
		statusValue = '错误请求'
		break
	case 401:
		statusValue = '未授权，请重新登录'
		break
	case 403:
		statusValue = '拒绝访问'
		break
	case 404:
		statusValue = '请求错误,未找到该资源'
		break
	case 405:
		statusValue = '请求方法未允许'
		break
	case 408:
		statusValue = '请求超时'
		break
	case 500:
		statusValue = '服务器端出错'
		break
	case 501:
		statusValue = '网络未实现'
		break
	case 502:
		statusValue = '网络错误'
		break
	case 503:
		statusValue = '服务不可用'
		break
	case 504:
		statusValue = '网络超时'
		break
	case 505:
		statusValue = 'http版本不支持该请求'
		break
	default:
		statusValue = `连接错误${status}`
		break
	}
	return statusValue
}
