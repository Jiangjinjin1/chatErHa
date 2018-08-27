import {
	SET_USER_INFO
} from './mutation-types'

export default {
	[SET_USER_INFO] (state, userInfo) {
		state.userInfo = userInfo
	}
}
