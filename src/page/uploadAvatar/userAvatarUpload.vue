<template>
  <section class="uploadAvatar">
    <head-top :goBack="true" :head-title="title" />
    <section class="uploadContainer">
      <div class="containerDiv">
        <div v-if="userInfo.avatar" class="avatarDiv">
          <img :src="`${phpImgUrl}${userInfo.avatar}`" alt="">
        </div>
        <div class="selectFile">
          <label for="my_file">
            <icon name="add" class="selctIcon" />
          </label>
          <input id='my_file' ref="userAvatar" type="file" name="avatar" style="display:none;" >
        </div>
      </div>
      <div class="buttonDiv">
        <el-button type="primary" round @click="uploadAvatar">上传头像</el-button>
      </div>
    </section>
  </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import HeadTop from '../../components/header/head'
import {uploadAvatar} from '../../service/uploadAvatarApi'
import ui from '../../modules/ui/ui'
import {phpImgUrl} from '../../config/env'
export default {
	data () {
		return {
			title: '头像上传',
			phpImgUrl
		}
	},

	computed: {
		...mapState([
			'userInfo'
		])
	},

	components: {
		HeadTop
	},

	methods: {
		...mapMutations([
			'SET_USER_INFO'
		]),
		async uploadAvatar () {
			const avatarFile = this.$refs.userAvatar
			if (this._.isEmpty(avatarFile.value)) {
				ui.toast({title: '', msg: '请选择上传的头像'})
				return
			}

			if (avatarFile.size > 3145728) {
				ui.toast({title: '', msg: '请选择3M以内的图片！'})
				return
			}

			const formData = new FormData()
			formData.append('avatar', avatarFile.files[0], avatarFile.files[0].name)
			const uploadFile = await uploadAvatar({
				formData
			})
			if (!this._.isEmpty(uploadFile)) {
				this.SET_USER_INFO(uploadFile)
				var _this = this
				ui.alert({title: '上传提示',
					msg: '头像已上传成功，确定进入下一个页面',
					btns: [
						{
							msg: '确定',
							callback: function () {
								_this.$router.push({path: '/chatWindowPage'})
							}
						}
					]})
			}
		}
	}
}
</script>

<style>
  @import '../../style/mixin';
  .uploadAvatar{
    display: flex;
    flex: 1;
    flex-direction: column;
    @mixin wh 100%, 100%;
    .uploadContainer{
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      .containerDiv{
        display: flex;
        flex-direction: row;
        align-items: center;
        .avatarDiv {
          display: flex;
          justify-content: center;
          align-items: center;
          @mixin wh 4rem, 4em;
          margin: 1rem;
          border: 1px solid #F3F3F3;
          img{
            @mixin wh 3.8rem, 3.8em;
          }
        }
        .selectFile{
          padding: 1rem;
          label{
            display: flex;
            justify-content: center;
            align-items: center;
            @mixin wh 4rem, 4rem;
            .selctIcon{
              @mixin wh 4rem, 4rem;
            }
          }
        }
      }
      
      .buttonDiv{
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
  }
</style>