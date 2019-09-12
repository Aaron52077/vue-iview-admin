<template>
    <div class="gc-panel">
        <div class="gc-panel__title">QuillEditor 富文本编辑器</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <quillEditor v-model="context1" :height="300"></quillEditor>
        </div>
        <div class="gc-container">
            <sButton type="primary" @click="visible1 = true">QuillEditor 内容预览/打印</sButton>
        </div>
        <div class="gc-container" id="container1" v-html="context1"></div>
        <sDivider></sDivider>
        <div class="gc-panel__title">Tinymce 富文本编辑器</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <tinymce v-model="context2" :height="300" />
        </div>
        <div class="gc-container">
            <sButton type="primary" @click="visible2 = true">Tinymce 内容预览/打印</sButton>
        </div>
        <div class="gc-container" id="container2" v-html="context2"></div>
        <sDivider></sDivider>
        <div class="gc-panel__title">umEditor 富文本编辑器</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <umEditor ref="umEditor" :config="config" @on-change="changeHandle" v-html="context3"></umEditor>
        </div>
        <div class="gc-container">
            <sButton type="primary" @click="visible3 = true">umEditor 内容预览/打印</sButton>
        </div>
        <div class="gc-container">通过定义ref获取编辑器内容：</div>
        <div v-html="context3" id="container3"></div>
        <!-- 预览窗口 -->
        <sModal class="gc-dia-main" width="1000" v-model="visible1" transfer  :mask-closable="false">
            <div slot="header" class="gc-dia-title">QuillEditor 预览示例</div>
            <div class="gc-dia-body" style="position:relative;min-height:300px;">
                <div v-html="context1"></div>
            </div>
            <div slot="footer" class="gc-dia-foot">
                <sButton size="large" class="gc-btn-text gc-btn-no" type="text" @click="visible1 = false">关闭</sButton>
                <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="printForm()">打印</sButton>
            </div>
        </sModal>
        <!-- 预览窗口 -->
        <sModal class="gc-dia-main" width="1000" v-model="visible2" transfer  :mask-closable="false">
            <div slot="header" class="gc-dia-title">Tinymce 预览示例</div>
            <div class="gc-dia-body" style="position:relative;min-height:300px;">
                <div v-html="context2"></div>
            </div>
            <div slot="footer" class="gc-dia-foot">
                <sButton size="large" class="gc-btn-text gc-btn-no" type="text" @click="visible2 = false">关闭</sButton>
                <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="printForm('#container2')">打印</sButton>
            </div>
        </sModal>
        <!-- 预览窗口 -->
        <sModal class="gc-dia-main" width="1000" v-model="visible3" transfer  :mask-closable="false">
            <div slot="header" class="gc-dia-title">umEditor 预览示例</div>
            <div class="gc-dia-body" style="position:relative;min-height:300px;">
                <div v-html="context3"></div>
            </div>
            <div slot="footer" class="gc-dia-foot">
                <sButton size="large" class="gc-btn-text gc-btn-no" type="text" @click="visible3 = false">关闭</sButton>
                <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="printForm('#container3')">打印</sButton>
            </div>
        </sModal>
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
            context3: '<p><strong><em>Click on the Image Below to resize!</em></strong></p><img src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png" />',
            visible1: false,
            visible2: false,
            visible3: false
        }
    },
    methods:{
        changeHandle() {
            this.context3 = this.$refs.umEditor.editor.getContent();
        },
        printForm() {
            this.dataBase.print('#container1');
        },
    },
    components: { quillEditor, umEditor, Tinymce }
}
</script>