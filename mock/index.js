/* eslint-disable */
import Mock from 'mockjs'

// const Random = Mock.Random
const BASE_URL = process.env.VUE_APP_API

// 模拟请求响应时间
// Mock.setup({
// 	timeout: 500
// });

// 引入公共接口
require('./common');

// 拖拽列表
Mock.mock(BASE_URL + '/comp/list', {
	data: {
		"list1|5-10": [{
			"id": "@integer(0, 100)",
			"name": "@ctitle(10, 13)"
		}],
		"list2|2-3": [{
			"id": "@integer(101, 150)",
			"name": "@ctitle(10, 13)"
		}]
	}
});

// 树状结构	
Mock.mock(BASE_URL + '/comp/tree', {
	"data|2-5": [{
		id: "@integer(0, 1000)",
		title: "@ctitle(2, 5)",
		"children|1-5": [{
			title: "@ctitle(2, 4)",
			id: "@integer(0, 1000)"
		}]
	}]
});

// 通用图表数据	
Mock.mock(BASE_URL + '/comp/charts', {
	data: {
		columns: ['日期', '访问用户', '下单用户', '下单率'],
		"rows|5-8": [{
			'日期': '1/@increment()', 
			'访问用户': '@integer(1000, 3000)', 
			'下单用户': '@integer(1000, 2000)',
			'下单率': '@float(0, 0, 1, 2)'
		}]
	}
});

// 测试无缝滚动
Mock.mock(BASE_URL + '/comp/seamles', {
	"data|20-50": [{
		id: "@integer(0, 1000)",
		title: "@ctitle(2, 5)",
		date: "@date('yyyy-MM-dd')"
	}]
});

// 气泡图
Mock.mock(BASE_URL + '/echart/scatter', {
	data: {
		title: '教室容量分布',
		xAxis: ['0', '5', '50', '100', '150', '200', '200以上'],
		legend: ['无排课', '有排课'],
		series: [{
			name: '无排课',
			data: [
				[1, 0, 5],
				[2, 0, 10],
				[3, 0, 15],
				[4, 0, 32],
				[5, 0, 12],
				[6, 0, 21],
				[7, 0, 6]
			]
		},
		{
			name: '有排课',
			data: [
				[1, 1, 5],
				[2, 1, 10],
				[3, 1, 25],
				[4, 1, 23],
				[5, 1, 12],
				[6, 1, 17],
				[7, 1, 6]
			]
		}
		]
	}
});

// 灯箱图	
Mock.mock(BASE_URL + '/echart/boxplot', {
	data: {
		title: '各部门得分情况',
		xAxis: ['行政部', '接待部', '后勤部', '技术部', '运维部'],
		series: [
			[850, 740, 900],
			[960, 940, 960],
			[880, 880, 880],
			[890, 810, 810],
			[890, 840, 780]
		]
	}
});

// 灯箱图
Mock.mock(BASE_URL + '/echart/boxplot', {
	data: {
		title: '各部门得分情况',
		xAxis: ['行政部', '接待部', '后勤部', '技术部', '运维部'],
		series: [
			[850, 740, 900],
			[960, 940, 960],
			[880, 880, 880],
			[890, 810, 810],
			[890, 840, 780]
		]
	}
});

// 面积图
Mock.mock(BASE_URL + '/echart/treemap', {
	data: {
		"title": '一带一路”沿线各省区市分析——上海',
		"series": [{
			"value": 17.6,
			"name": "保险"
		}, {
			"value": 16.5,
			"name": "知识产权"
		}, {
			"value": 16.5,
			"name": "出版"
		}, {
			"value": 15.5,
			"name": "轻工业"
		}, {
			"value": 14.8,
			"name": "金融"
		}, {
			"value": 13.7,
			"name": "化工"
		}, {
			"value": 13.6,
			"name": "科技"
		}, {
			"value": 13.4,
			"name": "教育"
		}, {
			"value": 13.1,
			"name": "对外经贸合作"
		}, {
			"value": 12.6,
			"name": "节能"
		}, {
			"value": 12.6,
			"name": "电力"
		}, {
			"value": 12.6,
			"name": "资源综合利用"
		}, {
			"value": 12.4,
			"name": "能源"
		}, {
			"value": 12.2,
			"name": "矿产"
		}, {
			"value": 12,
			"name": "信息产业"
		}, {
			"value": 12,
			"name": "基础设施"
		}, {
			"value": 11.7,
			"name": "物流"
		}, {
			"value": 11.6,
			"name": "环境保护"
		}, {
			"value": 11.6,
			"name": "国家安全"
		}, {
			"value": 11.6,
			"name": "水运"
		}]
	}
});

// 仪表盘
Mock.mock(BASE_URL + '/echart/gauge', {
	data: {
		"title": "仪表盘图例",
		"series": [{
			"name": "生活规律性",
			"value": "@integer(50, 100)"
		}]
	}
});

