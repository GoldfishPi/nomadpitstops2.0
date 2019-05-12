export const state = () => ({
    loggedIn: false,
    user: {}
})

export const mutations = {
    setLoggedIn(state, bool) {
        console.log('lol setting logged in')
        state.loggedIn = bool;
    },
    setUser(state, user) {
        console.log('lol setting user', user)
        state.user = user
        // state.user = user
    }
}