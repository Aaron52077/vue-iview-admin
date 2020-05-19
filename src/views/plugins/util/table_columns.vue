<template>
    <div class="gc-tables">
        <div class="gc-tables__title">
            <div class="gc-tables__h1">普通本科分专业学生数</div>
            <div class="gc-tables__inner">
                <div class="inner-lt">高基521</div>
                <div class="inner-rt"> 单位：人</div>
            </div>
        </div>
        <sTable width="100%" :columns="columns" :data="tableData" border height="500"></sTable>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: '学科',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '专业名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '自主专业名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '专业代码',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '是否师范专业',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '年制',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '毕业生数',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '授予学位数',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '招生数',
                    align: 'center',
                    children: [
                        {
                            title: '计',
                            key: 'age',
                            align: 'center'
                        },
                        {
                            title: '其中',
                            align: 'center',
                            children: [
                                {
                                    title: '应届毕业生',
                                    key: 'building',
                                    align: 'center'
                                },
                                {
                                    title: '春季招生',
                                    key: 'door',
                                    align: 'center'
                                },
                                {
                                    title: '预科生转入',
                                    key: 'door',
                                    align: 'center'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '在校生数',
                    align: 'center',
                    children: [
                        {
                            title: '合计',
                            key: 'caddress',
                            align: 'center'
                        },
                        {
                            title: '一年级',
                            key: 'cname',
                            align: 'center'
                        },
                        {
                            title: '二年级',
                            key: 'cname',
                            align: 'center'
                        },
                        {
                            title: '三年级',
                            key: 'cname',
                            align: 'center'
                        },
                        {
                            title: '四年级',
                            key: 'cname',
                            align: 'center'
                        },
                        {
                            title: '四年级',
                            key: 'cname',
                            align: 'center'
                        }
                    ]
                },
                {
                    title: '预计毕业生数',
                    key: 'gender',
                    align: 'center'
                }
            ],
            tableData: []
        }
    },
    methods: {

    }
}
</script>

<style lang="less">
.gc-tables {
    &__title {
        color: #515a6e;
        background-color: #f8f8f9;
        border: 1px solid #dcdee2;
        border-bottom: none;
    }
    &__h1 {
        padding: 15px 0 10px;
        font-size: @--size-base + 4;
        text-align: center;
        font-weight: bolder;
    }
    &__inner {
        padding: 10px 15px;
        .clearfix();
        .inner-lt {
            .fl();
            font-size: @--size-base;
        }
        .inner-rt {
            .fr();
            font-size: @--size-base;
        }
    }
}
</style>