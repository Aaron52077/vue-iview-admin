<template>
    <div class="gc-panel">
        <div class="gc-panel__title">FramePreview 文件预览</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">支持格式：XLS、XLSX，PPT、PPTX，DOC、DOCX，RTF，EIO，UOF、UOS，XML，PDF，Office文档</div>
            <sDivider></sDivider>
            <sRadioGroup v-model="type" type="button" @on-change="onChange">
                <sRadio :label="0">xls1</sRadio>
                <sRadio :label="1">xls2</sRadio>
            </sRadioGroup>
        </div>
        <mInfiniteScroll :config="{ offset: 240 }"> 
            <sSpin size="large" fix v-if="spinShow"></sSpin>
            <mFramePreview :src="urlList[type]" />
        </mInfiniteScroll>
    </div>
</template>

<script>
export default {
    data () {
        return {
            spinShow: true,
            type: 0,
            urlList: [
                'https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls',
                'https://dcsapi.com/?k=282194091&url=http://www.scrm365.cn/api/file/v3/fileflow/253'
            ]
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
            }, 1500);
        },
        onChange(data) {
            this.type = data;
        }
    }
}
</script>