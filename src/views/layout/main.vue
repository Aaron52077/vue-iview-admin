<template>
    <div id="app" :class="layoutClass" class="gc-main" :page="pageType">
        <!-- 顶部导航 -->
        <header class="gc-head" id="navTop" v-if="dataBase.getValue('mode') == 9527">
            <div class="gc-head__nav">
                <sMenu mode="horizontal" theme="light" :active-name="pageType || activeName" @on-select="selectTab">
                    <sMenuItem v-for="(item, index) in navList" :name="item.name" :to="item.path" :key="index">{{item.title}}</sMenuItem>
                </sMenu>
            </div>
            <div class="gc-head__rt user-client">
                <!-- 用户头像 -->
                <div class="user-avatar">
                    <mIcon iconClass="iconnan" className="user-avatar__icon"></mIcon>
                    <span>{{userInfo || dataBase.getValue('user')}}</span>
                </div>
                <!-- 消息中心 -->
                <div class="user-msg">
                    <mIcon iconClass="iconduihua" className="user-msg__icon"></mIcon>
                </div>
                <sDropdown class="user-setting" placement="bottom-end" trigger="click" transfer @on-click="userHandle">
                    <mIcon iconClass="iconshezhi" className="user-setting__icon"></mIcon>
                    <sDropdownMenu slot="list">
                        <sDropdownItem name="loginOut" divided>退出登录</sDropdownItem>
                    </sDropdownMenu>
                </sDropdown>
            </div>
        </header>
        <!--内容-->
        <div class="gc-body">
            <slot></slot>
        </div>
        <!-- 系统设置 -->
    </div>
</template>
<script>
/* eslint-disable */
import { mapState } from 'vuex'

export default {
    name: 'layout-main',
    data() {
        return {
            navList: [
                {
                    path: '/home',
                    title: '首页',
                    name: 'home'
                },
                {
                    path: '/manage',
                    title: '系统管理',
                    name: 'manage'
                }
            ],
            activeName: 'home'
        }
    },
    computed: {
        pageType() {
            // 识别当前所在页面模块 meta.module字段
            let path = (this.$route.meta || {}).module || '';
            let type = 'home'
            switch (path) {
                case 'home':
                    type = 'home';
                    break;
                case 'manage':
                    type = 'manage';
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
        ...mapState(['userInfo', 'token'])
    },
    watch: {
        // '$route': 'getPathTitle'
    },
    methods: {
        getPathTitle() {
            const { title } = this.$route.meta;
            if(title) {
                document.title = `${title} 迈越-校园大数据平台`
            }else {
                document.title = '迈越-校园大数据平台'
            }
        },
        selectTab(name) {
            this.activeName = name
        },
        userHandle(name) {
            // 跳转到登录页
            this.dataBase.setValue('mode', '');
            this.$store.commit('setToken', null)
            this.dataBase.setToken = ''
            this.dataBase.delValue('user');
            this.$Message.success('退出成功！')
            setTimeout(() => {
                this.$router.push('/account')
            }, 0)
        },
        
    }
}
</script>
<style lang="less">
/* 框架主体 */
@import '~@/assets/css/common/_var.less';
@import '~@/assets/css/common/_mixins.less';
@--deflaut-color: #504db8;

.gc-main {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    &.gc-layout {
        .gc-body {
            top: 0;
            left: 0; 
        }
    }
    .gc-head {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        min-width: 1366px;
        height: 60px;
        padding: 0 20px;
        .display-flex();
        color: @--color-white;
        background: @--deflaut-color;
        box-shadow: 0px 1px 8px #bbb;
        &__logo {
            .display-flex();
            align-items: center;
            margin-right: 100px;
            .gc-logo {
               margin-right: 30px; 
            }
            .gc-desc {
                position: relative;
                &::after {
                    content: '';
                    position: absolute;
                    left: -15px;
                    top: 2px;
                    width: 200%;
                    height: ~'calc(200% - 12px)';
                    transform: scale(.5);
                    transform-origin: 0 0;
                    pointer-events: none;
                    box-sizing: border-box;
                    border: 0 solid #a4a7de;
                    border-left-width: 2px;
                }
            }
        }
        &__title {
            font-weight: normal;
            font-size: @--size-base + 4;
            line-height: 1.25;
            letter-spacing: 2px;
            & + p {
                font-size: @--size-base - 2;
            }
        }
        &__nav {
            .box-flex(1);
            .ivu-menu-light {
                background: @--deflaut-color; 
                &.ivu-menu-horizontal::after {
                    display: none;
                }
            }
            .ivu-menu-item {
                color: #dee9ff !important;
                &:hover {
                    color: @--color-white !important;
                    border-bottom: 2px solid #7894f8 !important;
                }
            }
            .ivu-menu-item-active {
                color: @--color-white !important;
                border-color: #7894f8 !important;
            }
        }
        &__rt {
            height: 60px;
            .display-flex();
            align-items: center;
            .user-setting {
                height: 60px;
                line-height: 60px;
                &__icon {
                    vertical-align: -6px;
                    font-size: @--size-base + 10;
                    cursor: pointer;
                }
            }
            .user-avatar {
                &__icon {
                    font-size: @--size-base + 4;
                }
                span {
                    padding-left: 5px;
                    font-size: @--size-base - 2;
                    text-align: center;
                }
            }
            .user-msg {
                margin: 0 10px;
                &__icon {
                    font-size: @--size-base + 10;
                }
            }
        }
    }
    &__lt {
        position: relative;
        width: 70px;
        height: 90%;
        .display-flex();
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .nav-left {
            .display-flex();
            align-items: center;
            width: 100%;
            height: 75px;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            .transition(background .15s ease-in-out);
            &.is-active {
                background: #6e98fa;
                .nav-left__icon,
                .nav-left__desc {
                    color: @--color-white;
                }
            }
            &__icon {
                font-size: @--size-base + 8;
                color: #656565;
            }
            &__desc {
                margin-top: 3px;
                font-size: @--size-base;
                color: #3b3a48;
            }
        }
    }
    .gc-left {
        &__edit {
            position: absolute;
            left: 10px;
            right: 10px;
            bottom: 15%;
            .display-flex();
            align-items: center;
            flex-direction: column;
            width: 50px;
            height: 50px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, .1);
            .border-radius(50%);
            cursor: pointer;
            .edit-icon {
                padding-top: 6px;
                &__core {
                    color: #6e98fa;
                    font-size: @--size-base + 4;
                }
            }
            .edit-inner {
                color: #3b3a48;
                font-size: @--size-base - 2;
            }
        }
    }
    .gc-body {
        position: absolute;
        top: 60px;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #F2F7F8;
    }
    .gc-foot {
        position: absolute;
        left: 70px;
        right: 0;
        bottom: 0;
        height: 30px;
        width: 100%;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        color: #8f939a;
    }
}
</style>
