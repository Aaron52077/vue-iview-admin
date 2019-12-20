<template>
    <!-- 顶部导航 -->
    <header class="gc-head" id="navTop">
        <div class="gc-head__bd">
            <router-link to="/" class="gc-head__logo"><img src="~@/assets/img/logo.png" /></router-link>
            <template v-if="!dataBase.h5">
                <div class="gc-head__inner">基于iview的自定义组件项目拓展</div>
                <mGlobalSearch id="global-search" class="gc-head__inner" />
                <mScreenfull class="gc-head__screen" v-model="isFullscreen" />
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
            <sMenu class="gc-head__nav" v-if="!dataBase.h5" mode="horizontal" theme="light" :active-name="navActive" @on-select="onPathHandle">
                <sMenuItem v-for="item in navList" :name="item.name" :to="item.path" :key="item.id" v-waves> 
                    <sIcon :type="item.icon" />{{t(item.name)}}
                </sMenuItem>
            </sMenu>
        </div>
    </header>
</template>
<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import GlobalSearch from '@base/GlobalSearch'
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
        ...mapGetters([
            'name',
            'avatar'
        ])
    },
    methods: {
        onPathHandle(name) {
            this.navActive = name;
            const stauts = {
                '组件类': '图标',
                'api': '工具合集',
                '可视化': '图表'
            };
            this.$store.commit('app/SET_NAVBAR', stauts[name]);
        },
        async logout() {
            await this.$store.dispatch('user/accountOut')
            this.$router.push(`/account?redirect=${this.$route.fullPath}`)
        },
        handleInfo(name) {
            if(name === 'logout') {
                this.logout();
            }
            if(name === 'admin') {
                this.$Modal.info({
                    title: '系统提示',
                    content: '<p>当前功能在计划中，敬请期待</p>'
                });
            }
        }
    },
    components: { 'mGlobalSearch': GlobalSearch }
}
</script>
<style lang="less">
/* 框架主体 */
@import '~@/assets/css/common/_var.less';
@import '~@/assets/css/common/_mixins.less';
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
        max-width: 140px;
        height: 60px;
        line-height: 60px;
        &--name {
            display: inline-block;
            margin-left: 5px;
        }
    }
    &__screen {
        float: right;
        margin-left: 15px;
    }
}
</style>