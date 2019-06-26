<template>
    <div class="gc-panel">
        <div class="gc-panel__title">QuillEditor 富文本编辑器</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <quillEditor v-model="context" :height="300"></quillEditor>
        </div>
        <div class="gc-container">编辑器内容：{{context}}</div>
    </div>
</template>

<script>
/* eslint-disable */
import quillEditor from '@base/QuillEditor'

export default {
    data () {
        return {
            context: '<p><strong><em>Click on the Image Below to resize!</em></strong></p><img src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png" />'
        }
    },
    components: { quillEditor }
}
</script>