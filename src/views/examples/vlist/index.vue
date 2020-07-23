<template>
    <div class="gc-panel">
        <div class="gc-panel__title">Vlist 虚拟列表</div>
        <sDivider></sDivider>
        <div class="gc-container">
            <div class="gc-container__title">virtual-scroll-list示例</div>
            <sDivider></sDivider>
            <mVlist :totalHeight="400" :defaultHeight="40" style="width: 100%;">
                <div
                    v-for="(item, index) in list"
                    :key="index"
                    :style="{ height: `${item.height}px` }"
                >{{ item.name }}</div>
            </mVlist>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: this.mockData()
        };
    },
    methods: {
        mockData() {
            let arr = [];
            for (let i = 0; i < 9999; i++) {
                arr.push({ name: "8test" + (i + 1), height: 80 });
                arr.push({ name: "4test" + (i + 1), height: 40 });
                arr.push({ name: "2test" + (i + 1), height: 20 });
            }
            return arr;
        }
    }
};
</script>