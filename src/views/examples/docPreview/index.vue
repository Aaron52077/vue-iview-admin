<template>
    <div class="gc-panel">
        <div class="gc-panel__title">DocPreview 文件预览</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">支持格式：XLS、XLSX，PPT、PPTX，DOC、DOCX，RTF，EIO，UOF、UOS，XML，PDF，Office文档</div>
            <sDivider></sDivider>
        </div>
        <mInfiniteScroll :config="{ offset: 240 }"> 
            <sSpin size="large" fix v-if="spinShow"></sSpin>
            <mDocPreview src="https://dcsapi.com/?k=282194091&url=http://www.scrm365.cn/api/file/v3/fileflow/253" />
        </mInfiniteScroll>
    </div>
</template>

<script>
export default {
    data () {
        return {
            spinShow: true
        }
    },
    mounted() {
        this.handleSpinShow();
    },
    methods: {
        handleSpinShow() {
            this.spinShow = true;
            setTimeout(() => {
                this.spinShow = false;
            }, 2000);
        },
    }
}
</script>