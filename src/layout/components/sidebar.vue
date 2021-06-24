<template>
  <mScrollbar :config="{ offset: offsetTop + 60 }" hide>
    <sMenu :active-name="navbar" :width="`${layoutWeb}px`" accordion>
      <sMenuGroup v-for="(item, index) in menuList" :key="index" :title="item.name">
        <sMenuItem v-for="(m, idx) in item.children" :key="idx" :name="m.name" :to="m.path" v-waves>
          <sIcon :type="m.icon" /><span v-show="!dataBase.h5">{{ t(m.name) }}</span>
        </sMenuItem>
      </sMenuGroup>
    </sMenu>
  </mScrollbar>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import { menuList } from "../config";

export default {
  name: "layout-main-sidebar",
  data() {
    return {
      menuList
    };
  },
  computed: {
    ...mapGetters(["navbar", "offsetTop"]),
    layoutWeb() {
      return this.dataBase.h5 ? 75 : 210;
    }
  }
};
</script>
