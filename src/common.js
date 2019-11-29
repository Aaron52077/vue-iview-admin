/* eslint-disable */
import Vue from 'vue'
import { size } from 'lodash'
// import { queryEChart, getEChart } from '@/api/ecahrt'

let common = new Vue({
    template: '<div></div>',
    methods: {
        /**
         * @param {*} eid echart 图表id
         * @param {*} query 查询条件
         */
        async getEChartData(eid, query = {}) { 
            const payload = {
                params: {
                    reportTemplate: ''
                },
                reportId: eid
            };
            // 异常机制处理
            try {
                let EchartQuery = await queryEChart({reportId: eid});
                if(size(EchartQuery) > 0) {
                    let paramsKey = EchartQuery.map(m => m.paramName)
                    paramsKey.forEach(ele => {
                        payload.params[ele] = (query || {})[ele] || '';
                    });
                }
                let result = await getEChart(payload);
                return result
            } catch (err) {
                console.warn(err);
            }
        },
    }
});

export default common
