<template>
    <header id='head_top' :class="{headClass:!goBack}" :style="headStyle">
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <icon :name="backIconName" class="iconSize" />
        </section>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text" :style="titleColor">{{headTitle}}</span>
        </section>
        <slot name="rightEle"></slot>
    </header>
</template>

<script>
export default {
	data () {
		return {
			headStyle: {
				background: this.headBgColor
			},
			titleColor: {
				color: this.textStyle,
				'font-weight': 500,
				'font-size': '.7rem'
			}
		}
	},
	components: {
	},

	mounted () {
		// 获取用户信息 微信授权登录

	},
	props: {
		headTitle: {
			type: String,
			default: ''
		},
		goBack: {
			type: Boolean,
			default: false
		},
		headBgColor: {
			type: String,
			default: '#3190e8'
		},
		backIconName: {
			type: String,
			default: 'back'
		},
		textStyle: {
			type: String,
			default: '#fff'
		}
	},
	methods: {
	}

}
</script>

<style>
    @import '../../style/mixin.css';

    #head_top{
        background-color: $blue;
        @mixin wh 100%, 2.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .headClass{
      justify-content: center;
    }
    .iconSize{
        @mixin wh 1.2rem,1.2rem;
        fill: red;
    }
    .head_goback{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      @mixin wh 0.8rem, 1rem;
      margin-left: .4rem;
    }
    .title_head{
        width: 80%;
        color: #fff;
        text-align: center;
        margin-left: .5rem;
        .title_text{
            @mixin sc 0.7rem, #fff;
            text-align: center;
            font-weight: 400;
        }
    }
</style>
