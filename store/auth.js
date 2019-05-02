export const state = () => ({
    loggedIn: false,
    user: false
})

export const mutations = {
    setLoggedIn(state, bool) {
        state.loggedIn = bool
    },
    setUser(state, user) {
        state.user = user
    }
}