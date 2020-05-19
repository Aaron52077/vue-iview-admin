/* eslint-disable */
import Mock from 'mockjs'

const BASE_URL = process.env.VUE_APP_API

// mock user login
Mock.mock(BASE_URL + '/user/login', {
    data: {
        roles: ['admin'],
        access_token: "@guid",
        avatar: "@image('80x80', '#2d8cf0', '#FFF', 'admin')",
        name: "Super Admin"
    }
});

// mock user logout
Mock.mock(BASE_URL + '/user/logout', {
    data: 'success'
});

// 富文本编辑器
Mock.mock(BASE_URL + '/editor', {
    data: {
        description: "@cparagraph",
        images: "@image('120x120', '#50B347', '#FFF', 'mockjs')",
    }
});

// 图片接口
Mock.mock(BASE_URL + '/images', {
    data: {
        "pic|4-10": [{
            "title": "@csentence",
            "src": "@image('200x200', '#50B347', '#FFF', 'mockjs')"
        }]
    }
});

// 滑动导航数据接口
Mock.mock(BASE_URL + '/scroll', {
    "data|7-12": [{
        "name": "@cname",
        "list|2-8": [{
            "title": "@region",
            "description": "@csentence",
            "value": '@id',
            "checked|1": false
        }]
    }]
});

// 表格数据接口
Mock.mock(BASE_URL + '/table', {
    "data|10": [{
        "id": "@id",
        "name": "@cname",
        "status|1": [1, 2, 3],
        "age|12-24": 0,
        "update": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "address": "@city(true)",
        "email": "@email",
        "phone": /^1[385][1-9]\d{8}/,
        "point|10": [{
            "seatNo": "@character('upper')",
            "seatArray|10": ["@natural(0, 2)"]
        }],
        "tool": "@range(1, 11)"
    }]
});

// 自定义tree数据
Mock.mock(BASE_URL + '/custom/tree', {
    data: {
        "data|3-10": [{
            "id|+1": 1,
            "title": "@ctitle(3, 5)",
            "expand": false,
            "children|1-5": [{
                "id|+1": 11,
                "title": "@ctitle(3, 7)",
                "expand": false,
                "children|1-3": [{
                    "id|+1": 111,
                    "title": "@ctitle(3, 7)"
                }]
            }]
        }]
    }
});

// 针对json-view展示接口
Mock.mock(BASE_URL + '/comp/jsonview', {
    "data": {
        "data1": {
            "satutsCode": 200,
            "message": "请求成功",
            "data": {
                "records|10": [{
                    'id|+1': 1,
                    "name": "@cname()",
                    "age|12-24": 0,
                    "update": "@datetime('yyyy-MM-dd HH:mm')",
                    "email": "@email",
                    "status": "@color()"
                }],
                "page": 10
            }
        },
        "data2": {
            "code": 200,
            "message": "success",
            "data": {
                "list|10": [{
                    'id|+1': 1,
                    "name": "@cname()",
                    "age|12-24": 0,
                    "update": "@datetime('yyyy-MM-dd HH:mm')",
                    "email": "@email",
                    "status": "@color()",
                    "points|2-10": [{
                        'id|+1': 100,
                        "name": "@name()"
                    }]
                }],
                "page": 10
            }
        }
    }
});