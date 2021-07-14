import cache from "@/utils/cache";

const state = {
  list: [],
  activeName: "defalut"
};

const getters = {
  /**
   * @description 返回当前的主题信息 不是一个名字 而是当前激活主题的所有数据
   * @param {Object} state state
   */
  activeSetting(state) {
    return state.list.find(theme => theme.name === state.activeName);
  }
};

const mutations = {
  /**
   * @description 将 vuex 中的主题应用到 dom
   * @param {Object} state state
   */
  DOM(state) {
    document.body.className = `theme-${state.activeName}`;
  },
  SET_THEME(state, data) {
    state.list = data;
  }
};

const actions = {
  /**
   * @description 激活一个主题
   * @param {String} themeValue 需要激活的主题名称
   */
  setTheme({ state, commit }, themeName) {
    return new Promise(resolve => {
      // 检查这个主题在主题列表里是否存在
      state.activeName = state.list.find(e => e.name === themeName)
        ? themeName
        : state.list[0].name;
      // 将 vuex 中的主题应用到 dom
      commit("DOM");
      cache.setLocal("theme", state.activeName);
      resolve();
    });
  },
  /**
   * @description 从持久化数据加载主题设置
   * @param {Object} context
   */
  load({ state, commit }) {
    return new Promise(resolve => {
      // store 赋值
      let activeName = cache.getLocal("theme");
      // 检查这个主题在主题列表里是否存在
      if (state.list.find(e => e.name === activeName)) {
        state.activeName = activeName;
      } else {
        state.activeName = state.list[0].name;
        cache.setLocal("theme", state.activeName);
      }
      // 将 vuex 中的主题应用到 dom
      commit("DOM");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
