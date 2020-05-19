/* eslint-disable */
import Vue from 'vue'
import { size } from 'lodash'
// import { queryEChart, getEChart } from '@/api/ecahrt'

let common = new Vue({
    methods: {
        /**
         *  根据首个接口返回key定义查询接口参数
         * @param {*} eid echart 图表id
         * @param {*} option 查询条件
         */
        async getEChartData(eid, option = {}) { 
            const options = {
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
                    // 配置项拓展extend
                    paramsKey.forEach(ele => {
                        options.params[ele] = (option || {})[ele] || '';
                    });
                }
                let result = await getEChart(options);
                return result
            } catch (err) {
                console.warn(err);
            }
        },
    }
});

export default common
