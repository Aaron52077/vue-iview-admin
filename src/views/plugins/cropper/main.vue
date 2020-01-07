<template>
    <div class="container">
        <div class="gc-panel__title">Cropper 图片裁剪组件</div>
        <sDivider></sDivider>
        <div class="gc-container" id="container">
            <sButton type="primary" size="large" @click="visible = true">头像上传</sButton>
            <sDivider></sDivider>
            <div class="gc-panel" v-show="imgUrl"><img :src="imgUrl" /></div>
            <mCropper v-model="visible" @on-cancel="cancelHandle" @on-ok="okHandle"></mCropper>
            <!-- <sUpload 
                ref="upload"
                action="/"    
                name="excel-file"
                :show-upload-list="true"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-upload="handleBefore"
                :format ="['xlsx','xls']">
                    <sButton type="info" icon="ios-cloud-upload-outline">上传</sButton>
            </sUpload> -->
            <template v-if="!$route.meta.menuHide && dataBase.h5">
                <div class="gc-panel__h1">Dialog 弹出层</div>
                <sButton type="primary" size="large" @click="asyncHandle">异步关闭</sButton>
                <sButton type="info" size="large" @click="dialogVisible = true">组件调用</sButton>
            </template>
        </div>
        <!-- <van-dialog
            v-model="dialogVisible"
            title="标题"
            show-cancel-button
            :lazy-render="false"
            get-container="#container"
            :beforeClose="beforeClose">
                <img src="https://img.yzcdn.cn/vant/apple-3.jpg">
        </van-dialog> -->
        <van-popup
            v-model="dialogVisible"
            closeable
            position="bottom"
            :style="{height: '20%'}">
            <van-field
                v-model="records"
                type="textarea"
                placeholder="请输入处理记录"
                rows="3"
                autosize />
        </van-popup>
    </div>
</template>

<script>
/* eslint-disable */
import mCropper from '@base/Cropper'
import { uploadFile } from '@/api'

export default {
    data () {
        return {
            visible: false,
            imgUrl: '',
            dialogVisible: false,
            records: ''
        }
    },
    created() {
        // this.dataBase.setValue('token', '97059459-d66a-41ec-a8e0-52790d43710a')
    },
    methods: {
        cancelHandle(data) {
            this.imgUrl = data.url
        },
        okHandle(data) {
            this.imgUrl = data.url
        },
        asyncHandle() {
            this.$Dialog.confirm({
                title: '标题',
                message: '弹窗内容',
                beforeClose: (action, done) => {
                    if (action === 'confirm') {
                        setTimeout(done, 1000);
                    } else {
                        done();
                    }
                }
            });
        },
        beforeClose(action, done) {
            // this.$Notify("请输入用户名和密码")
            // done(false) //不关闭弹框
            if(action === 'confirm') {
                setTimeout(done, 1000)
            } else if(action === 'cancel') {
                done() //关闭
            }
        },
        handleBefore(file) {
            let formdata = new FormData();
            formdata.append('file', file);
            uploadFile(formdata).then(res => {
                this.$Message.success("数据导入成功！")
                this.$refs.upload.clearFiles()
            });
        },
        handleFormatError(file){
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
            })
        },
        handleSuccess(res, file) {
            if(res.errcode === 0) {
                this.dialoLead = false
                this.$Message.success("数据导入成功！")
                this.$refs.upload.clearFiles()
            }
        },
        handleError(error, file) {
            // this.$Message.error("数据导入失败！")
        },  
    },
    components: { mCropper }
}
</script>