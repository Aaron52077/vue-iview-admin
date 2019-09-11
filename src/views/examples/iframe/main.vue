<template>
    <div class="container">
        <sButton style="margin-bottom: 10px;" @click.native="sendMessage">向iframe发送信息</sButton>&nbsp;&nbsp;&nbsp;&nbsp;<span>子页面推送数据: {{iframeData}}</span>
        <mInfiniteScroll v-model="height" :config="{ offset: 300 }">
            <iframe src="./iframe.html" width="100%" :height="height" frameborder="0" scrolling="auto" ref="iframe"></iframe>
        </mInfiniteScroll>
    </div>
</template>

<script>
/* eslint-disable */
import { mockToken } from '@/utils'

export default {
    name: 'analysis',
    data () {
        return {
            height: '',
            iframeWin: {},
            iframeData: {}
        }
    },
    mounted () {
        // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
        window.addEventListener('message', this.handleMessage)
        this.iframeWin = this.$refs.iframe.contentWindow
    },
    methods: {
        refresh() {
            if(location.href.indexOf("?reloaded") == -1) {
                location.href = location.href + "?reloaded";
                setTimeout(() => {
                    this.iframeWin.location.reload(true);
                }, 0);
            }
        },
        sendMessage() {
            let token = mockToken();
            // 外部vue向iframe内部传数据
            this.iframeWin.postMessage({
                cmd: 'getFormJson',
                parmas: {
                    token: token
                }
            }, '*')
        },
        handleMessage(event) {
            const data = event.data;
            const t = this.dataBase;
            switch (data.cmd) {
                case 'returnFormJson':
                    // 处理业务逻辑
                    console.log('子页面推送数据', data)
                    this.iframeData = data
                    // this.refresh();
                    break;
            }
        }
    },
}
</script>


