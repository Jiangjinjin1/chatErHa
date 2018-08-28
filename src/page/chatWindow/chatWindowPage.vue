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
            :nickname="userInfo.nickname"
            :content="item.message"
            :imgSrc="images[item.imgRandom]"
          />
          <chat-info-right v-else
            :nickname="userInfo.nickname"
            :content="item.message"
            :imgSrc="images[item.imgRandom]"
          />
        </div>
      </section>
      <section class="footerInput">
        <el-input v-model="message" placeholder="请输入内容"></el-input>
        <div class="sendMsg" @click="sendMessage">
          <img src="../../images/send-icon.png" alt="">
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import HeadTop from '../../components/header/head'
import chatInfoLeft from '../../components/common/chatInfoLeft'
import chatInfoRight from '../../components/common/chatInfoRight'
import ui from '../../modules/ui/ui'

const images = [
	require('../../images/001.jpg'),
	require('../../images/002.jpg'),
	require('../../images/003.jpg'),
	require('../../images/004.jpg'),
	require('../../images/005.jpg'),
	require('../../images/006.jpg'),
	require('../../images/007.jpg')
]

export default {
	data () {
		return {
			title: '聊天窗口',
			message: '',
			chatMessages: [],
			images
		}
	},

	sockets: {
		allPeople: function (data) {
			this.chatMessages.push(data)
		}
	},

	computed: {
		...mapState(['userInfo'])
	},

	components: {
		HeadTop,
		chatInfoLeft,
		chatInfoRight
	},

	methods: {
		sendMessage () {
			if (this._.isEmpty(this.message)) {
				ui.toast({title: '', msg: '不能发送空消息，请输入消息内容'})
				return
			}

			const sendMsg = {
				type: '0', // '0'代表自己发， ‘1’代表收到的信息
				message: this.message,
				imgRandom: this.userInfo.imgRandom
			}
			this.chatMessages.push(sendMsg)
			this.$socket.emit('my-send', sendMsg)

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