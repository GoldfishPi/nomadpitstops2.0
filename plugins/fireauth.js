export default context => {
    const {store} = context;
    
    return new Promise((resolve, reject) => {
        console.log('context?', context)
        context.$firebase.auth().onAuthStateChanged(user => {
            if(user) {
                // resolve(store.commit('auth/setUser', user));
            } else {
                // resolve(store.commit('auth/setUser', user));
            }
            resolve();
        })
    })
    
}