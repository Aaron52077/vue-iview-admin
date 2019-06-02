<template>
    <div id="app" :class="layoutClass" class="gc-main container" :page="pageType">
        <!-- 顶部导航 -->
        <header class="gc-head" id="navTop">
            <div class="gc-head__bd">
                <router-link to="/" class="gc-head__logo"><img src="~@/assets/img/logo.png" /></router-link>
                <sMenu class="gc-head__nav" mode="horizontal" theme="light" :active-name="active">
                    <sMenuItem v-for="item in navList" :name="item.id" :key="item.id">
                        <sIcon :type="item.icon" />{{item.name}}
                    </sMenuItem>
                </sMenu>
            </div>
        </header>
        <!-- 内容 -->
        <div class="gc-body">
            <div class="gc-body__lt">
                <mScrollbar hide>
                    <sMenu :active-name="active" width="210px">
                        <sMenuGroup v-for="(item, index) in menuList" :key="index" :title="item.name">
                            <sMenuItem v-for="(m, idx) in item.children" :key="idx" :name="m.name" :to="m.path">
                                <sIcon :type="m.icon" />{{m.name}}
                            </sMenuItem>
                        </sMenuGroup>
                    </sMenu>
                </mScrollbar>
            </div>
            <mInfiniteScroll class="gc-body__rt"> 
                <slot></slot>
            </mInfiniteScroll>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import {navList, menuList} from './conf';

export default {
    name: 'layout-main',
    data() {
        return {
            navList,
            menuList,
            active: 'Icon 图标',
        }
    },
    computed: {
        pageType() {
            // 识别当前所在页面模块 meta.module字段
            let path = (this.$route.meta || {}).module || '';
            let type = 'entry'
            switch (path) {
                case 'entry':
                    type = 'entry';
                    break;
                case 'docs':
                    type = 'docs';
                    break;
                case 'api':
                    type = 'api';
                    break;
                default:
                    type = 'account'
                    break;
            }
            return type
        },
        layoutClass() {
            // 全局布局样式
            let dataBase = this.dataBase;
            return [dataBase.token == '' ? 'gc-layout' : '']
        },
    },
    created() {
        this.MapInit();
    },
    methods: {
        getPathTitle() {
            const { title } = this.$route.meta;
            if(title) {
                document.title = `${title} wuli-ui`
            }
        },
        MapInit(ak = 'c939d01cf713a7826caf8421b9be8c81') {
            // 插入页面中
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
            document.head.appendChild(script);
        }
    },
    watch: {
        // '$route': 'getPathTitle'
    },
}
</script>
<style lang="less">
/* 框架主体 */
@import '~@/assets/css/common/_var.less';
@import '~@/assets/css/common/_mixins.less';

.gc-main {
    position: relative;
    width: 100%;
    .gc-head {
        position: fixed;
        width: 100%;
        top: 0;
        right: 0;
        height: 60px;
        background: @--color-white;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, .1);
        z-index: 1000;
        &__logo {
            position: relative;
            float: left;
            margin-top: 6px;
            height: 50px;
            width: 118px;
            &::after {
                content: "";
                position: absolute;
                display: block;
                top: 16px;
                left: 124px;
                width: 1px;
                height: 24px;
                background: #ebedee;
            }
            img {
                height: 100%;
            }
        }
        &__nav {
            float: left;
            margin-left: 42px;
        }
        &__bd {
            margin: 0 auto;
            width: 95%;
            height: 65px;
            .clearfix();
        }
    }
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
