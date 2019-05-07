<template>
    <div class="gc-login">
        <div class="gc-login__bd">
            <sForm ref="formData" :model="formData" :rules="rules">
                <sFormItem prop="username">
                    <sInput type="text" v-model="formData.username" placeholder="帐号">
                        <sIcon type="ios-person-outline" slot="prepend"></sIcon>
                    </sInput>
                </sFormItem>
                <sFormItem prop="password">
                    <sInput type="password" v-model="formData.password" placeholder="密码" @on-enter="handleSubmit('formData')">
                        <sIcon type="ios-lock-outline" slot="prepend"></sIcon>
                    </sInput>
                </sFormItem>
                <sFormItem>
                    <sButton type="primary" @click="handleSubmit">登陆</sButton>
                </sFormItem>
            </sForm>
        </div>
	</div>
</template>

<script>
/* eslint-disable */
import cache from '@/utils/cache'
import { randomLenNum, encryption } from "@/utils";
import { userLogin } from "@/api/login";
export default {
    name: 'account',
    data () {
        return {
            formData: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 1, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.dataBase.setValue('mode', '');
    },
    methods: {
        handleSubmit() {
            // 密码加密算法
            let userInfo = encryption({
                data: this.formData,
                key: "1234567812345678",
                param: ["password"]
            });
            // 切换到数据平台
            this.dataBase.setValue('mode', 9527);   // 自定义识别值
            let passwords = encodeURIComponent(userInfo.password);
            this.$refs.formData.validate((valid) => {
                if(valid) {
                    
                }else {

                }
            })
        }
    }
}
</script>


