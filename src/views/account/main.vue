<template>
    <div class="gc-login gc-login__bg">
        <!-- 粒子动画组件 -->
        <pointwave :color="0x097bdb" />
        <div class="gc-login__bd">
            <div class="gc-login__title">wuli-admin-pro</div>
            <div class="gc-login__setting">
                <a class="gc-login__setting--item" href="https://github.com/Aaron52077/vue-wuli-ui.git" target="_blank">
                    <sIcon type="logo-github" :size="30" />
                </a>
                <div class="gc-login__setting--item">
                    <sDropdown placement="bottom-end" @on-click="handleLanguages($event)">
                        <sIcon type="md-globe" :size="30" style="cursor: pointer;" />
                        <sDropdownMenu slot="list">
                            <sDropdownItem v-for="m in languages" :name="m.value" :key="m.value">{{m.key}}</sDropdownItem>
                        </sDropdownMenu>
                    </sDropdown>
                </div>
            </div>
            <sForm ref="formData" :model="formData" :rules="rules">
                <sFormItem prop="username">
                    <sInput type="text" v-model="formData.username" placeholder="帐号">
                        <sIcon type="ios-person-outline" slot="prepend"></sIcon>
                    </sInput>
                </sFormItem>
                <sFormItem prop="password">
                    <sInput ref="password" :type="passwordType" v-model="formData.password" placeholder="密码" @on-enter="handleSubmit()">
                        <sIcon :type="passwordType === 'password' ? 'ios-eye-off' : 'ios-eye'" slot="prepend" @click.native="handlePassword()"></sIcon><Icon type="" />
                    </sInput>
                </sFormItem>
                <sFormItem>
                    <div class="gc-login__items">
                        <div class="gc-login__item">
                            <span>{{t('帐号')}}: admin</span>
                            <span>{{t('密码')}}: {{t('任意类型')}}</span>
                        </div>
                    </div>
                    <sButton type="primary" :loading="loading" @click="handleSubmit">登陆</sButton>
                </sFormItem>
            </sForm>
        </div>
	</div>
</template>

<script>
/* eslint-disable */
import { locales } from '@/i18n'
import { encryption } from "@/utils"
import pointwave from './pointwave.vue'

export default {
    name: 'account',
    data () {
        return {
            redirect: undefined,
            formData: {
                username: 'admin',
                password: '111111'
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 1, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ]
            },
            loading: false,
            passwordType: 'password',
            languages: [
                {
                    key: '中文',
                    value: 'zh-cn'
                },
                {
                    key: '繁体',
                    value: 'zh-tw'
                },
                {
                    key: 'English',
                    value: 'en'
                }
            ]
        }
    },
    methods: {
        handlePassword() {
            if (this.passwordType === 'password') {
                this.passwordType = 'text'
            } else {
                this.passwordType = 'password'
            }
        },
        handleSubmit() {
            // 密码加密算法
            let userInfo = encryption({
                data: this.formData,
                key: "123456789",
                param: ["password"]
            });
            // 加密登录信息
            let formData = {
                name: userInfo.username,
                password: encodeURIComponent(userInfo.password)
            };
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$store.dispatch('user/accountIn', formData).then(res => {
                        this.loading = false
                        this.$router.push({ path: this.redirect || '/' })
                    }).catch(err => {
                        this.loading = false
                    });
                } else {
                    this.$message.error('error submit!!')
                    return false
                }
            })
        },
        handleLanguages(name) {
            this.dataBase.setLang = name
        }
    },
    locales: locales,
    components: { pointwave }
}
</script>

<style lang="less" scoped>
.gc-login {
    width: 100%;
    min-height: 100vh;
    background-color: #283443;
    overflow: hidden;
    &__bg {
        background: url(~@/assets/img/bg.png) no-repeat;
        background-size: cover;
        background-position: 50%;
    }
    &__bd {
        position: relative;
        width: 420px;
        max-width: 100%;
        padding: 180px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }
    &__title {
        padding: 10px 0;
        font-size: 24px;
        color: #fff;
        text-align: center;
    }
    &__items {
        display: inline-block;
        margin-right: 10px;
    }
    &__item {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
         span:first-of-type {
            margin-right: 16px;
        }
    }
    &__setting {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        &--item {
            color: #fff;
            & + div {
                margin-left: 10px;
            }
        }
    }
}
</style>


