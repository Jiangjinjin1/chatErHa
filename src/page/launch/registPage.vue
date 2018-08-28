<template>
  <section class="container">
    <head-top :goBack="true" :head-title="title" />
    <section class="userInput">
      <div class="inptDivCommon phoneStyle">
        <span>手机号</span>
        <icon name='phone'  class="phoneOrPass"/>
        <el-input
          placeholder="请输入手机号"
          v-model="phone"
          clearable>
        </el-input>
      </div>
      <div class="inptDivCommon passwordStyle">
        <span>密码</span>
        <icon name='password' class="phoneOrPass"/>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="password"
          clearable>
        </el-input>
      </div>
    </section>
    <section class="controlBtn">
      <el-button type="primary" round @click="regist">立即注册</el-button>
    </section>
  </section>
</template>

<script>
import {mapMutations} from 'vuex'
import HeadTop from '../../components/header/head'
import ui from '../../modules/ui/ui'
import {registAccount} from '../../service/launchApi'
import {checkSimpleMobilePhone} from '../../utils/checkUtils'

export default {
	data () {
		return {
			title: '注册账号',
			phone: '',
			password: ''
		}
	},

	components: {
		HeadTop
	},

	methods: {
		...mapMutations([
			'SET_USER_INFO'
		]),
		async regist () {
			if (this._.isEmpty(this.phone) && !checkSimpleMobilePhone(this.phone)) {
				ui.toast({title: '', msg: '请输入用户名'})
				return
			}
			if (this._.isEmpty(this.password)) {
				ui.toast({title: '', msg: '请输入密码'})
				return
			}
			const registResult = await registAccount({
				username: this.phone,
				password: this.password
			})

			if (!this._.isEmpty(registResult)) {
				this.SET_USER_INFO(registResult)
				this.$router.go(-1)
			}
		}
	}
}
</script>

<style>
  @import '../../style/mixin';

  .container{
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    @mixin bis loginBg;
    .userInput {
      padding-top: 10rem;
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
    }
  }
</style>