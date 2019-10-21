<template>
    <div v-if="currentValue">
        <sModal class="gc-dia-main" width="1050" v-model="currentValue" transfer :closable="false" :mask-closable="false">
            <div slot="header" class="gc-dia-title">选择筛选条件</div>
            <div class="gc-dia-body gc-filter" style="min-height:400px;">
                 <sRow class="gc-filter__bd">
                    <sCol span="16" class="gc-filter__lt">
                        <div class="lt-title">选择筛选条件</div>
                        <div class="lt-content">
                            <div class="lt-content__hd">
                                <div class="lt-content__hd--items" v-for="(item, index) in filterList" :key="index">
                                    <div class="lt-content__hd--title">{{item.name}}</div>
                                    <div class="lt-content__hd--item" v-for="p in item.types" :key="p.id" :class="{'is-active' : types === p.type }" @click="typeHandle(p.type)">{{p.title}}</div>
                                </div>
                            </div>
                            <div class="lt-content__bd">
                                <!-- 无记录 -->
                                <mNoneTip v-show="tempData.length && tempData.length == 0" :type="1" :top="30">点击左侧进行搜索</mNoneTip>
                                <div v-show="tempData.length && tempData.length > 0">
                                    <div class="lt-content__bd--all">
                                        <sCheckbox
                                            :indeterminate="indeterminate"
                                            :value="checkAll"
                                            @click.prevent.native="handleCheckAll()">全选</sCheckbox>
                                    </div>
                                    <mScrollbar class="lt-content__bd--item" hide>
                                        <sCheckboxGroup :value="groupValue" @on-change="checkAllGroupChange">
                                            <sCheckbox v-for="item in tempData" :key="item.code" :label="item.code"><span>{{item.name}}</span></sCheckbox>
                                        </sCheckboxGroup>
                                    </mScrollbar>
                                </div>
                            </div>
                        </div>
                    </sCol>
                    <sCol span="8" class="gc-filter__rt">
                        <div class="rt-title">
                            <div class="rt-title__bd">已筛选条件</div>
                            <div class="rt-title__ft"><sButton size="small" style="color: #218dee;" @click="clear">全部清除</sButton></div>
                        </div>
                        <mScrollbar class="rt-choose" hide>
                            <!-- 筛选项标签 -->
                            <div class="rt-choose__items" v-for="item in Object.keys(checkAllGroup)" :key="item" v-show="dataBase.size(checkAllGroup[item]) > 0">
                                <div class="rt-choose__name">{{item | typeFilter}}：</div>
                                <template v-if="dataBase.size(checkAllGroup[item]) == dataBase.size(tree[item])">
                                    <mTags closable @click.native="closeAll(item)">全部</mTags>
                                </template>
                                <template v-else>
                                    <mTags v-for="(m, idx) in checkAllGroup[item]" :key="m + idx" closable @click.native="close(item, m)">{{findTags(m, item)}}</mTags>
                                </template>
                            </div>
                        </mScrollbar>
                    </sCol>
                </sRow>
            </div>
            <div slot="footer" class="gc-dia-foot right">
                <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="handleModal">提交</sButton>
                <sButton size="large" class="gc-btn-text gc-btn-no" type="text" @click="closeModal">关闭</sButton>
            </div>
        </sModal>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'analysis-teacher-group-modal',
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            filterList: [
                {
                    name: '基础信息',
                    types: [
                        {
                            type: 'dept',
                            title: '部门'
                        },
                        {
                            type: 'nation',
                            title: '民族'
                        },
                        {
                            type: 'age',
                            title: '年龄'
                        },
                        {
                            type: 'sex',
                            title: '性别'
                        },
                        {
                            type: 'education',
                            title: '学历'
                        }
                    ]
                },
                {
                    name: '其他分类',
                    types: [
                        {
                            type: 'mentor',
                            title: '导师类型'
                        },
                        {
                            type: 'employment',
                            title: '在编方式'
                        },
                        {
                            type: 'type',
                            title: '教师类型'
                        }
                    ]
                }
            ],
            types: 'dept',
            indeterminate: false,   // 半选
            checkAll: false,        // 全选
            checkAllGroup: {
                dept: [],
                nation: [],
                age: [],
                sex: [],
                education: [],
                mentor: [],
                employment: [],
                type: []
            },   // 勾选值  
        }
    },
    computed:{
        currentValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('change', val)
            }
        },
        groupValue() {
            // 勾选值
            return this.checkAllGroup[this.types] || []
        },
        tempData() {
            // 筛选条件
            let data = this.dataBase.cloneDeep(this.tree);
            return data[this.types] || []
        },
    },
    props: {
        tree: {
            type: Object,
            default: () => {},
            required: true
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        typeHandle(type) {
            this.types = type;
            this.indeterminate = false;
            this.checkAll = false;
        },
        handleCheckAll() {
            const type = this.types;
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                let arrList = [];
                let tempDatas = this.dataBase.cloneDeep(this.tempData);
                tempDatas.forEach(ele => {
                    arrList.push(ele.code)
                });
                this.checkAllGroup[type] = arrList;
            } else {
                this.checkAllGroup[type] = [];
            }
        },
        checkAllGroupChange(data) {
            const type = this.types;
            this.checkAllGroup[type] = data;
            let allLength = this.dataBase.size(this.tempData);
            // 获取勾选值个数
            let sizeLength = this.dataBase.size(data);
            if (sizeLength === allLength) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (sizeLength > 0 && sizeLength < allLength) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        },
        closeAll(type) {
            this.indeterminate = false;
            this.checkAll = false;
            this.checkAllGroup[type] = [];
        },
        close(type, id) {
            let parmasGroup = this.dataBase.cloneDeep(this.checkAllGroup[type]);
            let data = parmasGroup.filter(item => item !== id);
            this.checkAllGroup[type] = data;
        },
        findTags(val, type) {
            let parmas = this.tree[type].find(item => item.code == val)
            return (parmas || {}).name
        },
        clear() {
            this.indeterminate = false;
            this.checkAll = false;
            // 清空所有筛选条件
            this.checkAllGroup = {
                dept: [],
                nation: [],
                age: [],
                sex: [],
                education: [],
                mentor: [],
                employment: [],
                type: []
            }
        },
        handleModal() {
            // 提交
            const pramas = this.checkAllGroup;
            this.$emit('on-data', pramas);
            this.types = 'dept'
            this.currentValue = false;
        },
        closeModal() {
            // 关闭
            this.indeterminate = false;
            this.checkAll = false;
            this.types = 'dept';
            this.currentValue = false;
        }
    },
    filters: {
        typeFilter(val) {
            const typeStuats = {
                'dept': '部门',
                'nation': '民族',
                'age': '年龄',
                'sex': '性别',
                'education': '学历',
                'mentor': '导师类型',
                'employment': '在编方式',
                'type': '教师类型'
            };
            return typeStuats[val]
        }
    }
}
</script>