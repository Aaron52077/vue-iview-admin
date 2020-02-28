<template>
    <div class="gc-login gc-login__bg">
        <!-- 当前时间 -->
        <div class="gc-login__layer gc-login__time">{{nowTime}}</div>
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
                        <sIcon type="ios-person-outline" slot="prepend" />
                    </sInput>
                </sFormItem>
                <sFormItem prop="password">
                    <sInput ref="password" :type="passwordType" v-model="formData.password" placeholder="密码">
                        <sIcon :type="passwordType === 'password' ? 'ios-eye-off' : 'ios-eye'" slot="prepend" @click.native="handlePassword()" />
                    </sInput>
                </sFormItem>
                <sFormItem prop="sidentify">
                    <sInput placeholder="验证码" v-model="formData.sidentify" :maxlength="4" @on-enter="handleSubmit()">
                        <sIcon type="md-ionitron" slot="prepend" />
                        <mIdentifyCanvas v-show="identifyType === 'canvas'" slot="append" :width="90" :height="30" :value.sync="identifyCode" @click="getIdentifyCode" />
                        <mIdentify v-show="identifyType === 'normal'" slot="append" :value.sync="identifyCode" :width="90" :height="30" @click="getIdentifyCode" />
                    </sInput>
                </sFormItem>
                <sFormItem>
                    <div class="gc-login__items">
                        <div class="gc-login__item">
                            <span>验证码风格:</span>
                        </div>
                    </div>
                    <sRadioGroup v-model="identifyType" type="button">
                        <sRadio label="normal">normal</sRadio>
                        <sRadio label="canvas">canvas</sRadio>
                    </sRadioGroup>
                </sFormItem>
                <sFormItem>
                    <div class="gc-login__items">
                        <div class="gc-login__item">
                            <span>{{t('帐号')}}: admin</span>
                            <span>{{t('密码')}}: {{t('任意')}}</span>
                        </div>
                    </div>
                    <sButton type="primary" :loading="loading" @click="handleSubmit">登陆</sButton>
                    <sButton style="margin-left: 5px;" type="info" @click="thirdAccout">第三方登录模拟</sButton>
                </sFormItem>
            </sForm>
        </div>
        <div class="gc-login__footer">
            <p class="gc-login__footer--copyright">Copyright&nbsp;&nbsp;&nbsp;<sIcon type="logo-github" />&nbsp;&nbsp;2019 wuli Admin&nbsp;&nbsp;<a href="https://github.com/Aaron52077" target="_blank">@Aaron</a></p>
            <p class="gc-login__footer--options">
                <a href="javascript:;">帮助</a>
                <a href="javascript:;">隐私</a>
                <a href="javascript:;">条款</a>
            </p>
        </div>
	</div>
</template>

<script>
/* eslint-disable */
import { locales } from '@/i18n'
import { encryption } from '@/utils'
import { mIdentify, mIdentifyCanvas } from '@base/Identify'
import pointwave from './pointwave.vue'

export default {
    name: 'account',
    data () {
        const validateSidentify = (rule, value, callback) => {
            if (value && (value.toLowerCase() !== this.identifyCode.toLowerCase())) {
                callback(new Error('请填写正确验证码'));
            } else {
                callback();
            }
        };
        return {
            redirect: undefined,
            timeInterval: null,
            nowTime: this.dataBase.dateToStr(new Date(), 'hh:mm:ss'),
            identifyCode: '',
            identifyType: 'normal',
            formData: {
                username: 'admin',
                password: '111111',
                sidentify: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 1, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                sidentify: [
                    { validator: validateSidentify, trigger: "blur" }
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
    mounted() {
        this.timeInterval = setInterval(() => {
            this.refreshTime()
        }, 1000)
    },
    beforeDestroy() {
        clearInterval(this.timeInterval)
    },
    methods: {
        refreshTime() {
            this.nowTime = this.dataBase.dateToStr(new Date(), 'hh:mm:ss')
        },
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
                        this.$Message.success('登录成功！')
                    }).catch(err => {
                        this.loading = false
                    });
                } else {
                    this.$Message.error('登录失败！')
                    return false
                }
            })
        },
        handleLanguages(name) {
            this.dataBase.setLang = name
        },
        thirdAccout(thirdpart = '测试登录') {        
            this.openModal('https://e.weibo.com/register/register', thirdpart, 1080, 810)
        },
        /**
        * @param {Sting} url
        * @param {Sting} title
        * @param {Number} w
        * @param {Number} h
        */
        openModal(url, title, w, h) {
            // Fixes dual-screen position                            Most browsers       Firefox
            const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
            const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

            const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
            const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

            const left = ((width / 2) - (w / 2)) + dualScreenLeft
            const top = ((height / 2) - (h / 2)) + dualScreenTop
            const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

            // Puts focus on the newWindow
            if (window.focus) {
                newWindow.focus()
            }
        },
        getIdentifyCode(data) {
            this.identifyCode = data
        }
    },
    locales: locales,
    components: { pointwave, mIdentify, mIdentifyCanvas }
}
</script>

<style lang="less" scoped>
.gc-login {
    width: 100%;
    min-height: 100vh;
    background-color: #283443;
    overflow: hidden;
    &__bg {
        background: url(~@/assets/img/bg.jpg) no-repeat;
        background-size: cover;
        background-position: 50%;
    }
    &__bd {
        position: relative;
        width: 430px;
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
    &__layer {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
    &__time {
        bottom: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;
        font-size: 20em;
        font-weight: bold;
        color: rgba(45, 140, 240, 0.1);
        .text-shadow-light(50px, #003756);
        overflow: hidden;
    }
    &__area {
        bottom: 0;
        overflow: hidden;
    }
    &__footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 1em 0;
        &--copyright {
            margin-bottom: 10px;
            font-size: 12px;
            line-height: 12px;
            text-align: center;
            color: @--color-white;
            a {
                color: @--color-white;
            }
        }
        &--options {
            font-size: 12px;
            line-height: 12px;
            text-align: center;
            a {
                color: @--color-white;
                margin: 0 1em;
            }
        }
    }
}
</style>