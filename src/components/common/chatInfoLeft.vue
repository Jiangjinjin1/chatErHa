<template>
  <section class="chatInfo">
    <div class="chatInfoContainer">
      <div class="leftAvatar">
        <img :src="imgSrc" alt="">
      </div>
      <section class="rightContainer">
        <div class="nickname">
          <span>{{nickname}}</span>
        </div>
        <div class="rightMessage">
          <p class="content">{{content}}</p>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
	data () {
		return {

		}
	},

	props: ['nickname', 'content', 'imgSrc']
}
</script>

<style scoped>
  @import '../../style/mixin';

  .chatInfo{
    display: flex;
    width: 100%;
    .chatInfoContainer{
      display: flex;
      flex-direction: row;
      justify-content: cneter;
      align-items: center;
      padding: 0 1rem;
      .leftAvatar{
        @mixin wh 2.2rem, 2.2rem;
        display: flex;
        align-self: flex-start;
        padding-top: .8rem;
        img{
          @mixin wh 2.2rem, 2.2rem;
          border-radius: 50%;

        }
      }
      .rightContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 13.8rem;
        margin-left: .25rem;
        .nickname{
          span{
            font-size: .6rem;
            color: #434a54;
            padding: .3rem 0;
          }
        }
        .rightMessage{
          display: flex;
          @mixin bis Shape1;
          width: 13.8rem;
          min-height: 3.1rem; 
          align-items: center;
          .content{
            font-size: .65rem;
            color: #434a54;
            font-weight: 500;
            max-width: 12.7rem;
            padding: .5rem 0;
            padding-left: 1.3rem;
            word-break:break-all;
            word-wrap:break-word; 
          }
        }
      }
    }
  }
</style>