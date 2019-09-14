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

export const actions = {
    async LOGIN(state, { email, password}) {
        console.log('creds', {
            email,
            password
        });
        try {
            const login = await this.$fireAuth
                .signInWithEmailAndPassword(email, password);
        } catch(err) {
            return false;
        }
        await this.$apolloHelpers
            .onLogin(this.$fireAuth.currentUser.getIdToken())
        return true;
    },
    async SIGN_UP(state, { eamil, password}) {
        try {
            const signUp = await this.$fireAuth
                .createUserWithEmailAndPassword(this.email, this.password);       

            const login = await this.$fireAuth
                .signInWithEmailAndPassword(this.email, this.password);
        } catch(e) {
            return false;
        }
        return true;

    },
    async LOGOUT(state) {
        this.$fireAuth.signOut();
        this.$apolloHelpers
            .onLogout()
    }
}
