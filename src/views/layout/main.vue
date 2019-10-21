<template>
    <div id="app" :class="layoutClass" class="gc-main container" :page="pageType">
        <!-- 顶部导航 -->
        <header class="gc-head" id="navTop">
            <div class="gc-head__bd">
                <router-link to="/" class="gc-head__logo"><img src="~@/assets/img/logo.png" /></router-link>
                <div class="gc-head__inner">基于iview的自定义组件项目拓展</div>
                <sMenu class="gc-head__nav" v-if="!dataBase.h5" mode="horizontal" theme="light" :active-name="navActive" @on-select="pathHandle">
                    <template v-for="item in navList">
                        <template v-if="item.childrens && item.childrens.length > 0">
                             <submenu :name="item.name" :key="item.name">
                                <template slot="title">
                                    <sIcon :type="item.icon" />{{item.name}}
                                </template>
                                <sMenuGroup v-for="(p, index) in item.childrens" :title="p.title" :key="index">
                                    <template v-if="p.title === '源码'">
                                        <sMenuItem v-for="(m, idx) in p.list" :name="m.value" :key="idx * 2">
                                            <a href="https://github.com/Aaron52077/vue-wuli-ui.git" target="_blank">地址</a>
                                        </sMenuItem>
                                    </template>
                                    <template v-else>
                                        <sMenuItem v-for="(m, idx) in p.list" :name="m.value" :key="idx * 2">{{m.key}}</sMenuItem>
                                    </template>
                                </sMenuGroup>
                            </submenu>
                        </template>
                        <template v-else>
                            <sMenuItem :name="item.name" :to="item.path" :key="item.id">
                                <sIcon :type="item.icon" />{{t(item.name)}}
                            </sMenuItem>
                        </template>
                    </template>
                </sMenu>
            </div>
        </header>
        <!-- 内容 -->
        <div class="gc-body">
            <div class="gc-body__lt sidebar-container" :style="{width: dataBase.h5 ? `${layoutWeb}px` : ''}"  :class="{'gc-h5': dataBase.h5}">
                <mScrollbar hide>
                    <sMenu :active-name="active" :width="`${layoutWeb}px`">
                        <sMenuGroup v-for="(item, index) in menuList" :key="index" :title="item.name">
                            <sMenuItem v-for="(m, idx) in item.children" :key="idx" :name="m.name" :to="m.path">
                                <sIcon :type="m.icon" /><span v-show="!dataBase.h5">{{t(m.name)}}</span>
                            </sMenuItem>
                        </sMenuGroup>
                    </sMenu>
                </mScrollbar>
            </div>
            <mInfiniteScroll class="gc-body__rt" :style="{ paddingLeft: dataBase.h5 ? `${layoutWeb}px` : '' }"> 
                <slot></slot>
            </mInfiniteScroll>
        </div>
        <!-- h5底部导航 tabbar -->
        <template v-if="!$route.meta.menuHide && dataBase.h5">
            <van-tabbar
                class="gc-tabbar"
                v-model="active"
                active-color="#3E6DE3"
                inactive-color="#000" 
                safe-area-inset-bottom
                route>
                <van-tabbar-item 
                    v-for="(item,index) in navList.slice(0, 3)"
                    :key="index" 
                    replace 
                    :to="item.path" 
                    :name="item.name">
                    <span>{{item.name}}</span>
                    <sIcon slot="icon" :type="item.icon" />
                </van-tabbar-item>
            </van-tabbar>
        </template>
    </div>
</template>
<script>
/* eslint-disable */
import { locales } from '@/i18n';
import {navList, menuList} from './config';

export default {
    name: 'layout-main',
    data() {
        return {
            navList,
            menuList,
            active: 'Icon 图标',
            navActive: '组件类'
        }
    },
    computed: {
        pageType() {
            // 识别当前所在页面模块 meta.module字段
            let path = (this.$route.meta || {}).module || '';
            let type = 'docs'
            switch (path) {
                case 'echarts':
                    type = 'echarts';
                    this.navActive = '可视化';
                    break;
                case 'docs':
                    type = 'docs';
                    this.navActive = '组件类';
                    break;
                case 'api':
                    type = 'api';
                    this.navActive = 'api';
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
        layoutWeb() {
            return !this.$route.meta.menuHide && this.dataBase.h5 ? 75 : 210
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
            script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
            document.head.appendChild(script);
        },
        pathHandle(name) {
            this.navActive = name;
            switch (name) {
                case '组件类':
                    this.active = '图标'
                    break;
                case 'api':
                    this.active = '工具合集'
                    break;
                case '可视化':
                    this.active = '图表'
                    break;
                default:
                    this.dataBase.setLang = name
                    break;
            }
        }
    },
    locales: locales
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
            float: right;
            margin-left: 42px;
        }
        &__bd {
            margin: 0 auto;
            width: 95%;
            height: 65px;
            .clearfix();
        }
        &__inner {
            float: left;
            padding-left: 20px;
            height: 60px;
            line-height: 65px;
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
.gc-h5 {
    .ivu-menu-vertical .ivu-menu-item-group-title {
        padding-left: 0;
        text-align: center;
    }
    .ivu-menu-item-group > ul {
        text-align: center;
    }
}
</style>
