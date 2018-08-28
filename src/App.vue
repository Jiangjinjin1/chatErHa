<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">   
      <router-view></router-view>
    </transition>
    <UI/>
  </div>
</template>
<script>
import UI from './components/ui/ui'

export default {
	data () {
		return {
			transitionName: ''
		}
	},
	created () {
	},

	mounted () {

	},

	sockets: {
		connect: function () {
			// console.log('socket connected-----------------http://localhost:9000/chat')
		}
	},

	methods: {

	},
	components: {
		UI
	},

	watch: {// 使用watch 监听$router的变化
		$route (to, from) {
			// 如果to索引大于from索引,判断为前进状态,反之则为后退状态
			if (to.meta.index > 0) {
				if (to.meta.index < from.meta.index) {
					this.transitionName = 'slide-right'
				} else {
					this.transitionName = 'slide-left'
				}
			} else if (to.meta.index === 0 && from.meta.index > 0) {
				this.transitionName = 'slide-top'
			}
		}
	}
}
</script>

<style>
  @import "./style/mixin.css";

  #app{
  @mixin wh 100%,100%;
    overflow-x: hidden;
  }
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-to {
    opacity: 0;
  }
  
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  
  .slide-bottom-enter-active {
    transition: all .3s ease;
  }
  .slide-bottom-leave-active {
    transition: all .2s ease;
  }
  .slide-bottom-enter, .slide-bottom-leave-active {
    transform: translateX(-130px);
    opacity: 0;
  }

  .slide-top-enter-active {
    transition: all .5s ease-out;
  }
  .slide-top-leave-active {
    transition: all 0 ease;
  }
  .slide-top-enter, .slide-top-leave-active {
    transform: translateY(-450px);
    opacity: 0;
  }
</style>