import Vuex from 'vuex';

export const state = () => ({
    largeNav: true,
    defaultLargeNav: true,
});
export const mutations = {
    setNav(state, bool) {
        state.largeNav = bool;
    },
    setDefault(state, bool) {
        state.defaultLargeNav = bool;
    }
};