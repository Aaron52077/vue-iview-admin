<template>
    <div v-show="currentValue.open">
        <sModal class="gc-dia-main" v-model="currentValue.open" width="1000" transfer @on-visible-change="handleOpen" :z-index="899">
            <div slot="header" class="gc-dia-title">{{title || '位置'}}</div>
            <div class="gc-dia-body" style="position:relative;min-height:400px;">
                <sRow :gutter="16" class="gc-block__row">
                    <sCol :xs="18" :sm="18" :lg="18">
                        当前位置：{{map_address || '-'}}
                    </sCol>
                    <sCol :xs="6" :sm="6" :lg="6" v-show="map_loaded">
                        <div class="map-tip" v-show="map_loaded">
                            <input autocomplete="off" type="text" :id="'map_keyword' + _uid" onfocus="this.value = ''" placeholder="搜索" />
                            <a href="javascript:;" onclick="$(this).parents('.map-tip').find('input').focus()">
                                <sIcon type="ios-close-circle" size="14" color="#999999" />
                            </a>
                        </div>
                    </sCol>
                </sRow>
                <div class="gc-map__area">
                    <mLoading style="height:400px" :visible="!map_loaded ? 'loading' : ''" />
                    <div :id="'QQMap' + _uid" class="mapContainer" v-show="map_loaded"></div>
                </div>
            </div>
            <div slot="footer" class="gc-dia-foot">
                <sButton size="large" class="gc-btn-no" type="text" @click="currentValue.open = false">取消</sButton>
                <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="handleOk">确认</sButton>
            </div>
        </sModal>
    </div>
</template>

<script>
/* eslint-disable */
import { QQMapLib } from './util'

export default {
    data() {
        return {
            map: null,
            geocoder: null,
            map_point: '',
            map_address: '',
            map_getAddress: undefined,
            searchService: null,
            map_loaded: false
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        value: Object
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    computed:{
        currentValue: {
            get() {
                return this.value || {}
            },
            set(val) {
                this.$emit('change', val)
            }
        }
    },
    methods:{
        handleOk() {
            let vm = this;
            const obj = { 
                open: false,
                point: vm.map_point,
                address: vm.map_address
            };
            this.$emit('change', obj);
        },
        handleOpen(status) {
            if(status) {
                this.map_loaded = false;
                QQMapLib('OVABZ-5OARO-QW7WV-SJ2JP-T2AQE-BWBX2').then(res => {
                    this.map_init(res)
                });
            }
        },
        map_init(qq) {
            let vm = this;
            // 设置地图中心点
            let center = vm.currentValue.point ? new qq.maps.LatLng(vm.currentValue.point[1], vm.currentValue.point[0]) : new qq.maps.LatLng(30.54762, 104.06498); 
            // 使用联想输入的input的id
            let autocomplete = new qq.maps.place.Autocomplete(document.getElementById('map_keyword' + vm._uid));
            let keyword = '';
            // 获取dom元素添加地图信息
            vm.map = new qq.maps.Map(document.getElementById("QQMap" + vm._uid), {
                zoom: 16,
                center: center,
                minZoom: 10,
                maxZoom: 24, 
                mapTypeId: qq.maps.MapTypeId.ROADMAP,  // 设置地图样式详情参见MapType
                panControl: true,   // 启用平移控件
                panControlOptions: {
                    position: qq.maps.ControlPosition.RIGHT_CENTER  // 设置平移控件的位置为相对右方中间位置对齐.
                }
            });
            vm.map_point = vm.currentValue.point || [center.lng, center.lat];

            // 给定位的位置添加图片标注
            vm.map_marker = new qq.maps.Marker({
                position: center,
                map: vm.map
            });
            
            vm.map_loaded = true;
            
            // 解析地址
            vm.geocoder = new qq.maps.Geocoder({
                complete : function (result) {
                    vm.map.setCenter(result.detail.location);
                    vm.map_address = result.detail.address;
                    vm.map_getAddress = (t) => {
                        if(!vm.map_point) return;
                        setTimeout(() => {
                            vm.map.panTo(vm.map_point);
                            vm.map.panBy(0, 50);
                        }, (t || 300));
                    }
                }
            });

            qq.maps.event.addListener(vm.map, 'click', function (event) {
                vm.map_point = [event.latLng.getLng(), event.latLng.getLat()];
                let latLng = new qq.maps.LatLng(event.latLng.lat, event.latLng.lng);
                vm.map_marker.setPosition(event.latLng);
                vm.geocoder.getAddress(latLng)
            });
            // 调用Poi检索类。用于进行本地检索、周边检索等服务。
            vm.searchService = new qq.maps.SearchService({
                location: '成都',
                map : vm.map,
                complete: function (results) {
                    var pois = results.detail.pois;
                    var latlngBounds = new qq.maps.LatLngBounds();
                    for (var i = 0,l = pois.length;i < l; i++) {
                        var poi = pois[i];
                        latlngBounds.extend(poi.latLng);  
                        vm.map_marker.setPosition(poi.latLng);
                        vm.map_marker.setTitle(poi.name);
                    }
                    vm.map.fitBounds(latlngBounds);
                }
            });

            qq.maps.event.addListener(autocomplete, "confirm", function (res) {
                keyword = res.value;
                // vm.clearOverlays(vm.map_marker);
                vm.searchService.search(keyword);
            });
            
        },
        clearOverlays(overlays) {
            var overlay;
            while (overlay = overlays.pop()) {
                overlay.setMap(null);
            }
        }
    }
}
</script>

<style lang="less" scoped>
.mapContainer {
    width: 100%;
    height: 400px;
}
.gc-map__area {
    position: relative;
}
.gc-block__row {
    margin: 0 0 10px;
}
.map-tip {
    position: relative;
    color: #333;
    border-radius: 3px;
    border: 1px solid #eee;
    box-shadow: 1px 2px 4px 0px #eee;
    a {
        display: inline-block;
        position: absolute;
        border-radius: 0 3px 3px  0;
        right: 5px;
        top: 1px;
        width: 28px;
        text-align: center;
        line-height: 28px;
        height: 28px;
    }
    input[type="text"] {
        height: 30px;
        border: 0;
        padding-left: 12px;
        width: 100%;
        border-radius: 3px;
        outline: none;
    }
}
</style>