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
        "name": "@cname",
        "status|1": [1, 2, 3],
        "age|12-24": 0,
        "time": "@date('yyyy-MM-dd')",
        "update": "@datetime('yyyy-MM-dd A HH:mm:ss')",
        "address": "@city(true)"
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