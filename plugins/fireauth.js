import { auth } from '~/plugins/firebase.js';
export default context => {
    const { store } = context;

    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                context.store.commit('auth/setLoggedIn', true);
            } else {
                context.store.commit('auth/setLoggedIn', false);
            }
            return resolve();
        })
    })

}