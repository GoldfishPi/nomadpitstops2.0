import gql from "graphql-tag";
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
        try {
            const login = await this.$fireAuth
                .signInWithEmailAndPassword(email, password);
        } catch(err) {
            return false;
        }
        await this.$apolloHelpers
            .onLogin(await this.$fireAuth.currentUser.getIdToken())
        return true;
    },
    async SIGN_UP({dispatch}, { email, password, firstName, lastName,username}) {
        try {
            const signUp = await this.$fireAuth
                .createUserWithEmailAndPassword(email, password);       

        } catch(e) {
            console.log('bad', e);
            return false;
        }


        try {
            dispatch('LOGIN', { email, password });
        } catch(e) {
            console.log('bad', e);
        }

        try {
            const mutation = gql`
                mutation(
                    $email:String!, 
                    $uid:String!, 
                    $firstName:String!, 
                    $lastName:String!, 
                    $username:String!
                    ) {
                    addUser(
                        email:$email,
                        uid:$uid,
                        firstName:$firstName,
                        lastName:$lastName,
                        username:$username
                    )
                }
            `;
            const res = await this.app.apolloProvider.defaultClient
                .mutate({
                    mutation,
                    variables: {
                        uid:this.$fireAuth.currentUser.uid,
                        email,
                        firstName,
                        lastName,
                        username
                    }
                });
        } catch(e) {
            console.log('errr', e);
        }

        return true;

    },
    async LOGOUT(state) {
        this.$fireAuth.signOut();
        this.$apolloHelpers
            .onLogout()
    }
}