// 地图
Mock.mock(BASE_URL + '/echart/map', {
	data: {
		"title": '区域地图',
		"yAxis": [{
			id: 1,
			name: '江苏',
			value: 5.3
		},
		{
			id: 2,
			name: '北京',
			value: 3.8
		},
		{
			id: 3,
			name: '上海',
			value: 4.6
		},
		{
			id: 4,
			name: '重庆',
			value: 3.6
		},
		{
			id: 5,
			name: '河北',
			value: 3.4
		},
		{
			id: 6,
			name: '河南',
			value: 3.2
		},
		{
			id: 7,
			name: '云南',
			value: 1.6
		},
		{
			id: 8,
			name: '辽宁',
			value: 4.3
		},
		{
			id: 9,
			name: '黑龙江',
			value: 4.1
		},
		{
			id: 10,
			name: '湖南',
			value: 2.4
		}
		],
		"series": [{
			name: '江苏',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '北京',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '上海',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '重庆',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '河北',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '河南',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '云南',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '辽宁',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '黑龙江',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '湖南',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '安徽',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '山东',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '新疆',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '江苏',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '浙江',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '江西',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '湖北',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '广西',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '甘肃',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '山西',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '内蒙古',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '陕西',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '吉林',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '福建',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '贵州',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '广东',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '青海',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '西藏',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '四川',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '宁夏',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '海南',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '台湾',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '香港',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		},
		{
			name: '澳门',
			plan: '@integer(0, 65000)',
			actual: '@integer(0, 65000)',
			value: '@float(60, 100, 2, 1)'
		}
		]
	}
});

// 区域地图
Mock.mock(BASE_URL + '/echart/area', {
	data: {
		title: '广西省全日制招生',
		series: [{
			name: '钦州',
			'value|200-500': 100,
			point: [108.61, 21.96]
		},
		{
			name: '柳州',
			'value|50-100': 50,
			point: [109.4, 24.33]
		},
		{
			name: '南宁',
			'value|50-100': 50,
			point: [108.479, 23.1152]
		},
		{
			name: '桂林',
			'value|50-100': 55,
			point: [110.28, 25.29]
		}]
	}
});

// 漏斗图
Mock.mock(BASE_URL + '/echart/funnel', {
	data: {
		"title": "高级人才分布",
		"xAxis": [174, 112, 86, 53, 10],
		"series": [{
			"value": 1,
			"name": "省部级\n教学团队"
		},
		{
			"value": 2,
			"name": "国家千人\n计划特聘专家"
		},
		{
			"value": 3,
			"name": "省部级高层次人才"
		}, {
			"value": 4,
			"name": "自治区特聘专家"
		},
		{
			"value": 5,
			"name": "创新团队"
		}
		]
	}
});

// 饼图
Mock.mock(BASE_URL + '/echart/pie', {
	data: {
		"title": '月均消费分布',
		"series": [{
			data: 10,
			"name": '0'
		},
		{
			data: 5,
			"name": '1-200'
		},
		{
			data: 15,
			"name": '201-300'
		},
		{
			data: 25,
			"name": '301-400'
		},
		{
			data: 20,
			"name": '401-500'
		},
		{
			data: 35,
			"name": '501-600'
		},
		{
			data: 30,
			"name": '600以上'
		}
		]

	}
});

// 雷达图
Mock.mock(BASE_URL + '/echart/radar', {
	data: {
		"title": '雷达图',
		"xAxis": [{
			"max": 34965,
			"name": "严格考勤"
		},
		{
			"max": 34965,
			"name": "实验准备"
		},
		{
			"max": 34965,
			"name": "实验总结"
		},
		{
			"max": 34965,
			"name": "报告批阅"
		},
		{
			"max": 34965,
			"name": "操作示范"
		},
		{
			"max": 34965,
			"name": "操作规范"
		},
		{
			"max": 34965,
			"name": "教学互动"
		},
		{
			"max": 34965,
			"name": "教学内容"
		},
		{
			"max": 34965,
			"name": "教学思路"
		},
		{
			"max": 34965,
			"name": "注重实践"
		}
		],
		"series": [{
			data: 21866,
			"name": "严格考勤"
		},
		{
			data: 33812,
			"name": "实验准备"
		},
		{
			data: 21785,
			"name": "实验总结"
		},
		{
			data: 22535,
			"name": "报告批阅"
		},
		{
			data: 23969,
			"name": "操作示范"
		},
		{
			data: 34332,
			"name": "操作规范"
		},
		{
			data: 24289,
			"name": "教学互动"
		},
		{
			data: 34682,
			"name": "教学内容"
		},
		{
			data: 34965,
			"name": "教学思路"
		},
		{
			data: 24260,
			"name": "注重实践"
		}
		]
	}
});

// 折线/面积图 
Mock.mock(BASE_URL + '/echart/line', {
	data: {
		"title": "折线/面积图 ",
		"legend": ['理科', '文科'],
		"xAxis": ['00：00', '02：00', '04：00', '06：00', '08：00', '10：00', '12：00', '14：00', '16：00', '18：00', '20：00', '22：00', '24：00'],
		"series": [{
			"name": "理科",
			"data|13": ['@integer(5, 25)']
		},
		{
			"name": "文科",
			"data|13": ['@integer(1, 25)']
		}
		]
	}
});

// 柱状/条形图
Mock.mock(BASE_URL + '/echart/bar', {
	data: {
		"title": "柱状/条形图",
		"legend": ['理科', '文科'],
		"xAxis": ['00：00', '02：00', '04：00', '06：00', '08：00', '10：00', '12：00', '14：00', '16：00', '18：00', '20：00', '22：00', '24：00'],
		"series": [
			{
				"name": "理科",
				"data|13": ['@integer(10, 25)']
			},
			{
				"name": "文科",
				"data|13": ['@integer(5, 25)']
			}
		]
	}
});