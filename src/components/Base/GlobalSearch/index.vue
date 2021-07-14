<template>
  <div class="gc-search">
    <Select
      ref="globalSearchSelect"
      class="gc-search-select"
      :value="search"
      remote
      filterable
      :remote-method="querySearch"
      placeholder="搜索组件"
      prefix="md-bookmark"
      @on-change="onChange"
    >
      <Option
        v-for="item in options"
        :key="item.path"
        :value="item.path"
        :label="item.title.join(' > ')"
      />
    </Select>
  </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import { Select, Option } from "view-design";
import { mapGetters } from "vuex";
import Fuse from "fuse.js";
import path from "path";

export default {
  name: "GlobalSearch",
  data() {
    return {
      search: "",
      options: [],
      searchPool: [],
      fuse: undefined
    };
  },
  computed: {
    ...mapGetters(["language", "permission_routes"])
  },
  watch: {
    language() {
      this.searchPool = this.generateRoutes(this.permission_routes);
    },
    permission_routes() {
      this.searchPool = this.generateRoutes(this.permission_routes);
    },
    searchPool(list) {
      this.initFuse(list);
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.permission_routes);
  },
  methods: {
    onChange(path) {
      this.$router.push(path);
      this.search = "";
      this.options = [];
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: "title",
            weight: 0.7
          },
          {
            name: "path",
            weight: 0.3
          }
        ]
      });
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = "/", prefixTitle = []) {
      let res = [];

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue;
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        };

        if (router.meta && router.meta.title) {
          // generate internationalized title
          const i18ntitle = this.t(`${router.meta.title}`);

          data.title = [...data.title, i18ntitle];

          if (router.redirect !== "noredirect") {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data);
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title);
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes];
          }
        }
      }
      return res;
    },
    querySearch(query) {
      if (query !== "") {
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
    }
  },
  components: { Select, Option }
};
</script>

<style lang="less" scoped>
.gc-search {
  display: inline-block;
  .gc-search-select {
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
  }

  .gc-search-select {
    width: 210px;
    margin-left: 10px;
  }
}
</style>
