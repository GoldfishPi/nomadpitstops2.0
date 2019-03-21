import Vuex from 'vuex';

export const state = () => ({
    largeNav: true,
    defaultLargeNav: false,
});
export const mutations = {
    setNav(state, bool) {
        state.largeNav = bool;
    },
    setDefault(state, bool) {
        state.defaultLargeNav = bool;
    }
};