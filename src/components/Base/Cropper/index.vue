<template>
  <div v-if="currentValue">
    <sModal
      class="gc-dia-main"
      width="1000"
      v-model="currentValue"
      transfer
      :closable="false"
      :mask-closable="false"
    >
      <div slot="header" class="gc-dia-title">裁剪示例</div>
      <div class="gc-dia-body" style="position:relative;min-height:300px;">
        <sUpload
          ref="upload"
          :show-upload-list="false"
          :before-upload="handleBeforeUpload"
          :format="['jpg', 'jpeg', 'png']"
          :max-size="200"
          :action="`${dataBase.apihost}/admin/file/upload`"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          style="display: inline-block;width:92px;"
        >
          <sButton type="info">请选择图片</sButton>
        </sUpload>
        <div class="wrapper">
          <vue-cropper
            ref="cropper"
            :img="myCropper.img"
            :outputSize="myCropper.size"
            :outputType="myCropper.outputType"
            :info="myCropper.info"
            :canScale="myCropper.canScale"
            :autoCrop="myCropper.autoCrop"
            :autoCropWidth="myCropper.width"
            :autoCropHeight="myCropper.height"
          >
          </vue-cropper>
        </div>
      </div>
      <div slot="footer" class="gc-dia-foot">
        <sButton
          size="large"
          class="gc-btn-text gc-btn-no"
          type="text"
          :disabled="load"
          @click="handleCancel"
          >取消</sButton
        >
        <sButton
          size="large"
          class="gc-btn-text gc-btn-yes"
          type="text"
          :loading="load"
          @click="handleFinish(fileType)"
          >确定</sButton
        >
      </div>
    </sModal>
  </div>
</template>

<script>
/* eslint-disable */
import { VueCropper } from "vue-cropper";

export default {
  props: {
    size: Number,
    option: Object,
    value: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  components: { VueCropper },
  data() {
    return {
      fileName: "",
      fileType: "Blob",
      isShow: "",
      load: false,
      myCropper: {
        img: "",
        info: true,
        size: 1,
        outputType: "png",
        canScale: true,
        autoCrop: true, // 只有自动截图开启 宽度高度才生效
        width: 150,
        height: 150
      }
    };
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
  methods: {
    handleBeforeUpload(file) {
      // 创建一个 FileReader 对象
      let reader = new FileReader();
      let imgUrlBase64;
      // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
      // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）读取文件作为 URL 可访问地址
      if (file) {
        imgUrlBase64 = reader.readAsDataURL(file); // 转化为base64
        reader.onload = () => {
          this.myCropper.img = reader.result;
        };
        const fileName = `${(file || {}).name}`;
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: `${file.name}格式不正确, 请上传jpg或png格式的图片`
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出最大图片上传限制",
        desc: `${file.name}文件超出限制, 单张图片不超过200KB`
      });
    },
    handleFinish(type) {
      let sData = "";
      let { img } = this.myCropper;
      if (img && img !== "") {
        // 获取截图
        this.$refs.cropper.getCropData(data => {
          const dataB64 = data; //base64 用于预览
          if (type === "Blob") {
            this.getCropBlob(data, blobData => {
              sData = blobData;
            });
          } else {
            sData = data;
          }
          this.myCropper.img = "";
          this.currentValue = false;
          this.$emit("on-ok", { url: dataB64 });
          // this.dataBase.log('base64截图信息', sData, dataB64);
        });
      } else {
        this.$Message.error("请选择上传图片");
      }
    },
    handleCancel() {
      const params = { url: "" };
      this.myCropper.img = "";
      this.currentValue = false;
      this.$emit("on-cancel", params);
    },
    getCropBlob(data, cb) {
      var arr = data.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      cb(new Blob([u8arr], { type: mime }));
    },
    handleUpload() {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer 12be9d0b-98d3-4d4b-a075-2a5d0eda10f3"
      };
      const parmas = {
        file: this.fileName
      };
      this.$http({
        method: "post",
        headers: headers,
        url: `${this.dataBase.apihost}/admin/file/upload`,
        data: parmas
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less">
.wrapper {
  position: relative;
  margin-top: 15px;
  width: 100%;
  height: 300px;
}
</style>
