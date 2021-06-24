/* eslint-disable */
const state = {
  cachedSeats: []
};

const mutations = {
  ADD_CACHED_SEAT: (state, view) => {
    if (state.cachedSeats.some(v => v.col === view.col)) return;
    state.cachedSeats.push(view);
  },
  DEL_CACHED_SEAT: (state, view) => {
    for (const [i, v] of state.cachedSeats.entries()) {
      if (v.col === view.col) {
        state.cachedSeats.splice(i, 1);
        break;
      }
    }
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
