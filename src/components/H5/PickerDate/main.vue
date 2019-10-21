<template>
    <van-datetime-picker
        v-bind="$attrs"
        :type="type"
        :title="title"
        :value="new Date()"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="cancelHandle"
        @confirm="confirmHandle" />
</template>

<script>
/* eslint-disable */
/**
 * pickerDate 时间选择
 * @module components/pickerDate
 * @param {String} [type] - 类型
 * @param {Function} [formatter] - 过滤筛选
 * @example
 */
const currentYear = new Date().getFullYear();

export default {
    name: 'mPickerDate',
    inheritAttrs: false,
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        type: {
            type: String,
            default: 'date'
        },
        formatter: Function,
        minDate: {
            type: Date,
            default: () => new Date(currentYear - 10, 0, 1),
        },
        maxDate: {
            type: Date,
            default: () => new Date()
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        formatterMap() {
            const formatter = {
                'date': 'yyyy-MM-dd',
                'datetime': 'yyyy-MM-dd hh:mm',
                'time': 'hh:mm',
                'year-month': 'yyyy-MM'
            };
            return formatter[this.type] || 'yyyy-MM-dd hh:mm'
        },
        currentValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('change', val)
            }
        }
    },
    methods: {
        cancelHandle() {
            this.currentValue = false
            this.$emit('on-cancel')
        },
        confirmHandle(value) {
            const t = this.dataBase;
            let formater = this.formatterMap;
            let val = t.dateToStr(value, formater);
            this.$emit('input', val)
            this.$emit('on-confirm', {
                time: val,
                date: new Date(value)
            });
            this.currentValue = false;
        },
        changeHandle(picker) {
            this.$emit('on-change', picker)
        }
    }
}
</script>