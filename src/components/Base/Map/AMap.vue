<template>
  <div v-show="currentValue.open">
    <sModal
      class="gc-dia-main"
      v-model="currentValue.open"
      width="1000"
      transfer
      @on-visible-change="handleOpen"
    >
      <div slot="header" class="gc-dia-title">{{ title || "位置" }}</div>
      <div class="gc-dia-body">
        <sRow :gutter="16" class="gc-block__row">
          <sCol :xs="18" :sm="18" :lg="18"> 当前位置：{{ map_address || "-" }} </sCol>
          <sCol :xs="6" :sm="6" :lg="6" v-show="map_loaded">
            <div class="map-tip" v-show="map_loaded">
              <input
                autocomplete="off"
                type="text"
                :id="'map_keyword' + _uid"
                onfocus="this.value = ''"
                placeholder="搜索"
              />
              <!-- 清空 -->
              <a href="javascript:;" onclick="$(this).parents('.map-tip').find('input').focus()">
                <sIcon type="ios-close-circle" size="14" color="#999999" />
              </a>
            </div>
          </sCol>
        </sRow>
        <div class="gc-map__area">
          <mLoading style="height:400px" :visible="!map_loaded ? 'loading' : ''" />
          <div :id="'AMap' + _uid" class="mapContainer" v-show="map_loaded"></div>
        </div>
      </div>
      <div slot="footer" class="gc-dia-foot">
        <sButton size="large" class="gc-btn-no" type="text" @click="currentValue.open = false"
          >取消</sButton
        >
        <sButton size="large" class="gc-btn-text gc-btn-yes" type="text" @click="handleOk"
          >确认</sButton
        >
      </div>
    </sModal>
  </div>
</template>

<script>
/* eslint-disable */
import { AMapLib } from "./util";

export default {
  data() {
    return {
      map: null,
      map_point: "",
      map_address: "",
      map_getAddress: undefined,
      map_loaded: false
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    value: Object
  },
  model: {
    prop: "value",
    event: "change"
  },
  computed: {
    currentValue: {
      get() {
        return this.value || {};
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
  methods: {
    handleOk() {
      let vm = this;
      const obj = {
        open: false,
        point: vm.map_point,
        address: vm.map_address
      };
      this.$emit("change", obj);
    },
    handleOpen(status) {
      if (status) {
        this.map_loaded = false;
        AMapLib("c939d01cf713a7826caf8421b9be8c81").then(() => {
          this.map_init();
        });
      }
    },
    map_init() {
      let vm = this;
      // 设置地图中心点
      let center = vm.currentValue.point
        ? new AMap.LngLat(vm.currentValue.point[0], vm.currentValue.point[1])
        : new AMap.LngLat(104.06498, 30.54762);
      vm.map_point = vm.currentValue.point || [center.lng, center.lat];

      vm.map = new AMap.Map("AMap" + vm._uid, {
        resizeEnable: true,
        center: center,
        zoom: 15,
        keyboardEnable: false
      });

      vm.map_marker = new AMap.Marker({
        map: vm.map,
        bubble: true,
        offset: new AMap.Pixel(-9, -9),
        draggable: true,
        clickable: true,
        content: "<span class='map_point'></span>"
      });

      vm.map.on("click", function(e) {
        vm.map_point = [e.lnglat.lng, e.lnglat.lat];
        vm.map_marker.setPosition(vm.map_point);
        vm.map_getAddress();
      });
      vm.map_marker.on("dragging", function(e) {
        vm.map_point = [e.lnglat.lng, e.lnglat.lat];
      });
      vm.map_marker.on("dragend", function(e) {
        vm.map_point = [e.lnglat.lng, e.lnglat.lat];
        vm.map_getAddress();
      });

      // 加载完成
      vm.map.on("complete", function(e) {
        $(".map-tip input").val("");
        vm.map_marker && vm.map_marker.setPosition(vm.map_point);
        vm.map_getAddress(50);
        setTimeout(() => {
          vm.map_loaded = true;
        }, 300);
      });

      // 搜索功能
      AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], function() {
        var autoOptions = {
          city: "成都", // 城市，默认全国
          input: "map_keyword" + vm._uid // 使用联想输入的input的id
        };
        var autocomplete = new AMap.Autocomplete(autoOptions);

        AMap.event.addListener(autocomplete, "select", function(e) {
          if (e.poi.location) {
            vm.map_point = [e.poi.location.lng, e.poi.location.lat];
            vm.map_marker.setPosition(vm.map_point);
            vm.map_getAddress();
          }
        });
      });
      // 解析地址
      AMap.plugin("AMap.Geocoder", function() {
        var geocoder = new AMap.Geocoder({ city: "" });
        vm.map_getAddress = t => {
          if (!vm.map_point) return;
          setTimeout(() => {
            vm.map.panTo(vm.map_point);
            vm.map.panBy(0, 50);
          }, t || 300);
          geocoder.getAddress(vm.map_point, function(status, result) {
            if (status == "complete") {
              vm.map_address = result.regeocode.formattedAddress;
            }
          });
        };
      });
    }
  }
};
</script>

<style lang="less">
.mapContainer {
  width: 100%;
  height: 400px;
  .map_point {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: #24c875;
    border-radius: 50%;
    box-shadow: #000 0px 0px 3px;
    border: 3px solid #fff;
  }
}

.amap-logo,
body .amap-copyright {
  display: none !important;
}
</style>

<style lang="less" scoped>
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
    border-radius: 0 3px 3px 0;
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
