<template>
    <div class="gc-panel">
        <div class="gc-panel__title">QuillEditor 富文本编辑器</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <quillEditor v-model="context1" :height="300"></quillEditor>
        </div>
        <div class="gc-container">编辑器内容：{{context1}}</div>
        <sDivider></sDivider>
        <div class="gc-panel__title">Tinymce 富文本编辑器</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <tinymce v-model="context2" :height="300" />
        </div>
        <div class="gc-container" v-html="context2"></div>
        <sDivider></sDivider>
        <div class="gc-panel__title">umEditor 富文本编辑器</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <umEditor ref="umEditor" :config="config" @on-change="changeHandle" v-html="context3"></umEditor>
        </div>
        <div class="gc-container">通过定义ref获取编辑器内容：</div>
        <div v-html="context3"></div>
    </div>
</template>

<script>
/* eslint-disable */
import quillEditor from '@base/QuillEditor'
import umEditor from '@base/UMeditor'
import Tinymce from '@base/Tinymce'

export default {
    data () {
        return {
            config: {
                width: '100%',
                heigth: 200
            },
            context1: '<p><strong><em>Click on the Image Below to resize!</em></strong></p><img src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png" />',
            context2: '<p><strong><em>Click on the Image Below to resize!</em></strong></p><img src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png" />',
            context3: '<p><strong><em>Click on the Image Below to resize!</em></strong></p><img src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png" />'
        }
    },
    methods:{
        changeHandle() {
            this.context = this.$refs.umEditor.editor.getContent();
        }
    },
    components: { quillEditor, umEditor, Tinymce }
}
</script>