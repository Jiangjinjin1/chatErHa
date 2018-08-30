<template>
  <section class="container">
    <head-top :goBack="true" :head-title="title" />
    <section class="addressContent">
      <div class="addressContentView">
        <section class="addressInfoView">
          <section class="labelInput">
            <p>昵称</p>
            <el-input placeholder="请输入您的昵称" v-model="nickname" clearable></el-input>
          </section>
        </section>
        <section class="confirmButton">
          <div @click.stop="confirmEdit"><span>确定</span></div>
        </section>
      </div>
    </section>
  </section>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import HeadTop from '../../components/header/head'
import {addNickName} from '../../service/launchApi'
import ui from '../../modules/ui/ui'

export default {
	data () {
		return {
			title: '填写用户信息',
			nickname: ''
		}
	},
	components: {
		HeadTop
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
			this.nickname = this.userInfo.nickname
		},
		async confirmEdit () {
			if (this._.isEmpty(this.nickname)) {
				ui.toast({title: '', msg: '请填写昵称'})
				return
			}

			const nicknameResult = await addNickName({nickname: this.nickname})

			if (!this._.nicknameResult) {
				this.SET_USER_INFO({...nicknameResult})
				// 跳转头像上传
				this.$router.push({path: '/userAvatarUploadPage'})
			}
		}
	}
}
</script>

<style>
  @import '../../style/mixin.css';
  .container{
    display: flex;
    @mixin wh 100%, 100%;
    flex: 1;
    flex-direction: column;
    @mixin bis loginBg;
  }
  .addressContent{
    flex: 1;
    overflow-y: auto;
  }
  .addressContentView{
    display: flex;
    flex: 1;
    @mixin wh 100%, 100%;
    flex-direction: column;
    justify-content: space-between;
    .addressInfoView{
      padding: 0 .75rem;
      /* background: white; */
      .labelInput{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: .5rem 0;
        p:nth-child(1){
          @mixin sc .8rem, #ffffff;
            width: 3rem;
        }
        .el-input {
          flex: 1;
          border-bottom: 1px solid #F4F4F4;
        }
        .el-input__inner{
          border: none;
          background-color: transparent;
          color: #ffffff;
        }
      }
    }
      
    .confirmButton{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 1rem 0;
      div{
        display: flex;
        justify-content: center;
        padding: .5rem 0;
        width: 90%;
        background-color: #53D769;
        text-align:center;
        border-radius: .2rem;
        span{
          color: white;
          font-size: .8rem;
        }
      }
    }
  }

</style>