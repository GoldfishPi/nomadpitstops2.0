export const state = () => ({
    active: false
})

export const mutations = {
    setActive(state, bool) {
        state.active = bool
    }
}