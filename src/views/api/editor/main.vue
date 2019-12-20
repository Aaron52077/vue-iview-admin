<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Tinymce 富文本编辑器</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <tinymce v-model="context2" :height="300" />
        </div>
        <div class="gc-container">
            <sButton type="primary" @click="visible2 = true">Tinymce 内容预览/打印</sButton>
        </div>
        {{context2}}
        <div class="gc-container" id="container2" v-html="context2"></div>
        <sDivider></sDivider>
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
                <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="printForm1()">打印</sButton>
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
                <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="printForm2()">打印</sButton>
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
                <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="printForm3()">打印</sButton>
            </div>
        </sModal>
    </div>
</template>

<script>
/* eslint-disable */
import { getEditortData } from '@/api'
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
            context2: '',
            context3: '',
            visible1: false,
            visible2: false,
            visible3: false
        }
    },
    created() {
        getEditortData().then(res => {
            const htmlValue = `<p><strong><em>${res.data.description}</em></strong></p><img src="${res.data.images}" />`
            this.context2 = htmlValue;
            this.context3 = htmlValue;
        });
    },
    methods:{
        changeHandle() {
            this.context3 = this.$refs.umEditor.editor.getContent();
        },
        printForm1() {
            this.dataBase.print('#container1');
        },
        printForm2() {
            this.dataBase.print('#container2');
        },
        printForm3() {
            this.dataBase.print('#container3');
        }
    },
    components: { quillEditor, umEditor, Tinymce }
}
</script>