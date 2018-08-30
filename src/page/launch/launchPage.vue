<template>
  <section class="launchContainer">
    <section class="avatar">
      <img :src="avatarUrl" alt="">
    </section>
    <section class="userInput">
      <div class="inptDivCommon phoneStyle">
        <span>手机号</span>
        <icon name='phone'  class="phoneOrPass"/>
        <el-input
          placeholder="请输入手机号"
          v-model.trim="phone"
          maxLength="11"
          clearable>
        </el-input>
      </div>
      <div class="inptDivCommon passwordStyle">
        <span>密码</span>
        <icon name='password' class="phoneOrPass"/>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model.trim="password"
          clearable>
        </el-input>
      </div>
    </section>
    <section class="controlBtn">
      <el-button type="primary" round @click="login">立即登录</el-button>
      <div class="footerBtn">
        <p @click="forgetPw">忘记密码?</p>
        <p>|</p>
        <p @click="regitst">立即注册</p>
      </div>
    </section>
  </section>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import ui from '../../modules/ui/ui'
import {login} from '../../service/launchApi'
import {checkSimpleMobilePhone} from '../../utils/checkUtils'

export default {
	data () {
		return {
			avatarUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/OgUyRLfMoTDVu0s5HtfuH9IBzI8A7VINHg5NMSsx3Es4R8P4Ogu4bJg5vb8Z0NCeZylwJODicUr1q2288f5uAcQ/132',
			phone: '',
			password: ''
		}
	},

	created () {
		this.initData()
	},

	computed: {
		...mapState([
			'userInfo'
		])
	},

	methods: {
		...mapMutations([
			'SET_USER_INFO'
		]),
		initData () {
			const { username = '', password = '' } = this.userInfo
			this.phone = username
			this.password = password
		},
		async login () {
			if (this._.isEmpty(this.phone) && !checkSimpleMobilePhone(this.phone)) {
				ui.toast({title: '', msg: '请输入用户名'})
				return
			}
			if (this._.isEmpty(this.password)) {
				ui.toast({title: '', msg: '请输入密码'})
				return
			}
			const loginResult = await login({
				username: this.phone,
				password: this.password
			}).catch(e => {
				ui.toast({title: '', msg: '用户信息返回为空'})
			})

			if (!this._.isEmpty(loginResult)) {
				this.SET_USER_INFO({...loginResult, password: this.password})
				if (!this._.isEmpty(this.userInfo._id) && !this._.isEmpty(this.$route.query.redirect)) {
					// 如果接口返回session失效，从哪个页面返回到首页，在登录之后通过query里redirect路由字段跳转到对应失效的页面
					this.$router.push({path: this.$route.query.redirect})
				} else if (!this._.isEmpty(this.userInfo.nickname)) {
					this.$router.push({path: '/chatWindowPage'})
				} else {
					this.$router.push({path: '/userInfoPage'})
				}
			}
		},

		forgetPw () {
			this.$router.push({path: '/resetPwPage'})
		},

		regitst () {
			this.$router.push({path: '/registPage'})
		}
	}
}
</script>

<style>
  @import '../../style/mixin';

  .launchContainer{
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    @mixin bis loginBg;
    .avatar{
      display: flex;
      justify-content: center;
      padding-top: 5rem;
      img{
        border-radius: 50%;
        @mixin wh 4rem, 4rem;
      }
    }
    .userInput {
      padding-top: 2rem;
      .inptDivCommon{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 1.5rem 1rem;
        padding: 0 .5rem;
        border: 1px solid #A3CBDF;
        border-radius: 1.2rem;
        span:nth-child(1) {
          width: 3.5rem;
          color: #A3CBDF;
          font-size: .65rem;
        }
        .phoneOrPass{
          @mixin wh 1rem, 1rem;
        }
        .el-input__inner{
          border: none;
          background-color: transparent;
          color: #ffffff;
        }
      }
    }
    .controlBtn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      .el-button{
        flex: 1;
        margin: .5rem 1.5rem;
        background-color: #56B3F6;
        span{
          color: #FEFFFF;
          font-size: .8rem;
        }
      }
      .footerBtn{
        display: flex;
        flex-direction: row;
        justify-content: center;
        p{
          color:#DFF0FC;
          font-size:.55rem;
        }
        p:nth-child(2) {
          padding: 0 .2rem;
        }
      }
    }
  }
</style>