<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Icon 图标  <span>iview内置图标拓展</span></div>
        <sDivider></sDivider>
        <div class="gc-icons">
            <div class="gc-icon__item" v-for="item in iconList" :key="item" v-clipboard="clipOptions(item)">
                <sTooltip :content="item" placement="top">
                    <mIcon iconClass="gc-icon" :iconName="item" />
                </sTooltip>
                <p>{{item}}</p>
            </div>
        </div>
    </div>
</template>

<script>
// 指令单独调用实例
// import directives from '@/directive/install'
// directives: {
//     clipboard: directives.clipboard
// }
export default {
    data () {
        return {
            iconList: [
                'wp-all',
                'wp-back',
                'wp-cart',
                'wp-category',
                'wp-comments',
                'wp-cry',
                'wp-delete',
                'wp-edit',
                'wp-email',
                'wp-form',
                'wp-help',
                'wp-information',
                'wp-less',
                'wp-moreunfold',
                'wp-more',
                'wp-pic',
                'wp-qrcode',
                'wp-refresh',
                'wp-search',
                'wp-set',
                'wp-smile',
                'wp-success',
                'wp-survey',
                'wp-training',
                'wp-viewgallery',
                'wp-viewlist',
                'wp-warning',
                'wp-wrong',
                'wp-account',
                'wp-add',
                'wp-clock',
                'wp-remind',
                'wp-calendar',
                'wp-attachment',
                'wp-discount',
                'wp-service',
                'wp-box',
                'wp-process',
                'wp-home',
                'wp-gifts',
                'wp-trade-assurance',
                'wp-scanning',
                'wp-filter',
                'wp-history',
                'wp-subtract',
                'wp-dollar',
                'wp-gerenzhongxin',
                'wp-jifen',
                'wp-operation',
                'wp-remind1',
                'wp-icondownload',
                'wp-map',
                'wp-bad',
                'wp-good',
                'wp-skip',
                'wp-compass',
                'wp-security',
                'wp-store',
                'wp-phone',
                'wp-bussinessman',
                'wp-pdf',
                'wp-zip',
                'wp-copy',
                'wp-bussinesscard',
                'wp-hot',
                'wp-data',
                'wp-trade',
                'wp-component',
                'wp-component-filling',
                'wp-color',
                'wp-color-filling',
                'wp-favorites',
                'wp-pic-filling',
                'wp-video',
                'wp-task-management',
                'wp-password',
                'wp-good-filling',
                'wp-camera',
                'wp-help-fill',
                'wp-add-account',
                'wp-inspection',
                'wp-play-filling',
                'wp-nosound-filling',
                'wp-sound-filling'
            ]
        }
    },
    methods: {
        clipOptions(item) {
            return {
                value: item,
                success: () => {
                    this.$Message.success('复制成功')
                },
                error: () => {
                    this.$Message.error('复制失败')
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.gc-icons {
    .clearfix();
    .gc-icon {
        font-size: 32px;
        &__item {
            float: left;
            position: relative;
            margin: 6px 6px 6px 0;
            width: 145px;
            height: 100px;
            text-align: center;
            padding-top: 10px;
            list-style: none;
            transition: all .2s ease;
            cursor: pointer;
            p {
                padding-top: 15px;
                margin: 5px;
                font-size: 14px;
            }
        }
    }
}
</style>
