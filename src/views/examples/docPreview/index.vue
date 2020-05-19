<template>
    <div class="gc-panel">
        <div class="gc-panel__title">FramePreview 文件预览</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">支持格式：XLS、XLSX，DOC、DOCX，PDF，Office等文档</div>
            <div class="gc-container__h1">word、ppt、xls文件实现在线预览的方式比较简单可以直接通过调用微软的在线预览功能实现 (预览前提：资源必须是公共可访问的)，src就是要实现预览的文件地址 具体文档看这 <a href="https://www.microsoft.com/en-us/microsoft-365/blog/2013/04/10/office-web-viewer-view-office-documents-in-a-browser/?eu=true" target="_blank">微软接口文档</a> </div>
            <sDivider></sDivider>
        </div>
        <mInfiniteScroll :config="{ offset: 300 }"> 
            <sSpin size="large" fix v-if="spinShow"></sSpin>
            <mFramePreview src="https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls" />
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
        this.spinShow = true;
        setTimeout(() => {
            this.spinShow = false;
        }, 1500);
    },
    methods: {

    }
}
</script>