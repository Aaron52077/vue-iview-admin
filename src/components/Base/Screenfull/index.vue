<template>
	<div v-if="showFullScreenBtn" class="full-screen">
		<sTooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
			<sButton type="text" @click.native="handleChange">
				<sIcon :type="value ? 'md-contract' : 'md-expand'" :size="23" />
			</sButton>
		</sTooltip>
	</div>
</template>

<script>
import { on, off } from '@/utils'

export default {
	name: 'Fullscreen',
	computed: {
		showFullScreenBtn() {
			return window.navigator.userAgent.indexOf('MSIE') < 0
		}
	},
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		fullScreenHandler() {
			this.$emit('input', !this.value)
			this.$emit('on-change', !this.value)
		},
		handleFullscreen() {
			let main = document.body
			if (this.value) {
				if (document.exitFullscreen) {
					document.exitFullscreen()
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen()
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen()
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen()
				}
			} else {
				if (main.requestFullscreen) {
					main.requestFullscreen()
				} else if (main.mozRequestFullScreen) {
					main.mozRequestFullScreen()
				} else if (main.webkitRequestFullScreen) {
					main.webkitRequestFullScreen()
				} else if (main.msRequestFullscreen) {
					main.msRequestFullscreen()
				}
			}
		},
		handleChange() {
			this.handleFullscreen()
		}
	},
	mounted() {
		let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
		isFullscreen = !!isFullscreen

		on(document, 'fullscreenchange', this.fullScreenHandler)
		on(document, 'mozfullscreenchange', this.fullScreenHandler)
		on(document, 'webkitfullscreenchange', this.fullScreenHandler)
		on(document, 'msfullscreenchange', this.fullScreenHandler)

		this.$emit('input', isFullscreen)
	},
	beforeDestroy() {
        off(document, 'fullscreenchange', this.fullScreenHandler)
		off(document, 'mozfullscreenchange', this.fullScreenHandler)
		off(document, 'webkitfullscreenchange', this.fullScreenHandler)
		off(document, 'msfullscreenchange', this.fullScreenHandler)
    }
}
</script>

<style lang="less">
.full-screen .ivu-tooltip-rel {
	height: 60px;
	line-height: 60px;
	i {
		cursor: pointer;
	}
}
</style>