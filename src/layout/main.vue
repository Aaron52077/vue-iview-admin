<template>
    <div class="gc-main container">
        <!-- 顶部导航 -->
        <header-view />
        <!-- 内容 -->
        <div class="gc-body">
            <div class="gc-body__lt sidebar-container" :style="{width: dataBase.h5 ? `${layoutWeb}px` : ''}"  :class="{'gc-h5': dataBase.h5}">
                <sidebarView />
            </div>
            <mInfiniteScroll class="gc-body__rt" :style="{paddingLeft: dataBase.h5 ? `${layoutWeb}px` : ''}"> 
                <tagsView />
                <!-- 移除slot插槽方式，采用页面跳转 -->
                <transition name="el-fade-in-linear" mode="out-in"> 
                    <router-view :key="viewKey" />
                </transition>
            </mInfiniteScroll>
        </div>
        <!-- h5底部导航 tabbar -->
        <footerView v-if="dataBase.h5" />
    </div>
</template>
<script>
/* eslint-disable */
import { locales } from '@/i18n'
import { headerView, sidebarView, tagsView, footerView } from './components'

export default {
    name: 'layout-main',
    data() {
        return {
            navActive: '组件类'
        }
    },
    components: { headerView, sidebarView, tagsView, footerView },
    computed: {
        layoutWeb() {
            return this.dataBase.h5 ? 75 : 210
        },
        viewKey() {
            return this.$route.fullPath
        }
    },
    created() {
        // 引入百度地图
        // this.MapInit();
    },
    methods: {
        MapInit(ak = 'c939d01cf713a7826caf8421b9be8c81') {
            // 插入页面中
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
            document.head.appendChild(script);
        },
        openUrl() {
            // 跳转新链接方式
            let routeUrl = this.$router.resolve({path: '/bi'});
            window.open(routeUrl.href, '_blank');
        }
    },
    locales: locales,
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    }
}
</script>
<style lang="less">
/* 框架主体 */
@import '~@/assets/css/common/_var.less';
@import '~@/assets/css/common/_mixins.less';

.gc-main {
    position: relative;
    width: 100%;
    .gc-body {
        position: relative;
        margin: 60px auto 0;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
        &__lt {
            position: absolute;
            left: 0;
            top: 0;
            width: 210px;
            height: 100%;
            background: @--color-white;
            border-right: 1px solid #eee;
            z-index: 1;
        }
        &__rt {
            position: relative;
            padding-left: 211px;
            width: 100%;
        }
    }
}
</style>
