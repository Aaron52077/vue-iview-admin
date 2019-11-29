<template>
    <div class="gc-oauth">
        <!-- <sButton type="primary" @click="thirdAccout">第三方登录</sButton> -->
        <mDocPreview src="http://authserver.lzzy.net/authserver/login?service=http://10.88.83.111:3033/sso/login" />
	</div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'auth',
    data () {
        return {

        }
    },
    methods: {
        thirdAccout(thirdpart = '单点登录') {        
            const cassos = 'http://10.88.83.111:3033/sso/login'
            const redirect_uri = encodeURIComponent(cassos + '/auth')
            const url = 'http://authserver.lzzy.net/authserver/login?service=' + cassos + '&redirect_uri=' + redirect_uri + '&scope=snsapi_login#auth_redirect'
            this.openModal(url, thirdpart, 1080, 810)
        },
        /**
        * @param {Sting} url
        * @param {Sting} title
        * @param {Number} w
        * @param {Number} h
        */
        openModal(url, title, w, h) {
            // Fixes dual-screen position                            Most browsers       Firefox
            const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
            const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

            const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
            const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

            const left = ((width / 2) - (w / 2)) + dualScreenLeft
            const top = ((height / 2) - (h / 2)) + dualScreenTop
            const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

            // Puts focus on the newWindow
            if (window.focus) {
                newWindow.focus()
            }
        }
    }
}
</script>

<style lang="less">
.gc-oauth {
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    overflow: hidden;
}
</style>