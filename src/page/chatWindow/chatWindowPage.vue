<template>
  <section class="chatWindow">
    <head-top
      :goBack="true"
      :head-title="title"
      :headBgColor="'white'"
      :backIconName="'backBlack'"
      :showTextColor="true"
      :textStyle="'#1E2A2F'"
    />
    <section class="innerContainer">
      <section class="chatContent">
        <div v-for="(item,msgIndex) in chatMessages" :key="msgIndex">
          <chat-info-left
            v-if="item.type==='1'"
            :nickname="item.nickname"
            :content="item.message"
            :imgSrc="phpImgUrl + item.avatar"
          />
          <chat-info-right v-else
            :nickname="item.nickname"
            :content="item.message"
            :imgSrc="phpImgUrl + item.avatar"
          />
        </div>
      </section>
      <section class="footerInput">
        <el-input v-model="message" placeholder="请输入内容" @keyup.enter.native="sendMessage"></el-input>
        <div class="sendMsg" @click="sendMessage">
          <img src="../../images/send-icon.png" alt="">
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import HeadTop from '../../components/header/head'
import chatInfoLeft from '../../components/common/chatInfoLeft'
import chatInfoRight from '../../components/common/chatInfoRight'
import ui from '../../modules/ui/ui'
import {phpImgUrl} from '../../config/env'

export default {
	data () {
		return {
			title: '聊天窗口',
			message: '',
			phpImgUrl
		}
	},

	sockets: {
		...mapMutations([
			'SOCKET_USER_MESSAGE'
		])
	},

	computed: {
		...mapState(['userInfo', 'chatMessages'])
	},

	components: {
		HeadTop,
		chatInfoLeft,
		chatInfoRight
	},

	methods: {
		...mapMutations([
			'SOCKET_USER_MESSAGE'
		]),
		sendMessage () {
			if (this._.isEmpty(this.message)) {
				ui.toast({title: '', msg: '不能发送空消息，请输入消息内容'})
				return
			}

			const sendMsg = {
				// type: '0', // '0'代表自己发， ‘1’代表收到的信息
				message: this.message,
				nickname: this.userInfo.nickname,
				avatar: this.userInfo.avatar
			}
			// this.SOCKET_USER_MESSAGE(sendMsg)
			this.$socket.emit('SEND_MESSAGE', sendMsg)

			this.message = ''
		}
	}
}
</script>

<style>
  @import '../../style/mixin';

  .chatWindow{
    display: flex;
    flex: 1;
    flex-direction: column;
    @mixin wh 100%, 100%;
    .innerContainer{
      display: flex;
      flex: 1;
      flex-direction: column;
      @mixin bis chatBg;
      .chatContent{
        flex: 1;
        overflow-y: scroll;
        overflow-x: hidden;
        overflow-scrolling: touch;
      }
      .footerInput{
        @mixin wh 100%, 3rem;
        background-color: #35484F;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        .el-input{
          width: 80%;
        }
        .sendMsg{
          img{
            @mixin wh 1.5rem, 1.5rem;
          }
        }
      }
    }
    
  }
</style>