export default function (context) {
    let { app } = context;
    console.log('app', app);
    return app.$axios.get('/blog')
        .then(data => {
            app.store.commit('blog/setBlogPosts', data.data.posts);
        })

}