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
            <div class="map-tip">
              <input
                autocomplete="off"
                type="text"
                :id="'map_keyword' + _uid"
                onfocus="this.value = ''"
                placeholder="搜索"
              />
              <a href="javascript:;" onclick="$(this).parents('.map-tip').find('input').focus()">
                <sIcon type="ios-close-circle" size="14" color="#999999" />
              </a>
            </div>
            <div id="result_panel" style="display:none;"></div>
          </sCol>
        </sRow>
        <div class="gc-map__area">
          <mLoading style="height:400px" :visible="!map_loaded ? 'loading' : ''" />
          <div :id="'BMap' + _uid" class="mapContainer"></div>
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
import { BMapLib } from "./util";

export default {
  data() {
    return {
      map: null,
      geocoder: null,
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
        BMapLib("c939d01cf713a7826caf8421b9be8c81").then(() => {
          this.map_init();
        });
      }
    },
    map_init() {
      let vm = this;
      vm.map = new BMap.Map("BMap" + vm._uid, {
        enableAutoResize: true,
        minZoom: 10,
        maxZoom: 32,
        enableMapClick: false
      });
      vm.map.clearOverlays();
      // 设置地图中心点
      let center = vm.currentValue.point
        ? new BMap.Point(vm.currentValue.point[0], vm.currentValue.point[1])
        : new BMap.Point(104.071187, 30.554069);
      vm.map_point = vm.currentValue.point || [center.lng, center.lat];

      vm.map.addControl(new BMap.NavigationControl());
      vm.map.addControl(
        new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_TOP_RIGHT,
          type: BMAP_NAVIGATION_CONTROL_SMALL
        })
      );
      vm.map.centerAndZoom(center, 15);
      vm.map.enableScrollWheelZoom(true);
      vm.map.enableContinuousZoom();
      vm.map_loaded = true;
      // 创建标注
      vm.map_marker = new BMap.Marker(center, {
        raiseOnDrag: true,
        enableClicking: true
        // icon: new BMap.Icon("/theme/fox.gif", new BMap.Size(300, 157))
      });
      // 将标注添加到地图中
      vm.map.addOverlay(vm.map_marker);
      let autocomplete = new BMap.Autocomplete({
        input: "map_keyword" + vm._uid,
        location: vm.map
      });
      // 解析地址
      vm.geocoder = new BMap.Geocoder();
      vm.map.addEventListener("click", function(e) {
        vm.geocoder.getLocation(e.point, function(result) {
          vm.map_address = result.address;
          vm.map_point = [result.point.lng, result.point.lat];
          let latLng = new BMap.Point(result.point.lat, result.point.lng);
          vm.map_marker.setPosition(result.point);
          vm.map_getAddress = t => {
            if (!vm.map_point) return;
            setTimeout(() => {
              vm.map.panTo(vm.map_point);
              vm.map.panBy(0, 50);
            }, t || 300);
          };
        });
      });
      // 智能搜索
      let keywords = "";
      let local = new BMap.LocalSearch(vm.map, {
        onSearchComplete: function(result) {
          var latLng = local.getResults().getPoi(0).point;
          // keywords = result.keyword;
          vm.map.centerAndZoom(latLng, 16);
          vm.map.addOverlay(new BMap.Marker(latLng));
        }
      });
      // 鼠标放在下拉列表上的事件
      autocomplete.addEventListener("onhighlight", function(e) {
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        document.getElementById("result_panel").innerHTML = str;
      });
      // 鼠标点击下拉列表后的事件
      autocomplete.addEventListener("onconfirm", function(e) {
        let _value = e.item.value;
        keywords =
          _value.province + _value.city + _value.district + _value.street + _value.business;
        document.getElementById("result_panel").innerHTML =
          "onconfirm<br />index = " + e.item.index + "<br />myValue = " + keywords;
        vm.map.clearOverlays(); // 清除地图上所有覆盖物
        local.search(keywords);
        console.log(```````````````onconfirm`, e);
      });
    }
  }
};
</script>

<style lang="less">
.tangram-suggestion-main {
  z-index: 1099;
}
</style>

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
    border-radius: 0 3px 3px 0;
    right: 5px;
    top: 1px;
    width: 28px;
    text-align: center;
    line-height: 28px;
    height: 28px;
  }
}
.map-tip input[type="text"] {
  height: 30px;
  border: 0;
  padding-left: 12px;
  width: 100%;
  border-radius: 3px;
  outline: none;
}
</style>
