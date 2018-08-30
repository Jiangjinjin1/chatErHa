// const Home = r => require.ensure([], () => r(require('../page/home/home1')), 'home1')
// const LauchPage = r => require.ensure([], () => r(require('../page/launch/launchPage')), 'launchPage')
// const RegistPage = r => require.ensure([], () => r(require('../page/launch/registPage')), 'registPage')
// const ResetPwPage = r => require.ensure([], () => r(require('../page/launch/resetPwPage')), 'resetPwPage')
// const UserInfoPage = r => require.ensure([], () => r(require('../page/userinfo/userInfoPage')), 'userInfoPage')
// const ChatWindowPage = r => require.ensure([], () => r(require('../page/chatWindow/chatWindowPage')), 'chatWindowPage')

const Home = () => import('../page/home/home1')
const LauchPage = () => import('../page/launch/launchPage')
const RegistPage = () => import('../page/launch/registPage')
const ResetPwPage = () => import('../page/launch/resetPwPage')
const UserInfoPage = () => import('../page/userinfo/userInfoPage')
const ChatWindowPage = () => import('../page/chatWindow/chatWindowPage')
const UserAvatarUpload = () => import('../page/uploadAvatar/userAvatarUpload')

export default [
	{
		path: '',
		redirect: '/chatWindowPage'
	},
	{
		path: '/launchPage',
		component: LauchPage,
		meta: {
			title: '登录',
			index: 0
		}
	},
	{
		path: '/registPage',
		component: RegistPage,
		meta: {
			title: '注册',
			index: 1
		}
	},
	{
		path: '/resetPwPage',
		component: ResetPwPage,
		meta: {
			title: '重置密码',
			index: 2
		}
	},
	{
		path: '/userInfoPage',
		component: UserInfoPage,
		meta: {
			title: '用户信息',
			index: 3,
			requireAuth: true
		}
	},
	{
		path: '/chatWindowPage',
		component: ChatWindowPage,
		meta: {
			title: '聊天窗口',
			index: 4,
			requireAuth: true
		}
	},
	{
		path: '/userAvatarUploadPage',
		component: UserAvatarUpload,
		meta: {
			title: '上传头像',
			index: 5,
			requireAuth: true
		}
	},
	{
		path: '/home1',
		component: Home
	}
]
