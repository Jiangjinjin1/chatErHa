import {
	SET_USER_INFO,
	SOCKET_USER_MESSAGE
} from './mutation-types'

export default {
	[SET_USER_INFO] (state, userInfo) {
		state.userInfo = userInfo
	},

	[SOCKET_USER_MESSAGE] (state, userMsg) {
		state.chatMessages.push(userMsg)
	}
}
