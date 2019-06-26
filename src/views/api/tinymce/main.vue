<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Tinymce 富文本编辑器</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <tinymce v-model="context" :height="300" />
        </div>
        <div class="gc-container" v-html="context"></div>
    </div>
</template>

<script>
/* eslint-disable */
import Tinymce from '@base/Tinymce'

export default {
    data () {
        return {
            context: '<p><strong><em>Click on the Image Below to resize!</em></strong></p><img src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png" />'
        }
    },
    components: { Tinymce }
}
</script>