# 通用弹窗样式

```
<sModal class="gc-dia-main" width="1000" v-model="showDialog" transfer :closable="false" :mask-closable="false">
    <div slot="header" class="gc-dia-title">标题</div>
    <div class="gc-dia-body" style="position:relative;min-height:300px;">
        ....内容自定
    </div>
    <div slot="footer" class="gc-dia-foot">
        <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="showDialog=false">取消</sButton>
        <sButton size="large" class="gc-btn-text gc-btn-no" type="text" @click="">确认</sButton>
    </div>
</sModal>
```
