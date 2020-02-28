<template>
    <!-- 顶部导航 -->
    <header class="gc-head" id="navTop">
        <div class="gc-head__bd">
            <router-link to="/" class="gc-head__logo">
                <img :src="`theme/${themeActive.name}/logo@2x.png`">
            </router-link>
            <template v-if="!dataBase.h5">
                <div class="gc-head__inner">轻量、可靠的中后台Vue Admin</div>
                <sMenu class="gc-head__nav" mode="horizontal" theme="light" :active-name="navActive" @on-select="onPathHandle">
                    <sMenuItem v-for="item in navList" :name="item.name" :to="item.path" :key="item.id" v-waves> 
                        <sIcon :type="item.icon" />{{t(item.name)}}
                    </sMenuItem>
                </sMenu>
                <mGlobalSearch id="global-search" class="gc-head__inner" />
            </template>
            <sDropdown class="gc-head__info" transfer @on-click="handleInfo($event)">
                <mAvatar :src="avatar" />
                <div class="gc-head__info--name">{{name}}</div>
                <sDropdownMenu slot="list">
                    <sDropdownItem name="admin">个人中心</sDropdownItem>
                    <a target="_blank" href="https://github.com/Aaron52077/vue-wuli-ui.git">
                        <sDropdownItem>项目地址</sDropdownItem>
                    </a>
                    <a target="_blank" href="https://aaron52077.github.io/vue-wuli-ui/">
                        <sDropdownItem>项目文档</sDropdownItem>
                    </a>
                    <sDropdownItem name="logout" divided>退出登录</sDropdownItem>
                </sDropdownMenu>
            </sDropdown>
            <mScreenfull class="gc-head__icons" v-model="isFullscreen" />
            <mGlobalTheme class="gc-head__icons" />
            <mGlobalErrorLog class="gc-head__icons" />
        </div>
    </header>
</template>
<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import GlobalSearch from '@base/GlobalSearch'
import GlobalTheme from '@base/Theme'
import GlobalErrorLog from './errorLog.vue'
import { navList } from '../config'

export default {
    name: 'layout-main-header',
    data() {
        return {
            navList,
            navActive: '组件类',
            isFullscreen: false
        }
    },
    computed: {
        ...mapGetters({
            themeActive: 'theme/activeSetting'
        }),
        ...mapGetters([
            'name',
            'avatar'
        ])
    },
    methods: {
        onPathHandle(name) {
            this.navActive = name;
            const stauts = {
                '组件栏': '图标',
                '插件类': '工具合集',
                '图表': '图表'
            };
            this.$store.commit('app/SET_NAVBAR', stauts[name]);
        },
        async logout() {
            await this.$store.dispatch('user/accountOut')
            this.$router.push(`/account?redirect=${this.$route.fullPath}`)
            this.$Message.success('退出成功！')
        },
        handleInfo(name) {
            if (name === 'logout') {
                this.logout();
            }
            if (name === 'admin') {
                this.$Modal.info({
                    title: '系统提示',
                    content: '<p>当前功能在计划中，敬请期待</p>'
                });
            }
        }
    },
    components: { 
        'mGlobalSearch': GlobalSearch, 
        'mGlobalTheme': GlobalTheme,
        'mGlobalErrorLog': GlobalErrorLog
    }
}
</script>

<style lang="less">
/* 框架主体 */
.gc-head {
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
    height: 60px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, .1);
    z-index: 999;
    &__logo {
        position: relative;
        float: left;
        height: 60px;
        width: 109px;
        &::after {
            content: "";
            position: absolute;
            display: block;
            top: 16px;
            left: 114px;
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
        margin-left: 10px !important;
        &.ivu-menu {
            background: transparent;
        }
    }
    &__bd {
        margin: 0 auto;
        width: 95%;
        height: 60px;
        .clearfix();
    }
    &__inner {
        float: left;
        padding-left: 20px;
        height: 60px;
        line-height: 60px;
    }
    &__info {
        float: right;
        margin-left: 10px;
        max-width: 140px;
        height: 60px;
        line-height: 60px;
        &--name {
            display: inline-block;
            margin-left: 5px;
        }
    }
    &__icons {
        float: right;
    }
    .ivu-select-selection {
        background: transparent;
    }
}
</style>