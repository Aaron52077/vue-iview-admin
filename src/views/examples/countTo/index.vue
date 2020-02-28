<template>
    <div class="gc-panel">
        <div class="gc-panel__title">CountTo 动态数值</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">整数型数组实时效果</div>
            <mCountTo
                ref="countTo" 
                class="gc-number"
                :startVal="startVal" 
                :endVal="endVal" 
                :duration="duration || 0" 
                :autoplay="autoplay" 
                :prefix="prefix" 
                :suffix="suffix" 
                :decimals="decimals" 
                :decimal="decimal" 
                :separator="separator"
                :ease="ease" 
                @complete="handleComplete" />
            <sRow :gutter="16" class="gc-block__row">
                <sCol :xs="12" :sm="6" :lg="6">
                    <span class="gc-block">开始值</span>
                    <sInputNumber class="gc-block__input" :min="0" v-model.trim="startVal"></sInputNumber>
                </sCol>
                <sCol :xs="12" :sm="6" :lg="6">
                    <span class="gc-block">结束值</span>
                    <sInputNumber class="gc-block__input" :min="0" v-model.trim="endVal"></sInputNumber>
                </sCol>
                <sCol :xs="12" :sm="6" :lg="6">
                    <span class="gc-block">时长</span>
                    <sInputNumber class="gc-block__input" :min="0" v-model.trim="duration"></sInputNumber>
                </sCol>
                <sCol :xs="12" :sm="6" :lg="6">
                    <span class="gc-block">前缀</span>
                    <sInput class="gc-block__input" v-model.trim="prefix" clearable></sInput>
                </sCol>
            </sRow>
            <sRow :gutter="16" class="gc-block__row">
                <sCol :xs="12" :sm="6" :lg="6">
                    <span class="gc-block">后缀</span>
                    <sInput class="gc-block__input" v-model.trim="suffix" clearable></sInput>
                </sCol>
                <sCol :xs="12" :sm="6" :lg="6">
                    <span class="gc-block">分隔符</span>
                    <sInput class="gc-block__input" v-model.trim="separator"></sInput>
                </sCol>
                <sCol :xs="12" :sm="6" :lg="6">
                    <span class="gc-block">小数点符号</span>
                    <sInput class="gc-block__input" v-model.trim="decimal"></sInput>
                </sCol>
                <sCol :xs="12" :sm="6" :lg="6">
                    <span class="gc-block">小数点后几位</span>
                    <sInputNumber class="gc-block__input" :min="0" v-model.trim="decimals"></sInputNumber>
                </sCol>
            </sRow>
            <sRow :gutter="16" class="gc-block__row">
                <sCol :xs="24" :sm="12" :lg="6">
                    <sCheckbox v-model="autoplay" border>自动开始</sCheckbox>
                    <sCheckbox v-model="ease" border>平滑动画</sCheckbox>
                </sCol>
            </sRow>
            <div class="gc-block__bd">
                <sButton class="gc-block" type="primary" icon="md-play" @click="start">开始</sButton>
                <sButton class="gc-block" type="info" icon="md-pause" @click="pause">暂停</sButton>
                <sButton class="gc-block" type="error" icon="md-refresh-circle" @click="resume">恢复</sButton>
                <sButton class="gc-block" type="success" icon="md-refresh" @click="reset">重置</sButton>
                <sButton class="gc-block" type="info" icon="md-skip-forward" @click="pauseResume">暂停 / 恢复</sButton>
            </div>
        </div>
    </div>
</template>

<script>
import mCountTo from '@base/CountTo'

export default {
    data () {
        return {
            startVal: 0,
            endVal: new Date().getFullYear(),
            duration: 3000,
            prefix: '￥',
            suffix: '',
            decimal: '.',
            decimals: 0,
            separator: ',', 
            autoplay: false,
            ease: true
        }
    },
    methods: {
        start() {
            this.$refs.countTo.start()
        },
        pause() {
            this.$refs.countTo.pause()
        },
        resume() {
            this.$refs.countTo.resume()
        },
        reset() {
            this.$refs.countTo.reset()
        },
        pauseResume() {
            this.$refs.countTo.pauseResume()
        },
        handleComplete(val) {
            this.$Message.success(`complete：${val}`)
        }
    },
    components: { mCountTo }
}
</script>

<style lang="less" scoped>
.gc-number {
    padding: 15px 0;
    color: @--color-primary;
    font-size: 40px;
}
.gc-block {
    display: inline-block;
    & + .gc-block {
        margin-left: 15px;
    }
    &__input {
        display: inline-block;
        width: 150px;
        margin-left: 15px;
    }
    &__bd {
        margin: 20px 0;
    }
    &__row {
        margin: 10px 0;
    }
}
</style>
