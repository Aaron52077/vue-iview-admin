
<template>
    <div class="container">
        <div class="gc-panel__title">umEditor 富文本编辑器</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <umEditor ref="umEditor" :config="config" @on-change="changeHandle" v-html="context"></umEditor>
        </div>
        <div class="gc-container">通过定义ref获取编辑器内容：</div>
        <div v-html="context"></div>
    </div>
</template>

<script>
/* eslint-disable */
import umEditor from '@base/UMeditor'
export default {
    data () {
        return {
            config: {
                width: '100%',
                heigth: 200
            },
            context: '<p><strong><em>Click on the Image Below to resize!</em></strong></p><img src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png" />'
        }
    },
    methods:{
        changeHandle() {
            this.context = this.$refs.umEditor.editor.getContent();
        }
    },
    components: { umEditor }
}
</script>